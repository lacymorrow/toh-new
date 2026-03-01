import type { Payload } from "payload";
import { seedSettings } from "./settings";
import { seedNavigation } from "./navigation";
import { seedHomepage } from "./homepage";
import { seedTeamMembers } from "./team-members";
import { seedHistory } from "./history";
import { seedPointsOfInterest } from "./points-of-interest";
import { seedEmergencyServices } from "./emergency-services";
import { seedResources } from "./resources";
import { seedSampleNews } from "./sample-news";
import { seedSampleEvents } from "./sample-events";
import { seedSampleMeetings } from "./sample-meetings";
import { seedSampleBusinesses } from "./sample-businesses";
import { seedSampleElections } from "./sample-elections";
import { seedMedia } from "./seed-media";

export const seedTownData = async (payload: Payload) => {
	try {
		console.info("🏘️ Starting Town of Harmony seed process...");

		// 0. Media first (images for all content)
		const media = await seedMedia(payload);

		// 1. Globals
		await seedSettings(payload);
		await seedNavigation(payload);
		await seedHomepage(payload, media);

		// 2. Core content
		await seedTeamMembers(payload, media);
		await seedHistory(payload, media);
		await seedPointsOfInterest(payload, media);
		await seedEmergencyServices(payload);
		await seedResources(payload);

		// 3. Sample content
		await seedSampleNews(payload, media);
		await seedSampleEvents(payload, media);
		await seedSampleMeetings(payload);
		await seedSampleBusinesses(payload, media);
		await seedSampleElections(payload);

		console.info("✨ Town of Harmony seed completed successfully!");
		return true;
	} catch (error) {
		console.error("❌ Error in Town of Harmony seed process:", error);
		return false;
	}
};

// Re-export individual seed functions for selective seeding
export {
	seedSettings,
	seedNavigation,
	seedHomepage,
	seedTeamMembers,
	seedHistory,
	seedPointsOfInterest,
	seedEmergencyServices,
	seedResources,
	seedSampleNews,
	seedSampleEvents,
	seedSampleMeetings,
	seedSampleBusinesses,
	seedSampleElections,
	seedMedia,
};
