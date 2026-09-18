import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { auth } from "$lib/server/auth";
import { db } from "$lib/server/db";

export const load: PageServerLoad = async ({ request, url, fetch }) => {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) redirect(302, "/login");

  const artists = await db.query.artist.findMany();
  // fixme: there used to be filtering for users here but since
  // i changed the records to be connected via 'ownership', that changed
  const records = await db.query.record.findMany({
    where: {
    },
    with: { artist: true }
  });

  return {
    artists,
    records,
  };
};

