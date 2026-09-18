import { pgTable, text, timestamp, integer, index } from "drizzle-orm/pg-core";
import { user } from "./auth.schema";

export const artist = pgTable(
  "artist",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    itunesArtistId: integer("itunes_artist_id").unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
);

export const record = pgTable(
  "record",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    artistId: text("artist_id")
      .notNull()
      .references(() => artist.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    itunesId: integer("itunes_id"),
    artworkUrl: text("artwork_url"),
    releaseDate: timestamp("release_date"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
);

export const ownership = pgTable(
  "ownership",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    recordId: text("record_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("ownership_userId_idx").on(table.userId),
    index("ownership_recordId_idx").on(table.recordId)
  ],
);
