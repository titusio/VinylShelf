import { artworkAt } from '$lib/artwork';

const BASE = 'https://itunes.apple.com';

export type AlbumResult = {
  itunesId: number;
  title: string;
  artistName: string;
  itunesArtistId: number;
  artworkUrl: string;
  releaseDate: Date | null;
  trackCount: number;
  genre: string;
};

type RawAlbum = {
  collectionId: number;
  collectionName: string;
  artistName: string;
  artistId: number;
  artworkUrl100: string;
  releaseDate?: string;
  trackCount: number;
  primaryGenreName: string;
};

type Options = {
  limit?: number;
  country?: string;
  // Pass the event `fetch` from a load function so SSR requests get deduped
  // into the page payload instead of firing a second time on the client.
  fetch?: typeof fetch;
};

const normalize = (a: RawAlbum): AlbumResult => ({
  itunesId: a.collectionId,
  title: a.collectionName,
  artistName: a.artistName,
  itunesArtistId: a.artistId,
  artworkUrl: artworkAt(a.artworkUrl100, 600),
  releaseDate: a.releaseDate ? new Date(a.releaseDate) : null,
  trackCount: a.trackCount,
  genre: a.primaryGenreName
});

async function request(path: string, params: Record<string, string>, f: typeof fetch) {
  const url = new URL(path, BASE);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);

  const res = await f(url);
  // Apple rate-limits uncredentialed use at roughly 20 calls/minute per IP.
  if (!res.ok) throw new Error(`iTunes ${path} failed: ${res.status} ${res.statusText}`);

  // The API responds with `content-type: text/javascript` (a JSONP leftover);
  // res.json() ignores the header and parses it fine.
  const { results } = (await res.json()) as { results: RawAlbum[] };
  return results;
}

export async function searchAlbums(term: string, options: Options = {}): Promise<AlbumResult[]> {
  const { limit = 20, country = 'DE', fetch: f = fetch } = options;
  if (!term.trim()) return [];

  const results = await request(
    '/search',
    { term, entity: 'album', limit: String(limit), country },
    f
  );
  return results.map(normalize);
}

export async function lookupAlbum(
  itunesId: number,
  options: Options = {}
): Promise<AlbumResult | null> {
  const { country = 'DE', fetch: f = fetch } = options;

  const results = await request(
    '/lookup',
    { id: String(itunesId), entity: 'album', country },
    f
  );
  const album = results.find((r) => r.collectionId === itunesId);
  return album ? normalize(album) : null;
}
