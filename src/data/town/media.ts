/**
 * Media URL map for town content images.
 * Uses picsum.photos with deterministic seeds for consistent placeholder images.
 */
export const mediaUrls = {
	// Homepage hero slides
	"hero-welcome": "https://picsum.photos/seed/harmony-welcome/1920/1080",
	"hero-events": "https://picsum.photos/seed/harmony-events/1920/1080",
	"hero-meetings": "https://picsum.photos/seed/harmony-meetings/1920/1080",
	"hero-explore": "https://picsum.photos/seed/harmony-explore/1920/1080",

	// News articles
	"news-spring-cleanup": "https://picsum.photos/seed/harmony-cleanup/1200/800",
	"news-park-improvements": "https://picsum.photos/seed/harmony-park/1200/800",
	"news-farmers-market": "https://picsum.photos/seed/harmony-market/1200/800",

	// Events
	"event-farmers-market": "https://picsum.photos/seed/harmony-sat-market/1200/800",
	"event-fall-festival": "https://picsum.photos/seed/harmony-fall/1200/800",
	"event-christmas-parade": "https://picsum.photos/seed/harmony-christmas/1200/800",
	"event-spring-cleanup": "https://picsum.photos/seed/harmony-spring-cleanup/1200/800",

	// Points of Interest
	"poi-park": "https://picsum.photos/seed/harmony-poi-park/1200/800",
	"poi-town-hall": "https://picsum.photos/seed/harmony-poi-hall/1200/800",
	"poi-camp-grounds": "https://picsum.photos/seed/harmony-poi-camp/1200/800",
	"poi-memorial": "https://picsum.photos/seed/harmony-poi-memorial/1200/800",
	"poi-community-center": "https://picsum.photos/seed/harmony-poi-cc/1200/800",
	"poi-school": "https://picsum.photos/seed/harmony-poi-school/1200/800",

	// History
	"history-early": "https://picsum.photos/seed/harmony-hist-early/1200/800",
	"history-founding": "https://picsum.photos/seed/harmony-hist-founding/1200/800",
	"history-growth": "https://picsum.photos/seed/harmony-hist-growth/1200/800",
	"history-modern": "https://picsum.photos/seed/harmony-hist-modern/1200/800",
	"landmark-camp-grounds": "https://picsum.photos/seed/harmony-lm-camp/1200/800",
	"landmark-town-hall": "https://picsum.photos/seed/harmony-lm-hall/1200/800",
	"landmark-church": "https://picsum.photos/seed/harmony-lm-church/1200/800",
	"landmark-community-center": "https://picsum.photos/seed/harmony-lm-cc/1200/800",

	// Businesses
	"biz-general-store": "https://picsum.photos/seed/harmony-biz-store/800/600",
	"biz-diner": "https://picsum.photos/seed/harmony-biz-diner/800/600",
	"biz-medical": "https://picsum.photos/seed/harmony-biz-med/800/600",
	"biz-hardware": "https://picsum.photos/seed/harmony-biz-hw/800/600",
	"biz-auto": "https://picsum.photos/seed/harmony-biz-auto/800/600",
	"biz-thrift": "https://picsum.photos/seed/harmony-biz-thrift/800/600",
} as const;

export type MediaKey = keyof typeof mediaUrls;
