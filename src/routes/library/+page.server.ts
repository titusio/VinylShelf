import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { auth } from "$lib/server/auth";
import type { Actions } from './$types';
import { db } from "$lib/server/db";
import { record } from "$lib/server/db/records.schema";

export const load: PageServerLoad = async ({ request }) => {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) redirect(302, "/demo/better-auth");

  const artists = await db.query.artist.findMany();
  const records = await db.query.record.findMany({
    where: {
      userId: session.user.id,
    },
    with: { artist: true }
  });
  return {
    artists,
    records
  };
};

export const actions = {
  createRecord: async ({ request }) => {
    const data = await request.formData();
    const artistId = data.get("artistId");
    const title = data.get("title");

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

    await db.insert(record).values({
      userId: session.user.id,
      artistId,
      title
    });
  }
} satisfies Actions;
