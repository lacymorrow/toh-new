#!/usr/bin/env tsx

/**
 * Seed sample data for testing the Town of Harmony website
 *
 * Usage:
 *   pnpm tsx scripts/seed-sample-data.ts
 */

import bcrypt from "bcryptjs";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/server/db/schema";
import * as townSchema from "@/server/db/schema-town";

// Combine all schemas
const combinedSchema = { ...schema, ...townSchema };

// Create direct database connection for seeding
const connectionString = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5435/toh_dev";
const client = postgres(connectionString, { max: 1 });
const db = drizzle(client, { schema: combinedSchema });

// Extract tables for easier use
const { users } = schema;
const { businesses, emergencyAlerts, events, news, elections, candidates, permits, meetings } = townSchema;

async function seedUsers() {
	console.log("Seeding users...");

	if (!db) {
		throw new Error("Database connection not available");
	}

	const hashedPassword = await bcrypt.hash("password123", 10);

	const adminUser = await db
		.insert(users)
		.values({
			id: crypto.randomUUID(),
			email: "admin@townofharmony.org",
			name: "Admin User",
			password: hashedPassword,
			role: "admin",
			emailVerified: new Date(),
		})
		.returning();

	const regularUser = await db
		.insert(users)
		.values({
			id: crypto.randomUUID(),
			email: "resident@example.com",
			name: "John Resident",
			password: hashedPassword,
			role: "user",
			emailVerified: new Date(),
		})
		.returning();

	return { adminUser: adminUser[0], regularUser: regularUser[0] };
}

async function seedNews(adminUserId: string) {
	console.log("Seeding news articles...");

	const newsArticles = [
		{
			title: "Town Council Approves New Community Center",
			slug: "town-council-approves-community-center",
			excerpt:
				"The Town Council voted unanimously to approve funding for a new community center that will serve residents of all ages.",
			content: `# Town Council Approves New Community Center\n\nIn a historic vote last night, the Town Council unanimously approved funding for a new $2.5 million community center that will serve as a hub for recreation, education, and social activities.\n\n## Key Features\n\n- Indoor gymnasium\n- Swimming pool\n- Meeting rooms\n- Senior center\n- Youth programs area\n\n## Timeline\n\nConstruction is expected to begin in Spring 2025, with completion targeted for Fall 2026.\n\n## Community Impact\n\nMayor Sarah Johnson stated, "This community center represents our commitment to providing quality facilities for all residents. It will be a place where neighbors can gather, children can learn and play, and seniors can stay active."\n\nThe project will be funded through a combination of state grants, municipal bonds, and private donations. No increase in property taxes is expected.`,
			status: "published" as const,
			publishedAt: new Date("2024-08-20"),
			author: "Sarah Johnson",
			authorId: adminUserId,
			categories: ["announcements", "government"],
			tags: ["community-center", "town-council", "development"],
		},
		{
			title: "Road Construction Notice: Main Street Improvements",
			slug: "main-street-improvements",
			excerpt:
				"Main Street will undergo repairs and improvements beginning September 1st. Plan alternate routes.",
			content:
				"# Road Construction Notice\n\nThe Department of Public Works will begin road improvements on Main Street starting September 1st.\n\n## Affected Areas\n- Main Street from 1st Avenue to 5th Avenue\n- Expected duration: 3 weeks\n\n## Traffic Impact\n- Lane closures during work hours (7 AM - 5 PM)\n- Local traffic only\n- Detours via Oak Street recommended\n\n## Improvements Include\n- Repaving\n- New sidewalks\n- Updated street lighting\n- Storm drain repairs\n\nWe apologize for any inconvenience and appreciate your patience during these necessary improvements.",
			status: "published" as const,
			publishedAt: new Date("2024-08-15"),
			author: "Public Works Department",
			authorId: adminUserId,
			categories: ["public-works", "announcements"],
			tags: ["construction", "traffic", "infrastructure"],
		},
		{
			title: "Fall Festival Returns October 12-14",
			slug: "fall-festival-2024",
			excerpt:
				"Mark your calendars! The annual Fall Festival returns with three days of family fun, food, and entertainment.",
			content: `# Fall Festival 2024\n\nJoin us for the 45th Annual Town of Harmony Fall Festival!\n\n## Event Schedule\n\n### Friday, October 12\n- 5:00 PM - Opening Ceremony\n- 6:00 PM - Live Music on Main Stage\n- 7:00 PM - Fireworks Display\n\n### Saturday, October 13\n- 9:00 AM - Parade on Main Street\n- 10:00 AM - Craft Fair Opens\n- 12:00 PM - Pie Eating Contest\n- 2:00 PM - Children's Activities\n- 6:00 PM - Beer Garden Opens\n- 7:00 PM - Live Band Performance\n\n### Sunday, October 14\n- 11:00 AM - Community Worship Service\n- 12:00 PM - BBQ Cook-off\n- 2:00 PM - Classic Car Show\n- 4:00 PM - Closing Ceremony\n\n## Vendor Applications\n\nVendor applications are now being accepted. Visit our website or stop by Town Hall for more information.`,
			status: "published" as const,
			publishedAt: new Date("2024-08-10"),
			author: "Events Committee",
			authorId: adminUserId,
			categories: ["events", "community"],
			tags: ["fall-festival", "events", "family"],
		},
	];

	await db.insert(news).values(newsArticles);
	console.log(`  Inserted ${newsArticles.length} news articles`);
}

async function seedEvents() {
	console.log("Seeding events...");

	const upcomingEvents = [
		{
			title: "Town Council Meeting",
			slug: "town-council-meeting-sept-2024",
			description: "Regular monthly Town Council meeting. Public comments welcome.",
			eventDate: "2024-09-05",
			eventTime: "19:00",
			location: "Town Hall",
			locationAddress: "123 Main Street, Harmony, WV",
			status: "upcoming" as const,
			categories: ["government", "meetings"],
		},
		{
			title: "Community Cleanup Day",
			slug: "community-cleanup-day-sept-2024",
			description: "Join us in keeping Harmony beautiful! Supplies provided.",
			eventDate: "2024-09-15",
			eventTime: "09:00",
			location: "Central Park",
			locationAddress: "Central Park, Harmony, WV",
			status: "upcoming" as const,
			categories: ["community", "volunteer"],
		},
		{
			title: "Farmers Market",
			slug: "farmers-market-weekly",
			description: "Fresh produce, local crafts, and homemade goods every Saturday.",
			eventDate: "2024-08-31",
			eventTime: "08:00",
			endTime: "13:00",
			location: "Town Square",
			locationAddress: "Town Square, Harmony, WV",
			status: "upcoming" as const,
			isRecurring: true,
			categories: ["market", "community"],
		},
	];

	await db.insert(events).values(upcomingEvents);
	console.log(`  Inserted ${upcomingEvents.length} events`);
}

async function seedBusinesses() {
	console.log("Seeding businesses...");

	const businessList = [
		{
			name: "Joe's Coffee Shop",
			slug: "joes-coffee-shop",
			description: "Family-owned coffee shop serving the best brew in town since 1995.",
			category: "restaurant" as const,
			address: "456 Main Street",
			phone: "(304) 555-0101",
			email: "hello@joescoffee.com",
			website: "https://joescoffee.example.com",
			hours: {
				monday: "6:00 AM - 6:00 PM",
				tuesday: "6:00 AM - 6:00 PM",
				wednesday: "6:00 AM - 6:00 PM",
				thursday: "6:00 AM - 6:00 PM",
				friday: "6:00 AM - 8:00 PM",
				saturday: "7:00 AM - 8:00 PM",
				sunday: "8:00 AM - 4:00 PM",
			},
			isVerified: true,
			isFeatured: true,
		},
		{
			name: "Harmony Hardware",
			slug: "harmony-hardware",
			description: "Your local hardware store for all home improvement needs.",
			category: "retail" as const,
			address: "789 Oak Street",
			phone: "(304) 555-0102",
			email: "info@harmonyhardware.com",
			hours: {
				monday: "7:00 AM - 7:00 PM",
				tuesday: "7:00 AM - 7:00 PM",
				wednesday: "7:00 AM - 7:00 PM",
				thursday: "7:00 AM - 7:00 PM",
				friday: "7:00 AM - 7:00 PM",
				saturday: "8:00 AM - 6:00 PM",
				sunday: "10:00 AM - 5:00 PM",
			},
			isVerified: true,
		},
		{
			name: "Harmony Family Clinic",
			slug: "harmony-family-clinic",
			description: "Comprehensive healthcare services for the whole family.",
			category: "healthcare" as const,
			address: "321 Elm Avenue",
			phone: "(304) 555-0103",
			email: "appointments@harmonyclinic.com",
			website: "https://harmonyclinic.example.com",
			hours: {
				monday: "8:00 AM - 5:00 PM",
				tuesday: "8:00 AM - 5:00 PM",
				wednesday: "8:00 AM - 5:00 PM",
				thursday: "8:00 AM - 5:00 PM",
				friday: "8:00 AM - 5:00 PM",
				saturday: "Closed",
				sunday: "Closed",
			},
			isVerified: true,
		},
	];

	await db.insert(businesses).values(businessList);
	console.log(`  Inserted ${businessList.length} businesses`);
}

async function seedEmergencyAlert() {
	console.log("Seeding emergency alert...");

	await db.insert(emergencyAlerts).values({
		title: "Water Main Repair",
		message:
			"Water service will be interrupted on Oak Street from 2-4 PM today for emergency repairs.",
		level: "warning",
		isActive: true,
		startsAt: new Date(),
		endsAt: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
		affectedAreas: ["Oak Street", "Elm Avenue"],
	});

	console.log("  Added emergency alert");
}

async function seedElections() {
	console.log("Seeding elections and candidates...");

	const election = await db
		.insert(elections)
		.values({
			title: "2024 Municipal Election",
			slug: "2024-municipal-election",
			description: "General election for Town Council and Mayor positions.",
			electionDate: "2024-11-05",
			registrationDeadline: "2024-10-15",
			earlyVotingStart: "2024-10-21",
			earlyVotingEnd: "2024-11-02",
			pollingLocations: [
				{
					name: "Town Hall",
					address: "123 Main Street",
					hours: "6:30 AM - 7:30 PM",
				},
				{
					name: "Community Center",
					address: "456 Oak Avenue",
					hours: "6:30 AM - 7:30 PM",
				},
			],
			isActive: true,
		})
		.returning();

	const candidatesList = [
		{
			electionId: election[0].id,
			name: "Sarah Johnson",
			position: "Mayor",
			party: "Independent",
			bio: "Current mayor seeking re-election with focus on economic development.",
			sortOrder: 1,
		},
		{
			electionId: election[0].id,
			name: "Michael Roberts",
			position: "Mayor",
			party: "Community First",
			bio: "Local business owner advocating for small business growth.",
			sortOrder: 2,
		},
		{
			electionId: election[0].id,
			name: "Emily Davis",
			position: "Town Council - District 1",
			party: "Independent",
			bio: "Education advocate and former school board member.",
			sortOrder: 3,
		},
		{
			electionId: election[0].id,
			name: "James Wilson",
			position: "Town Council - District 1",
			party: "Progress Party",
			bio: "Environmental activist focusing on sustainable development.",
			sortOrder: 4,
		},
	];

	await db.insert(candidates).values(candidatesList);
	console.log(`  Added election with ${candidatesList.length} candidates`);
}

async function seedPermits(userId: string) {
	console.log("Seeding permits...");

	const permitsList = [
		{
			permitNumber: "BP-2024-0001",
			type: "Building Permit",
			applicantName: "John Smith",
			applicantId: userId,
			applicantEmail: "john@example.com",
			applicantPhone: "(304) 555-0201",
			propertyAddress: "789 Maple Street",
			description: "New deck construction",
			status: "approved" as const,
			submittedAt: new Date("2024-08-01"),
			approvedAt: new Date("2024-08-15"),
			fee: 15000, // $150 in cents
			isPaid: true,
		},
		{
			permitNumber: "EP-2024-0002",
			type: "Electrical Permit",
			applicantName: "Jane Doe",
			applicantEmail: "jane@example.com",
			applicantPhone: "(304) 555-0202",
			propertyAddress: "321 Pine Avenue",
			description: "Service panel upgrade",
			status: "pending" as const,
			submittedAt: new Date("2024-08-20"),
			fee: 10000, // $100 in cents
			isPaid: false,
		},
	];

	await db.insert(permits).values(permitsList);
	console.log(`  Inserted ${permitsList.length} permits`);
}

async function seedMeetings() {
	console.log("Seeding meetings...");

	const meetingsList = [
		{
			title: "Town Council Regular Meeting",
			slug: "town-council-meeting-august-2024",
			type: "Town Council",
			meetingDate: "2024-08-15",
			meetingTime: "19:00",
			location: "Town Hall Council Chambers",
			agenda: "## Agenda\n\n1. Call to Order\n2. Approval of Minutes\n3. Public Comments\n4. Old Business\n   - Community Center Update\n5. New Business\n   - Budget Amendment\n6. Adjournment",
			isPublic: true,
		},
		{
			title: "Planning Commission Meeting",
			slug: "planning-commission-august-2024",
			type: "Planning Commission",
			meetingDate: "2024-08-22",
			meetingTime: "18:30",
			location: "Town Hall Room 201",
			agenda: "## Agenda\n\n1. Call to Order\n2. Review of Subdivision Application\n3. Zoning Amendment Discussion\n4. Public Hearing: Variance Request\n5. Adjournment",
			isPublic: true,
		},
		{
			title: "Zoning Board of Appeals",
			slug: "zoning-board-august-2024",
			type: "Zoning Board",
			meetingDate: "2024-09-10",
			meetingTime: "18:00",
			location: "Town Hall Council Chambers",
			agenda: "## Agenda\n\n1. Call to Order\n2. Variance Request - 123 Oak Street\n3. Special Exception - Commercial Use\n4. Public Comments\n5. Adjournment",
			isPublic: true,
		},
	];

	await db.insert(meetings).values(meetingsList);
	console.log(`  Inserted ${meetingsList.length} meetings`);
}

async function main() {
	console.log("Starting database seed...\n");

	try {
		// Seed users first as other data depends on them
		const { adminUser, regularUser } = await seedUsers();

		// Seed other data
		await seedNews(adminUser.id);
		await seedEvents();
		await seedBusinesses();
		await seedEmergencyAlert();
		await seedElections();
		await seedPermits(regularUser.id);
		await seedMeetings();

		console.log("\n✅ Database seeded successfully!");
	} catch (error) {
		console.error("❌ Seeding failed:", error);
		process.exit(1);
	}
}

// Run the main function
main().catch((error) => {
	console.error("Failed to seed database:", error);
	process.exit(1);
}).finally(async () => {
	await client.end();
});
