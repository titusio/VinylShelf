import { env } from '$env/dynamic/private';
import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';
import * as schema from '$lib/server/db/schema';

export const auth = betterAuth({
	baseURL: env.ORIGIN,
	secret: env.BETTER_AUTH_SECRET,
	// drizzle v1 dropped the `schema` option on drizzle(), so the adapter
	// can no longer read it off `db` — hand it the tables directly.
	database: drizzleAdapter(db, { provider: 'pg', schema }),
	emailAndPassword: { enabled: true },
	plugins: [
		sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
	]
});
