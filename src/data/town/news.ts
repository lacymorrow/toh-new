import type { TownNews } from "./types";
import { mediaUrls } from "./media";

export const news: TownNews[] = [
	{
		id: 1,
		title: "Spring Cleanup Day Scheduled for April",
		slug: "spring-cleanup-day-2025",
		excerpt:
			"Join your neighbors for our annual Spring Cleanup Day. Volunteers will gather to beautify our town's parks, roads, and public spaces.",
		content:
			"The Town of Harmony is excited to announce our annual Spring Cleanup Day! This year's event will take place on the third Saturday in April. Volunteers are encouraged to meet at Town Hall at 8:00 AM where supplies, refreshments, and assignments will be provided. Together, we can keep our community beautiful and show our pride in Harmony. Trash bags, gloves, and safety vests will be provided. Bring your family, friends, and neighbors — the more hands we have, the more we can accomplish. Last year, over 100 volunteers participated and collected more than 200 bags of litter from our roadways and public spaces.",
		featuredImage: mediaUrls["news-spring-cleanup"],
		status: "published",
		publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
		categories: ["community", "events"],
		tags: ["cleanup", "volunteer", "spring"],
	},
	{
		id: 2,
		title: "Town Council Approves New Park Improvements",
		slug: "park-improvements-approved",
		excerpt:
			"The Board of Aldermen has approved funding for significant improvements to Harmony Park, including new playground equipment and walking trails.",
		content:
			"At the most recent Board of Aldermen meeting, the Town Council unanimously approved a plan to invest in major improvements to Harmony Park. The project will include new state-of-the-art playground equipment, an extended walking trail system, improved lighting, and additional picnic shelters. Construction is expected to begin this summer and be completed by fall. The improvements are funded through a combination of town funds and a state recreation grant. Mayor Sean Turner stated that these improvements reflect the town's commitment to providing quality recreational facilities for residents of all ages. Public input sessions were held earlier this year, and the final plan incorporates many suggestions from community members.",
		featuredImage: mediaUrls["news-park-improvements"],
		status: "published",
		publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
		categories: ["government", "infrastructure"],
		tags: ["parks", "improvements", "council"],
	},
	{
		id: 3,
		title: "Harmony Farmers Market Returns This Weekend",
		slug: "farmers-market-returns",
		excerpt:
			"The beloved Harmony Farmers Market kicks off its new season this Saturday with local vendors, fresh produce, and live music.",
		content:
			"The Harmony Farmers Market is back for another season! Starting this Saturday, the market will operate every Saturday morning from 8:00 AM to 12:00 PM at the Town Hall parking lot. This year's market features over 20 local vendors offering fresh produce, baked goods, honey, handmade crafts, and more. Live music will be featured each week, and there will be special activities for children. The Farmers Market has been a Harmony tradition for over a decade, connecting residents with local growers and artisans while building community. New vendors are always welcome — contact the Parks & Recreation Department for vendor application information.",
		featuredImage: mediaUrls["news-farmers-market"],
		status: "published",
		publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
		categories: ["community", "events", "business"],
		tags: ["farmers-market", "local", "shopping"],
	},
];
