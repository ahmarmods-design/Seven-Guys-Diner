import { pgTable, text, jsonb, timestamp } from "drizzle-orm/pg-core";

export const cmsData = pgTable("cms_data", {
  key:       text("key").primaryKey(),
  value:     jsonb("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type CMSRow = typeof cmsData.$inferSelect;
