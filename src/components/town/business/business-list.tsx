import { and, eq, ilike, sql } from "drizzle-orm";
import { db } from "@/server/db";
import { businesses } from "@/server/db/schema-town";
import { BusinessCard } from "./business-card";
import { BusinessPagination } from "./business-pagination";

interface BusinessListProps {
	category?: string;
	search?: string;
	featured?: string;
	page?: string;
}

async function getBusinesses(category?: string, search?: string, featured?: string, page = "1") {
	if (!db) return { items: [], total: 0 };

	const pageSize = 12;
	const offset = (Number.parseInt(page) - 1) * pageSize;

	const conditions = [];

	if (category) {
		conditions.push(eq(businesses.category, category));
	}

	if (search) {
		conditions.push(
			sql`(
				${businesses.name} ILIKE ${"%" + search + "%"} OR
				${businesses.description} ILIKE ${"%" + search + "%"} OR
				${businesses.tags}::text ILIKE ${"%" + search + "%"}
			)`
		);
	}

	if (featured === "true") {
		conditions.push(eq(businesses.isFeatured, true));
	}

	// Always show verified businesses first
	const orderBy = [
		sql`${businesses.isVerified} DESC`,
		sql`${businesses.isFeatured} DESC`,
		businesses.name,
	];

	const [items, totalResult] = await Promise.all([
		db
			.select()
			.from(businesses)
			.where(conditions.length > 0 ? and(...conditions) : undefined)
			.orderBy(...orderBy)
			.limit(pageSize)
			.offset(offset),
		db
			.select({ count: sql`count(*)::int` })
			.from(businesses)
			.where(conditions.length > 0 ? and(...conditions) : undefined),
	]);

	return {
		items,
		total: totalResult[0]?.count || 0,
	};
}

export async function BusinessList({ category, search, featured, page = "1" }: BusinessListProps) {
	const { items, total } = await getBusinesses(category, search, featured, page);
	const pageSize = 12;
	const totalPages = Math.ceil(total / pageSize);

	if (items.length === 0) {
		return (
			<div className="text-center py-12">
				<p className="text-muted-foreground">
					{search ? `No businesses found matching "${search}"` : "No businesses found."}
				</p>
			</div>
		);
	}

	return (
		<>
			<div className="mb-4 text-sm text-muted-foreground">
				Showing {items.length} of {total} businesses
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{items.map((business) => (
					<BusinessCard key={business.id} business={business} />
				))}
			</div>

			{totalPages > 1 && (
				<BusinessPagination
					currentPage={Number.parseInt(page)}
					totalPages={totalPages}
					baseUrl="/business"
					searchParams={{ category, search, featured }}
				/>
			)}
		</>
	);
}
