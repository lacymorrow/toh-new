#!/usr/bin/env tsx

/**
 * Import transformed data from Django export into Next.js database
 *
 * Usage:
 *   pnpm tsx scripts/migrate/import-to-nextjs.ts
 */

import bcrypt from "bcryptjs";
import { readFileSync } from "fs";
import { join } from "path";
import { db } from "@/server/db";
import {
	businesses,
	emergencyAlerts,
	events,
	meetings,
	news,
	permits,
	users,
} from "@/server/db/schema-town";

interface DjangoUser {
	id: number;
	username: string;
	email: string;
	first_name: string;
	last_name: string;
	is_staff: boolean;
	is_superuser: boolean;
	is_active: boolean;
	date_joined: string;
	last_login: string | null;
}

interface DjangoNews {
	id: number;
	title: string;
	slug: string;
	date: string | null;
	content_blocks: Array<{ type: string; value: string }>;
	seo_title: string | null;
	search_description: string | null;
	first_published_at: string;
	last_published_at: string;
	live: boolean;
	owner_id: number | null;
}

interface DjangoEvent {
	id: number;
	title: string;
	slug: string;
	event_date: string | null;
	event_time: string | null;
	location: string | null;
	content_blocks: Array<{ type: string; value: string }>;
	seo_title: string | null;
	search_description: string | null;
	first_published_at: string;
	last_published_at: string;
	live: boolean;
	owner_id: number | null;
}

interface DjangoBusiness {
	id: number;
	title: string;
	slug: string;
	content_blocks: Array<{ type: string; value: string }>;
	seo_title: string | null;
	search_description: string | null;
	first_published_at: string;
	last_published_at: string;
	live: boolean;
	owner_id: number | null;
}

// Map to store Django user ID to new Next.js user ID
const userIdMap = new Map<number, string>();

/**
 * Convert StreamField blocks to MDX content
 */
function blocksToMDX(blocks: Array<{ type: string; value: string }>): string {
	let mdx = "";

	for (const block of blocks) {
		switch (block.type) {
			case "heading":
				mdx += `## ${block.value}\n\n`;
				break;
			case "paragraph":
			case "richtext":
				mdx += `${block.value}\n\n`;
				break;
			case "image":
				// Handle image blocks
				mdx += `![Image](${block.value})\n\n`;
				break;
			case "list":
				mdx += `${block.value}\n\n`;
				break;
			default:
				// For complex blocks, we might need custom handling
				mdx += `${block.value}\n\n`;
		}
	}

	return mdx.trim();
}

/**
 * Import users from Django
 */
async function importUsers() {
	console.log("Importing users...");

	const dataPath = join(process.cwd(), "scripts/migrate/data/users.json");
	const djangoUsers: DjangoUser[] = JSON.parse(readFileSync(dataPath, "utf-8"));

	for (const djangoUser of djangoUsers) {
		// Generate a new UUID for the user
		const newUserId = crypto.randomUUID();

		// Store the mapping
		userIdMap.set(djangoUser.id, newUserId);

		// Create user in Next.js database
		await db.insert(users).values({
			id: newUserId,
			email: djangoUser.email,
			name: `${djangoUser.first_name} ${djangoUser.last_name}`.trim() || djangoUser.username,
			emailVerified: new Date(djangoUser.date_joined),
			role: djangoUser.is_superuser ? "admin" : "user",
			password: await bcrypt.hash(crypto.randomUUID(), 10), // Generate random password, users will need to reset
			createdAt: new Date(djangoUser.date_joined),
		});
	}

	console.log(`  Imported ${djangoUsers.length} users`);
}

/**
 * Import news articles
 */
async function importNews() {
	console.log("Importing news articles...");

	const dataPath = join(process.cwd(), "scripts/migrate/data/news.json");
	const djangoNews: DjangoNews[] = JSON.parse(readFileSync(dataPath, "utf-8"));

	for (const article of djangoNews) {
		if (!article.live) continue; // Skip unpublished articles

		const content = blocksToMDX(article.content_blocks);
		const authorId = article.owner_id ? userIdMap.get(article.owner_id) : null;

		await db.insert(news).values({
			title: article.title,
			slug: article.slug,
			content: content,
			excerpt: article.search_description,
			status: "published",
			publishedAt: new Date(article.first_published_at),
			authorId: authorId,
			createdAt: new Date(article.first_published_at),
			updatedAt: new Date(article.last_published_at),
		});
	}

	console.log(`  Imported ${djangoNews.length} news articles`);
}

/**
 * Import events
 */
async function importEvents() {
	console.log("Importing events...");

	const dataPath = join(process.cwd(), "scripts/migrate/data/events.json");
	const djangoEvents: DjangoEvent[] = JSON.parse(readFileSync(dataPath, "utf-8"));

	for (const event of djangoEvents) {
		if (!event.live) continue; // Skip unpublished events

		const content = blocksToMDX(event.content_blocks);
		const organizerId = event.owner_id ? userIdMap.get(event.owner_id) : null;

		// Parse event date
		let eventDate = new Date();
		if (event.event_date) {
			eventDate = new Date(event.event_date);
		}

		// Determine event status based on date
		const now = new Date();
		let status: "upcoming" | "ongoing" | "completed" = "upcoming";
		if (eventDate < now) {
			status = "completed";
		}

		await db.insert(events).values({
			title: event.title,
			slug: event.slug,
			content: content,
			description: event.search_description,
			eventDate: event.event_date || eventDate.toISOString().split("T")[0],
			eventTime: event.event_time,
			location: event.location,
			status: status,
			organizerId: organizerId,
			createdAt: new Date(event.first_published_at),
			updatedAt: new Date(event.last_published_at),
		});
	}

	console.log(`  Imported ${djangoEvents.length} events`);
}

/**
 * Import businesses
 */
async function importBusinesses() {
	console.log("Importing businesses...");

	const dataPath = join(process.cwd(), "scripts/migrate/data/businesses.json");
	const djangoBusinesses: DjangoBusiness[] = JSON.parse(readFileSync(dataPath, "utf-8"));

	for (const business of djangoBusinesses) {
		if (!business.live) continue; // Skip unpublished businesses

		const description = blocksToMDX(business.content_blocks);
		const ownerId = business.owner_id ? userIdMap.get(business.owner_id) : null;

		await db.insert(businesses).values({
			name: business.title,
			slug: business.slug,
			description: description,
			category: "other", // Default category, will need manual categorization
			ownerId: ownerId,
			createdAt: new Date(business.first_published_at),
			updatedAt: new Date(business.last_published_at),
		});
	}

	console.log(`  Imported ${djangoBusinesses.length} businesses`);
}

/**
 * Main import function
 */
async function main() {
	console.log("Starting data import from Django to Next.js...\n");

	try {
		// Import in order to maintain relationships
		await importUsers();
		await importNews();
		await importEvents();
		await importBusinesses();

		console.log("\nImport complete!");
	} catch (error) {
		console.error("Import failed:", error);
		process.exit(1);
	}
}

// Run if executed directly
if (require.main === module) {
	main();
}
