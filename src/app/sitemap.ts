import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = siteConfig.url;

	// Use a fixed build-time date so crawlers don't think content changes on every request
	const buildDate = new Date("2025-03-25T00:00:00Z");

	// Static pages with known URLs
	const staticPages: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: buildDate,
			changeFrequency: "daily",
			priority: 1,
		},
		{
			url: `${baseUrl}/meetings`,
			lastModified: buildDate,
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/agenda-minutes`,
			lastModified: buildDate,
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/our-team`,
			lastModified: buildDate,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/news`,
			lastModified: buildDate,
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/events`,
			lastModified: buildDate,
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/emergency`,
			lastModified: buildDate,
			changeFrequency: "daily",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/business`,
			lastModified: buildDate,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/elections`,
			lastModified: buildDate,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/history`,
			lastModified: buildDate,
			changeFrequency: "yearly",
			priority: 0.6,
		},
		{
			url: `${baseUrl}/points-of-interest`,
			lastModified: buildDate,
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: `${baseUrl}/resources`,
			lastModified: buildDate,
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: `${baseUrl}/sewer`,
			lastModified: buildDate,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/map`,
			lastModified: buildDate,
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: `${baseUrl}/contact`,
			lastModified: buildDate,
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/terms-of-service`,
			lastModified: buildDate,
			changeFrequency: "monthly",
			priority: 0.3,
		},
		{
			url: `${baseUrl}/privacy`,
			lastModified: buildDate,
			changeFrequency: "monthly",
			priority: 0.3,
		},
	];

	return staticPages;
}
