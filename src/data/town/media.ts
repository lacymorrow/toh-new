/**
 * Media URL map for town content images.
 * Uses real photos from the Town of Harmony where available.
 * Remaining entries use the town logo as a generic placeholder.
 */

const TOWN_IMG = "/images/town";

export const mediaUrls = {
	// Homepage hero slides
	"hero-welcome": `${TOWN_IMG}/family-park-1.webp`,
	"hero-events": `${TOWN_IMG}/christmas-parade-float.jpg`,
	"hero-meetings": `${TOWN_IMG}/community-center.webp`,
	"hero-explore": `${TOWN_IMG}/family-park-2.webp`,

	// News articles
	"news-spring-cleanup": `${TOWN_IMG}/spring-in-the-park.webp`,
	"news-park-improvements": `${TOWN_IMG}/family-park-3.webp`,
	"news-farmers-market": `${TOWN_IMG}/family-park-1.webp`,

	// Events
	"event-farmers-market": `${TOWN_IMG}/family-park-2.webp`,
	"event-fall-festival": `${TOWN_IMG}/family-park-3.webp`,
	"event-christmas-parade": `${TOWN_IMG}/christmas-parade-float.jpg`,
	"event-spring-cleanup": `${TOWN_IMG}/spring-in-the-park.webp`,

	// Points of Interest
	"poi-park": `${TOWN_IMG}/family-park-1.webp`,
	"poi-town-hall": `${TOWN_IMG}/community-center.webp`,
	"poi-camp-grounds": `${TOWN_IMG}/family-park-3.webp`,
	"poi-memorial": `${TOWN_IMG}/family-park-2.webp`,
	"poi-community-center": `${TOWN_IMG}/community-center.webp`,
	"poi-school": `${TOWN_IMG}/logo.png`,

	// History — no historical photos available from legacy site
	"history-early": `${TOWN_IMG}/family-park-1.webp`,
	"history-founding": `${TOWN_IMG}/community-center.webp`,
	"history-growth": `${TOWN_IMG}/christmas-parade-float.jpg`,
	"history-modern": `${TOWN_IMG}/family-park-2.webp`,
	"landmark-camp-grounds": `${TOWN_IMG}/family-park-3.webp`,
	"landmark-town-hall": `${TOWN_IMG}/community-center.webp`,
	"landmark-church": `${TOWN_IMG}/logo.png`,
	"landmark-community-center": `${TOWN_IMG}/community-center.webp`,

	// Businesses (civic institutions) — no specific photos available
	"biz-general-store": `${TOWN_IMG}/logo.png`,
	"biz-diner": `${TOWN_IMG}/logo.png`,
	"biz-medical": `${TOWN_IMG}/logo.png`,
	"biz-hardware": `${TOWN_IMG}/logo.png`,
	"biz-auto": `${TOWN_IMG}/logo.png`,
	"biz-thrift": `${TOWN_IMG}/logo.png`,
} as const;

export type MediaKey = keyof typeof mediaUrls;
