/**
 * @fileoverview Town of Harmony specific database schema definitions
 * @module server/db/schema-town
 *
 * This file defines all Town of Harmony specific tables for:
 * - News and announcements
 * - Events and calendar
 * - Business directory
 * - Elections and voting
 * - Permits and applications
 * - Meetings and minutes
 * - Emergency information
 */

import { relations, sql } from "drizzle-orm";
import {
	boolean,
	date,
	index,
	integer,
	jsonb,
	pgEnum,
	pgTableCreator,
	primaryKey,
	serial,
	text,
	time,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { env } from "@/env";
import { users } from "./schema";

/**
 * Table creator with optional prefix support
 */
const createTable = pgTableCreator((name) => `${env?.DB_PREFIX ?? ""}_${name}`);

/**
 * Enums for various status and type fields
 */
export const newsStatusEnum = pgEnum("news_status", ["draft", "published", "archived"]);
export const eventStatusEnum = pgEnum("event_status", [
	"upcoming",
	"ongoing",
	"completed",
	"cancelled",
]);
export const permitStatusEnum = pgEnum("permit_status", [
	"pending",
	"approved",
	"denied",
	"expired",
]);
export const businessCategoryEnum = pgEnum("business_category", [
	"restaurant",
	"retail",
	"service",
	"healthcare",
	"education",
	"government",
	"nonprofit",
	"other",
]);
export const emergencyLevelEnum = pgEnum("emergency_level", ["info", "warning", "critical"]);

/**
 * News articles and announcements
 */
export const news = createTable(
	"news",
	{
		id: serial("id").primaryKey(),
		title: varchar("title", { length: 255 }).notNull(),
		slug: varchar("slug", { length: 255 }).notNull().unique(),
		excerpt: text("excerpt"),
		content: text("content").notNull(), // MDX content
		featuredImage: text("featured_image"),
		author: varchar("author", { length: 255 }),
		authorId: varchar("author_id", { length: 255 }).references(() => users.id),
		status: newsStatusEnum("status").default("draft").notNull(),
		publishedAt: timestamp("published_at", { withTimezone: true }),
		categories: jsonb("categories").default([]).$type<string[]>(),
		tags: jsonb("tags").default([]).$type<string[]>(),
		viewCount: integer("view_count").default(0),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
	},
	(table) => ({
		slugIdx: index("news_slug_idx").on(table.slug),
		statusIdx: index("news_status_idx").on(table.status),
		publishedAtIdx: index("news_published_at_idx").on(table.publishedAt),
		authorIdx: index("news_author_idx").on(table.authorId),
	})
);

export type News = typeof news.$inferSelect;
export type NewNews = typeof news.$inferInsert;

/**
 * Events and calendar items
 */
export const events = createTable(
	"events",
	{
		id: serial("id").primaryKey(),
		title: varchar("title", { length: 255 }).notNull(),
		slug: varchar("slug", { length: 255 }).notNull().unique(),
		description: text("description"),
		content: text("content"), // MDX content for detailed event info
		featuredImage: text("featured_image"),
		eventDate: date("event_date").notNull(),
		eventTime: time("event_time"),
		endDate: date("end_date"),
		endTime: time("end_time"),
		location: varchar("location", { length: 255 }),
		locationAddress: text("location_address"),
		locationMapUrl: text("location_map_url"),
		organizer: varchar("organizer", { length: 255 }),
		organizerId: varchar("organizer_id", { length: 255 }).references(() => users.id),
		contactEmail: varchar("contact_email", { length: 255 }),
		contactPhone: varchar("contact_phone", { length: 50 }),
		registrationUrl: text("registration_url"),
		registrationDeadline: timestamp("registration_deadline", { withTimezone: true }),
		maxAttendees: integer("max_attendees"),
		currentAttendees: integer("current_attendees").default(0),
		status: eventStatusEnum("status").default("upcoming").notNull(),
		isRecurring: boolean("is_recurring").default(false),
		recurringPattern: jsonb("recurring_pattern"), // Store recurring rules
		categories: jsonb("categories").default([]).$type<string[]>(),
		tags: jsonb("tags").default([]).$type<string[]>(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
	},
	(table) => ({
		slugIdx: index("events_slug_idx").on(table.slug),
		eventDateIdx: index("events_date_idx").on(table.eventDate),
		statusIdx: index("events_status_idx").on(table.status),
		organizerIdx: index("events_organizer_idx").on(table.organizerId),
	})
);

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;

/**
 * Business directory entries
 */
export const businesses = createTable(
	"businesses",
	{
		id: serial("id").primaryKey(),
		name: varchar("name", { length: 255 }).notNull(),
		slug: varchar("slug", { length: 255 }).notNull().unique(),
		description: text("description"),
		category: businessCategoryEnum("category").notNull(),
		subcategory: varchar("subcategory", { length: 100 }),
		logo: text("logo"),
		images: jsonb("images").default([]).$type<string[]>(),
		ownerId: varchar("owner_id", { length: 255 }).references(() => users.id),
		contactName: varchar("contact_name", { length: 255 }),
		email: varchar("email", { length: 255 }),
		phone: varchar("phone", { length: 50 }),
		website: text("website"),
		address: text("address"),
		city: varchar("city", { length: 100 }).default("Harmony"),
		state: varchar("state", { length: 2 }).default("WV"),
		zipCode: varchar("zip_code", { length: 10 }),
		hours: jsonb("hours"), // Store operating hours as JSON
		socialMedia: jsonb("social_media"), // Store social links
		isVerified: boolean("is_verified").default(false),
		isFeatured: boolean("is_featured").default(false),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
	},
	(table) => ({
		slugIdx: index("businesses_slug_idx").on(table.slug),
		categoryIdx: index("businesses_category_idx").on(table.category),
		verifiedIdx: index("businesses_verified_idx").on(table.isVerified),
		ownerIdx: index("businesses_owner_idx").on(table.ownerId),
	})
);

export type Business = typeof businesses.$inferSelect;
export type NewBusiness = typeof businesses.$inferInsert;

/**
 * Elections and voting information
 */
export const elections = createTable(
	"elections",
	{
		id: serial("id").primaryKey(),
		title: varchar("title", { length: 255 }).notNull(),
		slug: varchar("slug", { length: 255 }).notNull().unique(),
		description: text("description"),
		electionDate: date("election_date").notNull(),
		registrationDeadline: date("registration_deadline"),
		earlyVotingStart: date("early_voting_start"),
		earlyVotingEnd: date("early_voting_end"),
		pollingLocations: jsonb("polling_locations"), // Array of locations
		sampleBallot: text("sample_ballot"), // URL to PDF
		resultsUrl: text("results_url"),
		isActive: boolean("is_active").default(true),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
	},
	(table) => ({
		slugIdx: index("elections_slug_idx").on(table.slug),
		dateIdx: index("elections_date_idx").on(table.electionDate),
		activeIdx: index("elections_active_idx").on(table.isActive),
	})
);

export type Election = typeof elections.$inferSelect;
export type NewElection = typeof elections.$inferInsert;

/**
 * Election candidates
 */
export const candidates = createTable(
	"candidates",
	{
		id: serial("id").primaryKey(),
		electionId: integer("election_id")
			.notNull()
			.references(() => elections.id, { onDelete: "cascade" }),
		name: varchar("name", { length: 255 }).notNull(),
		position: varchar("position", { length: 255 }).notNull(),
		party: varchar("party", { length: 100 }),
		photo: text("photo"),
		bio: text("bio"),
		website: text("website"),
		contactEmail: varchar("contact_email", { length: 255 }),
		sortOrder: integer("sort_order").default(0),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
	},
	(table) => ({
		electionIdx: index("candidates_election_idx").on(table.electionId),
		positionIdx: index("candidates_position_idx").on(table.position),
	})
);

export type Candidate = typeof candidates.$inferSelect;
export type NewCandidate = typeof candidates.$inferInsert;

/**
 * Permits and applications
 */
export const permits = createTable(
	"permits",
	{
		id: serial("id").primaryKey(),
		permitNumber: varchar("permit_number", { length: 50 }).notNull().unique(),
		type: varchar("type", { length: 100 }).notNull(),
		applicantName: varchar("applicant_name", { length: 255 }).notNull(),
		applicantId: varchar("applicant_id", { length: 255 }).references(() => users.id),
		applicantEmail: varchar("applicant_email", { length: 255 }),
		applicantPhone: varchar("applicant_phone", { length: 50 }),
		propertyAddress: text("property_address"),
		description: text("description"),
		documents: jsonb("documents").default([]).$type<string[]>(), // URLs to documents
		status: permitStatusEnum("status").default("pending").notNull(),
		submittedAt: timestamp("submitted_at", { withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
		reviewedBy: varchar("reviewed_by", { length: 255 }),
		approvedAt: timestamp("approved_at", { withTimezone: true }),
		expiresAt: timestamp("expires_at", { withTimezone: true }),
		fee: integer("fee"), // in cents
		isPaid: boolean("is_paid").default(false),
		notes: text("notes"),
		metadata: jsonb("metadata"),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
	},
	(table) => ({
		permitNumberIdx: index("permits_number_idx").on(table.permitNumber),
		typeIdx: index("permits_type_idx").on(table.type),
		statusIdx: index("permits_status_idx").on(table.status),
		applicantIdx: index("permits_applicant_idx").on(table.applicantId),
		submittedIdx: index("permits_submitted_idx").on(table.submittedAt),
	})
);

export type Permit = typeof permits.$inferSelect;
export type NewPermit = typeof permits.$inferInsert;

/**
 * Town meetings and minutes
 */
export const meetings = createTable(
	"meetings",
	{
		id: serial("id").primaryKey(),
		title: varchar("title", { length: 255 }).notNull(),
		slug: varchar("slug", { length: 255 }).notNull().unique(),
		type: varchar("type", { length: 100 }), // Council, Planning, Zoning, etc.
		meetingDate: date("meeting_date").notNull(),
		meetingTime: time("meeting_time"),
		location: varchar("location", { length: 255 }),
		agenda: text("agenda"), // MDX content
		agendaUrl: text("agenda_url"), // PDF link
		minutes: text("minutes"), // MDX content
		minutesUrl: text("minutes_url"), // PDF link
		videoUrl: text("video_url"), // YouTube or other video link
		audioUrl: text("audio_url"), // Audio recording link
		documents: jsonb("documents").default([]).$type<string[]>(), // Additional documents
		attendees: jsonb("attendees"), // List of attendees
		isPublic: boolean("is_public").default(true),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
	},
	(table) => ({
		slugIdx: index("meetings_slug_idx").on(table.slug),
		dateIdx: index("meetings_date_idx").on(table.meetingDate),
		typeIdx: index("meetings_type_idx").on(table.type),
		publicIdx: index("meetings_public_idx").on(table.isPublic),
	})
);

export type Meeting = typeof meetings.$inferSelect;
export type NewMeeting = typeof meetings.$inferInsert;

/**
 * Emergency alerts and information
 */
export const emergencyAlerts = createTable(
	"emergency_alerts",
	{
		id: serial("id").primaryKey(),
		title: varchar("title", { length: 255 }).notNull(),
		message: text("message").notNull(),
		level: emergencyLevelEnum("level").default("info").notNull(),
		isActive: boolean("is_active").default(true),
		startsAt: timestamp("starts_at", { withTimezone: true }),
		endsAt: timestamp("ends_at", { withTimezone: true }),
		affectedAreas: jsonb("affected_areas").default([]).$type<string[]>(),
		instructions: text("instructions"),
		contactInfo: jsonb("contact_info"), // Emergency contact details
		externalUrl: text("external_url"), // Link to more info
		createdBy: varchar("created_by", { length: 255 }).references(() => users.id),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
	},
	(table) => ({
		levelIdx: index("emergency_level_idx").on(table.level),
		activeIdx: index("emergency_active_idx").on(table.isActive),
		startsIdx: index("emergency_starts_idx").on(table.startsAt),
		endsIdx: index("emergency_ends_idx").on(table.endsAt),
	})
);

export type EmergencyAlert = typeof emergencyAlerts.$inferSelect;
export type NewEmergencyAlert = typeof emergencyAlerts.$inferInsert;

/**
 * Newsletter subscribers
 */
export const newsletterSubscribers = createTable(
	"newsletter_subscribers",
	{
		id: serial("id").primaryKey(),
		email: varchar("email", { length: 255 }).notNull().unique(),
		subscribedAt: timestamp("subscribed_at", { withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		unsubscribedAt: timestamp("unsubscribed_at", { withTimezone: true }),
		isActive: boolean("is_active").default(true).notNull(),
	},
	(table) => ({
		emailIdx: index("newsletter_email_idx").on(table.email),
		activeIdx: index("newsletter_active_idx").on(table.isActive),
	})
);

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type NewNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;

/**
 * Page views tracking for analytics
 */
export const pageViews = createTable(
	"page_views",
	{
		id: serial("id").primaryKey(),
		path: varchar("path", { length: 500 }).notNull(),
		userId: varchar("user_id", { length: 255 }),
		sessionId: varchar("session_id", { length: 255 }),
		referrer: text("referrer"),
		userAgent: text("user_agent"),
		ipHash: varchar("ip_hash", { length: 64 }), // Hashed IP for privacy
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
	},
	(table) => ({
		pathIdx: index("page_views_path_idx").on(table.path),
		userIdx: index("page_views_user_idx").on(table.userId),
		createdIdx: index("page_views_created_idx").on(table.createdAt),
	})
);

export type PageView = typeof pageViews.$inferSelect;
export type NewPageView = typeof pageViews.$inferInsert;

/**
 * Relations definitions
 */
export const newsRelations = relations(news, ({ one }) => ({
	author: one(users, {
		fields: [news.authorId],
		references: [users.id],
	}),
}));

export const eventsRelations = relations(events, ({ one }) => ({
	organizer: one(users, {
		fields: [events.organizerId],
		references: [users.id],
	}),
}));

export const businessesRelations = relations(businesses, ({ one }) => ({
	owner: one(users, {
		fields: [businesses.ownerId],
		references: [users.id],
	}),
}));

export const electionsRelations = relations(elections, ({ many }) => ({
	candidates: many(candidates),
}));

export const candidatesRelations = relations(candidates, ({ one }) => ({
	election: one(elections, {
		fields: [candidates.electionId],
		references: [elections.id],
	}),
}));

export const permitsRelations = relations(permits, ({ one }) => ({
	applicant: one(users, {
		fields: [permits.applicantId],
		references: [users.id],
	}),
}));

export const emergencyAlertsRelations = relations(emergencyAlerts, ({ one }) => ({
	createdBy: one(users, {
		fields: [emergencyAlerts.createdBy],
		references: [users.id],
	}),
}));
