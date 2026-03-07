import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const shortUrls = pgTable('short_urls', {
  id: uuid().defaultRandom().primaryKey(),
  url: text().notNull(),
  alias: text().notNull().unique(),
  clicks: integer().notNull(),
  createdAt: timestamp('createdAt', { mode: 'date', precision: 3 })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date', precision: 3 }).notNull(),
});

export type ShortUrl = typeof shortUrls.$inferSelect;
export type NewShortUrl = typeof shortUrls.$inferInsert;
