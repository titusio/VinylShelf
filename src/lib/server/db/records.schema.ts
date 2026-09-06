import { pgTable, text, timestamp, index } from "drizzle-orm/pg-core";
import { user } from "./auth.schema";

export const record = pgTable(
    "record",
    {
        id: text("id").primaryKey(),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
    },
    (table) => [index("record_userId_idx").on(table.userId)],
);
