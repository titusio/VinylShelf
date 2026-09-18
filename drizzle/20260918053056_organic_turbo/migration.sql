CREATE TABLE "ownership" (
	"id" text PRIMARY KEY,
	"user_id" text NOT NULL,
	"record_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "record" DROP CONSTRAINT "record_user_id_user_id_fkey";--> statement-breakpoint
DROP INDEX "record_userId_idx";--> statement-breakpoint
ALTER TABLE "record" DROP COLUMN "user_id";--> statement-breakpoint
CREATE INDEX "ownership_userId_idx" ON "ownership" ("user_id");--> statement-breakpoint
CREATE INDEX "ownership_recordId_idx" ON "ownership" ("record_id");--> statement-breakpoint
ALTER TABLE "ownership" ADD CONSTRAINT "ownership_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "ownership" ADD CONSTRAINT "ownership_record_id_user_id_fkey" FOREIGN KEY ("record_id") REFERENCES "user"("id") ON DELETE CASCADE;