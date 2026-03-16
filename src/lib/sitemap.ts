import type { MetadataRoute } from "next";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site-config";

interface SitemapEntry {
	url: string;
	lastModified?: string | Date;
	changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
	priority?: number;
}

export async function generateSitemapEntries(): Promise<SitemapEntry[]> {
	const entries: SitemapEntry[] = [];

	// High priority static routes
	const highPriorityRoutes = [routes.home, routes.contact].map(
		(route) => ({
			url: `${siteConfig.url}${route}`,
			lastModified: new Date().toISOString(),
			changeFrequency: "daily" as const,
			priority: 1,
		})
	);

	// Town routes (medium-high priority)
	const townRoutes = Object.values(routes.town).map((route) => ({
		url: `${siteConfig.url}${route}`,
		lastModified: new Date().toISOString(),
		changeFrequency: "weekly" as const,
		priority: 0.8,
	}));

	// Low priority static routes
	const lowPriorityRoutes = [routes.terms, routes.privacy].map((route) => ({
		url: `${siteConfig.url}${route}`,
		lastModified: new Date().toISOString(),
		changeFrequency: "monthly" as const,
		priority: 0.5,
	}));

	// Add all entries
	entries.push(
		...highPriorityRoutes,
		...townRoutes,
		...lowPriorityRoutes,
	);

	return entries;
}

export async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
	const entries = await generateSitemapEntries();
	return entries;
}
