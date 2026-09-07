import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { auth } from "$lib/server/auth";
import type { Actions } from './$types';
import { db } from "$lib/server/db";
import { record, artist } from "$lib/server/db/records.schema";

export const load: PageServerLoad = async ({ request }) => {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) redirect(302, "/demo/better-auth");

  const artists = await db.query.artist.findMany();
  return {
    artists
  };
};

export const actions = {
  createArtist: async ({ request }) => {
    const data = await request.formData();
    const artistName = data.get("name");

    if (typeof artistName !== "string" || !artistName) {
      return fail(400, { message: "Name is required" });
    }

    await db.insert(artist).values({
      name: artistName
    });

    console.log(`Created artist with name ${artistName}`)
  }
} satisfies Actions;
