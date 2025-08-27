#!/usr/bin/env tsx

/**
 * Validate migrated data integrity
 *
 * Usage:
 *   pnpm tsx scripts/migrate/validate-migration.ts
 */

import { sql } from "drizzle-orm";
import { readFileSync } from "fs";
import { join } from "path";
import { db } from "@/server/db";
import { businesses, events, news, users } from "@/server/db/schema-town";

interface ValidationResult {
	category: string;
	djangoCount: number;
	nextjsCount: number;
	status: "success" | "warning" | "error";
	message?: string;
}

const results: ValidationResult[] = [];

/**
 * Count records in Django export
 */
function countDjangoRecords(filename: string): number {
	try {
		const dataPath = join(process.cwd(), "scripts/migrate/data", filename);
		const data = JSON.parse(readFileSync(dataPath, "utf-8"));
		return Array.isArray(data) ? data.length : 0;
	} catch (error) {
		console.error(`Failed to read ${filename}:`, error);
		return 0;
	}
}

/**
 * Validate users migration
 */
async function validateUsers() {
	const djangoCount = countDjangoRecords("users.json");
	const nextjsCount = await db
		.select({ count: sql<number>`count(*)` })
		.from(users)
		.then((r) => Number(r[0]?.count || 0));

	results.push({
		category: "Users",
		djangoCount,
		nextjsCount,
		status: djangoCount === nextjsCount ? "success" : "warning",
		message: djangoCount !== nextjsCount ? `Missing ${djangoCount - nextjsCount} users` : undefined,
	});
}

/**
 * Validate news migration
 */
async function validateNews() {
	const djangoCount = countDjangoRecords("news.json");
	const nextjsCount = await db
		.select({ count: sql<number>`count(*)` })
		.from(news)
		.then((r) => Number(r[0]?.count || 0));

	results.push({
		category: "News Articles",
		djangoCount,
		nextjsCount,
		status: djangoCount === nextjsCount ? "success" : "warning",
		message:
			djangoCount !== nextjsCount
				? `Missing ${djangoCount - nextjsCount} news articles`
				: undefined,
	});
}

/**
 * Validate events migration
 */
async function validateEvents() {
	const djangoCount = countDjangoRecords("events.json");
	const nextjsCount = await db
		.select({ count: sql<number>`count(*)` })
		.from(events)
		.then((r) => Number(r[0]?.count || 0));

	results.push({
		category: "Events",
		djangoCount,
		nextjsCount,
		status: djangoCount === nextjsCount ? "success" : "warning",
		message:
			djangoCount !== nextjsCount ? `Missing ${djangoCount - nextjsCount} events` : undefined,
	});
}

/**
 * Validate businesses migration
 */
async function validateBusinesses() {
	const djangoCount = countDjangoRecords("businesses.json");
	const nextjsCount = await db
		.select({ count: sql<number>`count(*)` })
		.from(businesses)
		.then((r) => Number(r[0]?.count || 0));

	results.push({
		category: "Businesses",
		djangoCount,
		nextjsCount,
		status: djangoCount === nextjsCount ? "success" : "warning",
		message:
			djangoCount !== nextjsCount ? `Missing ${djangoCount - nextjsCount} businesses` : undefined,
	});
}

/**
 * Check data integrity
 */
async function checkDataIntegrity() {
	// Check for null/empty required fields
	const newsWithoutContent = await db
		.select({ count: sql<number>`count(*)` })
		.from(news)
		.where(sql`content IS NULL OR content = ''`)
		.then((r) => Number(r[0]?.count || 0));

	if (newsWithoutContent > 0) {
		results.push({
			category: "News Content Integrity",
			djangoCount: 0,
			nextjsCount: newsWithoutContent,
			status: "error",
			message: `${newsWithoutContent} news articles have no content`,
		});
	}

	// Check for duplicate slugs
	const duplicateSlugs = await db.execute(sql`
    SELECT slug, COUNT(*) as count 
    FROM ${news} 
    GROUP BY slug 
    HAVING COUNT(*) > 1
  `);

	if (duplicateSlugs.rows.length > 0) {
		results.push({
			category: "Slug Uniqueness",
			djangoCount: 0,
			nextjsCount: duplicateSlugs.rows.length,
			status: "error",
			message: `${duplicateSlugs.rows.length} duplicate slugs found`,
		});
	}
}

/**
 * Print validation report
 */
function printReport() {
	console.log("\n=== MIGRATION VALIDATION REPORT ===\n");

	console.log("Record Counts:");
	console.log("─".repeat(60));

	for (const result of results) {
		const icon = result.status === "success" ? "✅" : result.status === "warning" ? "⚠️" : "❌";

		console.log(`${icon} ${result.category}`);
		console.log(`   Django: ${result.djangoCount} | Next.js: ${result.nextjsCount}`);

		if (result.message) {
			console.log(`   ${result.message}`);
		}
		console.log();
	}

	// Summary
	const successCount = results.filter((r) => r.status === "success").length;
	const warningCount = results.filter((r) => r.status === "warning").length;
	const errorCount = results.filter((r) => r.status === "error").length;

	console.log("─".repeat(60));
	console.log("Summary:");
	console.log(`  ✅ Success: ${successCount}`);
	console.log(`  ⚠️  Warnings: ${warningCount}`);
	console.log(`  ❌ Errors: ${errorCount}`);

	if (errorCount > 0) {
		console.log("\n⚠️  Migration validation failed with errors!");
		process.exit(1);
	} else if (warningCount > 0) {
		console.log("\n⚠️  Migration completed with warnings. Please review.");
	} else {
		console.log("\n✅ Migration validated successfully!");
	}
}

/**
 * Main validation function
 */
async function main() {
	console.log("Starting migration validation...\n");

	try {
		await validateUsers();
		await validateNews();
		await validateEvents();
		await validateBusinesses();
		await checkDataIntegrity();

		printReport();
	} catch (error) {
		console.error("Validation failed:", error);
		process.exit(1);
	}
}

// Run if executed directly
if (require.main === module) {
	main();
}
