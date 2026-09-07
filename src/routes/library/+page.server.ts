import { fail, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { auth } from "$lib/server/auth";
import type { Actions } from './$types';
import { db } from "$lib/server/db";
import { record, artist } from "$lib/server/db/records.schema";
import { searchAlbums, lookupAlbum, type AlbumResult } from "$lib/server/itunes";

export const load: PageServerLoad = async ({ request, url, fetch }) => {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) redirect(302, "/login");

  const artists = await db.query.artist.findMany();
  const records = await db.query.record.findMany({
    where: {
      userId: session.user.id,
    },
    with: { artist: true }
  });

  // `?title=…&artistId=…` is the cover confirmation step. Searching iTunes
  // writes nothing, so it belongs in the URL: the step gets its own history
  // entry, survives a reload, and Back returns to the entry form.
  const title = url.searchParams.get("title")?.trim();
  const artistId = url.searchParams.get("artistId");
  const artistRow = artists.find((a) => a.id === artistId);

  let pending = null;
  if (title && artistId && artistRow) {
    let candidates: AlbumResult[] = [];
    let coverError: string | null = null;

    try {
      candidates = await searchAlbums(`${artistRow.name} ${title}`, { limit: 12, fetch });
    } catch (error) {
      console.error("iTunes search failed", error);
      // Let the user save without a cover rather than blocking on Apple.
      coverError = "Could not reach iTunes. You can still add the record without a cover.";
    }

    pending = { title, artistId, artistName: artistRow.name, candidates, coverError };
  }

  return {
    artists,
    records,
    pending
  };
};

export const actions = {
  // The only write. The client sends just the chosen iTunes id; the artwork
  // URL and release date are re-fetched here so they can't be forged.
  createRecord: async ({ request, fetch }) => {
    const data = await request.formData();
    const artistId = data.get("artistId");
    const title = data.get("title");
    const itunesId = data.get("itunesId");

    if (typeof artistId !== "string" || !artistId) {
      return fail(400, { message: "Artist is required" });
    }

    if (typeof title !== "string" || !title) {
      return fail(400, { message: "Title is required" });
    }

    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) return fail(401, { message: "Not signed in" });

    const artistRow = await db.query.artist.findFirst({
      where: {
        id: artistId
      }
    });

    if (!artistRow) {
      return fail(400, { message: "Unknown artist" });
    }

    // An empty itunesId means the user chose "no cover".
    let cover = null;
    if (typeof itunesId === "string" && itunesId) {
      const id = Number(itunesId);
      if (!Number.isInteger(id)) {
        return fail(400, { message: "Invalid cover selection" });
      }

      cover = await lookupAlbum(id, { fetch });
      if (!cover) {
        return fail(400, { message: "That album is no longer available on iTunes" });
      }
    }

    await db.insert(record).values({
      userId: session.user.id,
      artistId,
      title,
      itunesId: cover?.itunesId,
      artworkUrl: cover?.artworkUrl,
      releaseDate: cover?.releaseDate
    });

    // Link the local artist to its iTunes counterpart the first time we learn
    // it. itunesArtistId is unique, so skip it if another artist already holds
    // this id (two local artists pointing at the same iTunes artist).
    if (cover && artistRow.itunesArtistId === null) {
      const alreadyLinked = await db.query.artist.findFirst({
        where: {
          itunesArtistId: cover.itunesArtistId
        }
      });

      if (!alreadyLinked) {
        await db
          .update(artist)
          .set({ itunesArtistId: cover.itunesArtistId })
          .where(eq(artist.id, artistId));
      }
    }

    // Back to the clean shelf URL, so a reload doesn't re-post and the picker
    // params don't linger in the address bar.
    redirect(303, "/library");
  }
} satisfies Actions;
