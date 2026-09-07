ALTER TABLE "artist" ADD COLUMN "itunes_artist_id" integer;--> statement-breakpoint
ALTER TABLE "record" ADD COLUMN "itunes_id" integer;--> statement-breakpoint
ALTER TABLE "record" ADD COLUMN "artwork_url" text;--> statement-breakpoint
ALTER TABLE "record" ADD COLUMN "release_date" timestamp;--> statement-breakpoint
ALTER TABLE "artist" ADD CONSTRAINT "artist_itunes_artist_id_key" UNIQUE("itunes_artist_id");