import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";

export const load: PageServerLoad = async ({ request, url, fetch }) => {
  const artists = await db.query.artist.findMany();

  // todo: filter out any records the user might already have
  const records = await db.query.record.findMany({
    with: {
      artist: true
    }
  });

  return { artists, records };
};
