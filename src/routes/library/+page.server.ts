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
  return {
    artists
  };
};

export const actions = {
  createRecord: async ({ request }) => {
    const data = await request.formData();
    const artistId = data.get("artistId");

    if (typeof artistId !== "string" || !artistId) {
      return fail(400, { message: "Artist is required" });
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
      artistId
    });
  }
} satisfies Actions;
