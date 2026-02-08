import type { Where } from "payload";
import { getPayloadClient } from "./payload";

/**
 * Typed helper functions for fetching town content from Payload CMS.
 * All functions gracefully return empty/null when Payload is unavailable.
 */

// Re-export for convenience
export { getPayloadClient };

/**
 * Get published news articles
 */
export const getNews = async (options?: {
	limit?: number;
	page?: number;
	category?: string;
	search?: string;
}) => {
	const payload = await getPayloadClient();
	if (!payload) return { docs: [], totalDocs: 0, totalPages: 0, page: 1 };

	const { limit = 10, page = 1, category, search } = options ?? {};

	const where: Where = {
		status: { equals: "published" },
	};

	if (category) {
		where.categories = { contains: category };
	}

	if (search) {
		where.or = [
			{ title: { like: search } },
			{ excerpt: { like: search } },
		];
	}

	return payload.find({
		collection: "news",
		where,
		sort: "-publishedAt",
		limit,
		page,
	});
};

/**
 * Get a single news article by slug
 */
export const getNewsBySlug = async (slug: string) => {
	const payload = await getPayloadClient();
	if (!payload) return null;

	const result = await payload.find({
		collection: "news",
		where: { slug: { equals: slug } },
		limit: 1,
	});

	return result.docs[0] ?? null;
};

/**
 * Increment view count on a news article
 */
export const incrementNewsViewCount = async (id: number, currentCount: number) => {
	const payload = await getPayloadClient();
	if (!payload) return;

	await payload.update({
		collection: "news",
		id,
		data: { viewCount: (currentCount || 0) + 1 },
	});
};

/**
 * Get upcoming events
 */
export const getEvents = async (options?: {
	limit?: number;
	page?: number;
	category?: string;
	status?: string;
	month?: string;
	year?: string;
}) => {
	const payload = await getPayloadClient();
	if (!payload) return { docs: [], totalDocs: 0, totalPages: 0, page: 1 };

	const { limit = 10, page = 1, category, status, month, year } = options ?? {};

	const conditions: Where[] = [];

	if (status) {
		conditions.push({ status: { equals: status } });
	} else {
		conditions.push({ status: { equals: "upcoming" } });
	}

	if (category) {
		conditions.push({ categories: { contains: category } });
	}

	if (month && year) {
		const monthNum = parseInt(month);
		const yearNum = parseInt(year);
		const startDate = new Date(yearNum, monthNum - 1, 1).toISOString();
		const endDate = new Date(yearNum, monthNum, 0).toISOString();
		conditions.push({ eventDate: { greater_than_equal: startDate } });
		conditions.push({ eventDate: { less_than_equal: endDate } });
	}

	return payload.find({
		collection: "events",
		where: conditions.length > 0 ? { and: conditions } : {},
		sort: "eventDate",
		limit,
		page,
	});
};

/**
 * Get a single event by slug
 */
export const getEventBySlug = async (slug: string) => {
	const payload = await getPayloadClient();
	if (!payload) return null;

	const result = await payload.find({
		collection: "events",
		where: { slug: { equals: slug } },
		limit: 1,
	});

	return result.docs[0] ?? null;
};

/**
 * Get meetings
 */
export const getMeetings = async (options?: {
	limit?: number;
	page?: number;
	type?: string;
	month?: string;
	year?: string;
	status?: string;
	hasRecordings?: boolean;
}) => {
	const payload = await getPayloadClient();
	if (!payload) return { docs: [], totalDocs: 0, totalPages: 0, page: 1 };

	const { limit = 10, page = 1, type, month, year, status, hasRecordings } = options ?? {};

	const conditions: Where[] = [
		{ isPublic: { equals: true } },
	];

	if (type) {
		conditions.push({ type: { equals: type } });
	}

	if (month && year) {
		const monthNum = parseInt(month);
		const yearNum = parseInt(year);
		const startDate = new Date(yearNum, monthNum - 1, 1).toISOString().split("T")[0];
		const endDate = new Date(yearNum, monthNum, 0).toISOString().split("T")[0];
		conditions.push({ meetingDate: { greater_than_equal: startDate } });
		conditions.push({ meetingDate: { less_than_equal: endDate } });
	} else if (year) {
		const yearNum = parseInt(year);
		const startDate = new Date(yearNum, 0, 1).toISOString().split("T")[0];
		const endDate = new Date(yearNum, 11, 31).toISOString().split("T")[0];
		conditions.push({ meetingDate: { greater_than_equal: startDate } });
		conditions.push({ meetingDate: { less_than_equal: endDate } });
	}

	if (status) {
		const today = new Date().toISOString().split("T")[0];
		switch (status) {
			case "upcoming":
				conditions.push({ meetingDate: { greater_than_equal: today } });
				break;
			case "past":
				conditions.push({ meetingDate: { less_than_equal: today } });
				break;
			case "has-recordings":
				conditions.push({
					or: [
						{ videoUrl: { exists: true } },
						{ audioUrl: { exists: true } },
					],
				});
				break;
			case "has-minutes":
				conditions.push({
					or: [
						{ minutes: { exists: true } },
						{ minutesUrl: { exists: true } },
					],
				});
				break;
		}
	}

	if (hasRecordings) {
		conditions.push({
			or: [
				{ videoUrl: { exists: true } },
				{ audioUrl: { exists: true } },
			],
		});
	}

	return payload.find({
		collection: "meetings",
		where: { and: conditions },
		sort: "-meetingDate",
		limit,
		page,
	});
};

/**
 * Get a single meeting by slug
 */
export const getMeetingBySlug = async (slug: string) => {
	const payload = await getPayloadClient();
	if (!payload) return null;

	const result = await payload.find({
		collection: "meetings",
		where: { slug: { equals: slug } },
		limit: 1,
	});

	return result.docs[0] ?? null;
};

/**
 * Get team members, sorted by category and sortOrder
 */
export const getTeamMembers = async () => {
	const payload = await getPayloadClient();
	if (!payload) return [];

	const result = await payload.find({
		collection: "team-members",
		where: { isActive: { equals: true } },
		sort: "sortOrder",
		limit: 100,
	});

	return result.docs;
};

/**
 * Get history articles
 */
export const getHistoryArticles = async (type?: "period" | "landmark") => {
	const payload = await getPayloadClient();
	if (!payload) return [];

	const where: Where = {};
	if (type) {
		where.type = { equals: type };
	}

	const result = await payload.find({
		collection: "history-articles",
		where,
		sort: "sortOrder",
		limit: 100,
	});

	return result.docs;
};

/**
 * Get points of interest
 */
export const getPointsOfInterest = async (category?: string) => {
	const payload = await getPayloadClient();
	if (!payload) return [];

	const where: Where = {};
	if (category) {
		where.category = { equals: category };
	}

	const result = await payload.find({
		collection: "points-of-interest",
		where,
		sort: "name",
		limit: 100,
	});

	return result.docs;
};

/**
 * Get resources
 */
export const getResources = async (options?: { type?: string; category?: string }) => {
	const payload = await getPayloadClient();
	if (!payload) return [];

	const conditions: Where[] = [];

	if (options?.type) {
		conditions.push({ type: { equals: options.type } });
	}
	if (options?.category) {
		conditions.push({ category: { equals: options.category } });
	}

	const result = await payload.find({
		collection: "resources",
		where: conditions.length > 0 ? { and: conditions } : {},
		sort: "sortOrder",
		limit: 100,
	});

	return result.docs;
};

/**
 * Get emergency services
 */
export const getEmergencyServices = async () => {
	const payload = await getPayloadClient();
	if (!payload) return [];

	const result = await payload.find({
		collection: "emergency-services",
		sort: "sortOrder",
		limit: 100,
	});

	return result.docs;
};

/**
 * Get active announcements (emergency alerts)
 */
export const getActiveAnnouncements = async () => {
	const payload = await getPayloadClient();
	if (!payload) return [];

	const now = new Date().toISOString();

	const result = await payload.find({
		collection: "announcements",
		where: {
			and: [
				{ isActive: { equals: true } },
				{
					or: [
						{ startsAt: { exists: false } },
						{ startsAt: { less_than_equal: now } },
					],
				},
				{
					or: [
						{ endsAt: { exists: false } },
						{ endsAt: { greater_than_equal: now } },
					],
				},
			],
		},
		sort: "-level",
		limit: 10,
	});

	return result.docs;
};

/**
 * Get all announcements (for listing page)
 */
export const getAnnouncements = async (options?: {
	limit?: number;
	page?: number;
	level?: string;
	activeOnly?: boolean;
}) => {
	const payload = await getPayloadClient();
	if (!payload) return { docs: [], totalDocs: 0, totalPages: 0, page: 1 };

	const { limit = 10, page = 1, level, activeOnly } = options ?? {};

	const conditions: Where[] = [];

	if (level) {
		conditions.push({ level: { equals: level } });
	}

	if (activeOnly) {
		const now = new Date().toISOString();
		conditions.push({ isActive: { equals: true } });
		conditions.push({
			or: [
				{ startsAt: { exists: false } },
				{ startsAt: { less_than_equal: now } },
			],
		});
		conditions.push({
			or: [
				{ endsAt: { exists: false } },
				{ endsAt: { greater_than_equal: now } },
			],
		});
	}

	return payload.find({
		collection: "announcements",
		where: conditions.length > 0 ? { and: conditions } : {},
		sort: "-createdAt",
		limit,
		page,
	});
};

/**
 * Get a single announcement by ID
 */
export const getAnnouncementById = async (id: number) => {
	const payload = await getPayloadClient();
	if (!payload) return null;

	try {
		return await payload.findByID({
			collection: "announcements",
			id,
		});
	} catch {
		return null;
	}
};

/**
 * Get businesses
 */
export const getBusinesses = async (options?: {
	limit?: number;
	page?: number;
	category?: string;
	search?: string;
	featured?: boolean;
}) => {
	const payload = await getPayloadClient();
	if (!payload) return { docs: [], totalDocs: 0, totalPages: 0, page: 1 };

	const { limit = 10, page = 1, category, search, featured } = options ?? {};

	const conditions: Where[] = [];

	if (category) {
		conditions.push({ category: { equals: category } });
	}

	if (search) {
		conditions.push({
			or: [
				{ name: { like: search } },
				{ description: { like: search } },
			],
		});
	}

	if (featured) {
		conditions.push({ isFeatured: { equals: true } });
	}

	return payload.find({
		collection: "businesses",
		where: conditions.length > 0 ? { and: conditions } : {},
		sort: "-isFeatured,-isVerified,name",
		limit,
		page,
	});
};

/**
 * Get a single business by slug
 */
export const getBusinessBySlug = async (slug: string) => {
	const payload = await getPayloadClient();
	if (!payload) return null;

	const result = await payload.find({
		collection: "businesses",
		where: { slug: { equals: slug } },
		limit: 1,
	});

	return result.docs[0] ?? null;
};

/**
 * Get elections
 */
export const getElections = async (options?: {
	limit?: number;
	page?: number;
	status?: "upcoming" | "today" | "past";
	search?: string;
}) => {
	const payload = await getPayloadClient();
	if (!payload) return { docs: [], totalDocs: 0, totalPages: 0, page: 1 };

	const { limit = 10, page = 1, status, search } = options ?? {};

	const conditions: Where[] = [];
	const today = new Date().toISOString().split("T")[0];

	if (status === "upcoming") {
		conditions.push({ electionDate: { greater_than: today } });
	} else if (status === "today") {
		conditions.push({ electionDate: { equals: today } });
	} else if (status === "past") {
		conditions.push({ electionDate: { less_than: today } });
	}

	if (search) {
		conditions.push({
			or: [
				{ title: { like: search } },
				{ description: { like: search } },
			],
		});
	}

	return payload.find({
		collection: "elections",
		where: conditions.length > 0 ? { and: conditions } : {},
		sort: "-electionDate",
		limit,
		page,
	});
};

/**
 * Get a single election by slug
 */
export const getElectionBySlug = async (slug: string) => {
	const payload = await getPayloadClient();
	if (!payload) return null;

	const result = await payload.find({
		collection: "elections",
		where: { slug: { equals: slug } },
		limit: 1,
	});

	return result.docs[0] ?? null;
};

// --- Globals ---

/**
 * Get settings global
 */
export const getSettings = async () => {
	const payload = await getPayloadClient();
	if (!payload) return null;

	try {
		return await payload.findGlobal({ slug: "settings" });
	} catch {
		return null;
	}
};

/**
 * Get navigation global
 */
export const getNavigation = async () => {
	const payload = await getPayloadClient();
	if (!payload) return null;

	try {
		return await payload.findGlobal({ slug: "navigation" });
	} catch {
		return null;
	}
};

/**
 * Get homepage global
 */
export const getHomepage = async () => {
	const payload = await getPayloadClient();
	if (!payload) return null;

	try {
		return await payload.findGlobal({ slug: "homepage" });
	} catch {
		return null;
	}
};
