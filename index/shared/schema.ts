import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, date, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const challenges = pgTable("challenges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userName: text("user_name").notNull(),
  addictionType: text("addiction_type").notNull(),
  duration: integer("duration").notNull(),
  startDate: date("start_date").notNull(),
  completedDays: jsonb("completed_days").notNull().default(sql`'[]'::jsonb`),
  isCompleted: boolean("is_completed").notNull().default(false),
  motivationalPromise: text("motivational_promise"),
});

export const dailyEntries = pgTable("daily_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  challengeId: varchar("challenge_id").notNull(),
  date: date("date").notNull(),
  hardnessLevel: integer("hardness_level").notNull(),
  notes: text("notes"),
  hadUrges: boolean("had_urges").notNull().default(false),
});

export const insertChallengeSchema = createInsertSchema(challenges).omit({
  id: true,
});

export const insertDailyEntrySchema = createInsertSchema(dailyEntries).omit({
  id: true,
});

export type InsertChallenge = z.infer<typeof insertChallengeSchema>;
export type Challenge = typeof challenges.$inferSelect;
export type InsertDailyEntry = z.infer<typeof insertDailyEntrySchema>;
export type DailyEntry = typeof dailyEntries.$inferSelect;
