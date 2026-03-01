import type { Payload } from "payload";

/**
 * Image definitions for seeding.
 * Uses picsum.photos with deterministic seeds for consistent placeholder images.
 */
const IMAGE_DEFINITIONS = {
	// Homepage hero slides
	"hero-welcome": {
		alt: "Aerial view of the Town of Harmony, North Carolina",
		seed: "harmony-welcome",
		width: 1920,
		height: 1080,
	},
	"hero-events": {
		alt: "Community gathering at a town festival",
		seed: "harmony-events",
		width: 1920,
		height: 1080,
	},
	"hero-meetings": {
		alt: "Town Hall building exterior",
		seed: "harmony-meetings",
		width: 1920,
		height: 1080,
	},
	"hero-explore": {
		alt: "Scenic countryside landscape in Iredell County",
		seed: "harmony-explore",
		width: 1920,
		height: 1080,
	},

	// News articles
	"news-spring-cleanup": {
		alt: "Volunteers cleaning up a community park",
		seed: "harmony-cleanup",
		width: 1200,
		height: 800,
	},
	"news-park-improvements": {
		alt: "Park with playground equipment and walking trails",
		seed: "harmony-park",
		width: 1200,
		height: 800,
	},
	"news-farmers-market": {
		alt: "Farmers market with fresh produce and local vendors",
		seed: "harmony-market",
		width: 1200,
		height: 800,
	},

	// Events
	"event-farmers-market": {
		alt: "Saturday morning farmers market in Harmony",
		seed: "harmony-sat-market",
		width: 1200,
		height: 800,
	},
	"event-fall-festival": {
		alt: "Fall festival with autumn decorations and activities",
		seed: "harmony-fall",
		width: 1200,
		height: 800,
	},
	"event-christmas-parade": {
		alt: "Holiday parade on Harmony Highway",
		seed: "harmony-christmas",
		width: 1200,
		height: 800,
	},
	"event-spring-cleanup": {
		alt: "Community volunteers at Spring Cleanup Day",
		seed: "harmony-spring-cleanup",
		width: 1200,
		height: 800,
	},

	// Points of Interest
	"poi-park": {
		alt: "Harmony Park with green spaces and recreation areas",
		seed: "harmony-poi-park",
		width: 1200,
		height: 800,
	},
	"poi-town-hall": {
		alt: "Harmony Town Hall, the center of local government",
		seed: "harmony-poi-hall",
		width: 1200,
		height: 800,
	},
	"poi-camp-grounds": {
		alt: "Historic camp meeting grounds in Harmony",
		seed: "harmony-poi-camp",
		width: 1200,
		height: 800,
	},
	"poi-memorial": {
		alt: "Harmony Veterans Memorial with flags and plaques",
		seed: "harmony-poi-memorial",
		width: 1200,
		height: 800,
	},
	"poi-community-center": {
		alt: "Harmony Community Center building",
		seed: "harmony-poi-cc",
		width: 1200,
		height: 800,
	},
	"poi-school": {
		alt: "Harmony Elementary School campus",
		seed: "harmony-poi-school",
		width: 1200,
		height: 800,
	},

	// History
	"history-early": {
		alt: "Historical illustration of early settlement camp meetings",
		seed: "harmony-hist-early",
		width: 1200,
		height: 800,
	},
	"history-founding": {
		alt: "Historical photo of Harmony's founding era in the 1920s",
		seed: "harmony-hist-founding",
		width: 1200,
		height: 800,
	},
	"history-growth": {
		alt: "Mid-century development and growth in Harmony",
		seed: "harmony-hist-growth",
		width: 1200,
		height: 800,
	},
	"history-modern": {
		alt: "Modern day Town of Harmony community",
		seed: "harmony-hist-modern",
		width: 1200,
		height: 800,
	},
	"landmark-camp-grounds": {
		alt: "The original camp meeting grounds, birthplace of Harmony",
		seed: "harmony-lm-camp",
		width: 1200,
		height: 800,
	},
	"landmark-town-hall": {
		alt: "Historic Town Hall building since 1927",
		seed: "harmony-lm-hall",
		width: 1200,
		height: 800,
	},
	"landmark-church": {
		alt: "Historic Harmony Church dating to the early 1900s",
		seed: "harmony-lm-church",
		width: 1200,
		height: 800,
	},
	"landmark-community-center": {
		alt: "Harmony Community Center, built in the 1950s",
		seed: "harmony-lm-cc",
		width: 1200,
		height: 800,
	},

	// Businesses
	"biz-general-store": {
		alt: "Harmony General Store storefront",
		seed: "harmony-biz-store",
		width: 800,
		height: 600,
	},
	"biz-diner": {
		alt: "Southern Comfort Diner, home-style cooking",
		seed: "harmony-biz-diner",
		width: 800,
		height: 600,
	},
	"biz-medical": {
		alt: "Harmony Family Medicine office",
		seed: "harmony-biz-med",
		width: 800,
		height: 600,
	},
	"biz-hardware": {
		alt: "Harmony Hardware & Farm Supply store",
		seed: "harmony-biz-hw",
		width: 800,
		height: 600,
	},
	"biz-auto": {
		alt: "Harmony Auto Repair shop",
		seed: "harmony-biz-auto",
		width: 800,
		height: 600,
	},
	"biz-thrift": {
		alt: "Harmony Community Church Thrift Store",
		seed: "harmony-biz-thrift",
		width: 800,
		height: 600,
	},
} as const;

export type MediaKey = keyof typeof IMAGE_DEFINITIONS;
export type MediaMap = Record<MediaKey, number>;

const fetchImageBuffer = async (
	seed: string,
	width: number,
	height: number,
): Promise<Buffer | null> => {
	try {
		const url = `https://picsum.photos/seed/${seed}/${width}/${height}`;
		const response = await fetch(url);
		if (!response.ok) {
			console.warn(`Failed to fetch image from ${url}: ${response.status}`);
			return null;
		}
		const arrayBuffer = await response.arrayBuffer();
		return Buffer.from(arrayBuffer);
	} catch (error) {
		console.warn(`Error fetching placeholder image (seed: ${seed}):`, error);
		return null;
	}
};

/**
 * Creates a minimal 1x1 JPEG as a fallback when image fetching fails.
 */
// prettier-ignore
// biome-ignore format: binary data
const FALLBACK_JPEG_B64 = "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/9oACAEBAAA/AHuUEQAAAAD/2Q==";
const createFallbackImage = (): Buffer => Buffer.from(FALLBACK_JPEG_B64, "base64");

export const seedMedia = async (payload: Payload): Promise<MediaMap> => {
	console.info("🖼️ Seeding media images...");

	// Clear existing media
	await payload.delete({
		collection: "media",
		where: {
			id: {
				exists: true,
			},
		},
	});

	const mediaMap = {} as Record<string, number>;
	const entries = Object.entries(IMAGE_DEFINITIONS);

	// Process in batches of 5 to avoid overwhelming the network
	const batchSize = 5;
	for (let i = 0; i < entries.length; i += batchSize) {
		const batch = entries.slice(i, i + batchSize);
		const results = await Promise.all(
			batch.map(async ([key, def]) => {
				try {
					let buffer = await fetchImageBuffer(def.seed, def.width, def.height);
					const isFallback = !buffer;
					if (!buffer) {
						buffer = createFallbackImage();
					}

					const media = await payload.create({
						collection: "media",
						data: {
							alt: def.alt,
						},
						file: {
							data: buffer,
							mimetype: "image/jpeg",
							name: `${key}.jpg`,
							size: buffer.length,
						},
					});

					if (isFallback) {
						console.warn(`  ⚠️ Used fallback image for: ${key}`);
					}

					return { key, id: media.id as number };
				} catch (error) {
					console.error(`  ❌ Failed to create media: ${key}`, error);
					return null;
				}
			}),
		);

		for (const result of results) {
			if (result) {
				mediaMap[result.key] = result.id;
			}
		}

		console.info(
			`  📸 Uploaded batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(entries.length / batchSize)}`,
		);
	}

	const total = Object.keys(mediaMap).length;
	console.info(`✅ Created ${total}/${entries.length} media items`);
	return mediaMap as MediaMap;
};
