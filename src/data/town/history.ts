import type { TownHistoryArticle } from "./types";
import { mediaUrls } from "./media";

export const historyArticles: TownHistoryArticle[] = [
	// Periods
	{
		id: 1,
		title: "Early Settlement",
		slug: "early-settlement",
		type: "period",
		era: "Pre-1927",
		description: "The camp meeting grounds era before incorporation",
		content:
			"Before the town was officially established, the area that would become Harmony was known for its camp meeting grounds. Religious gatherings and revivals drew people from across the region, and a community began to form around these grounds.",
		image: mediaUrls["history-early"],
		highlights: [
			"Camp meeting grounds established",
			"Early religious gatherings and revivals",
			"Community begins to form around the grounds",
		],
		sortOrder: 0,
	},
	{
		id: 2,
		title: "Founding & Early Years",
		slug: "founding-years",
		type: "period",
		era: "1927-1950",
		description: "Establishment of the Town of Harmony",
		content:
			"The Town of Harmony was officially established in 1927, founded at the historic camp meeting grounds. The early years saw the community come together to build the institutions and traditions that would define the town for generations to come.",
		image: mediaUrls["history-founding"],
		highlights: [
			"Town officially established in 1927",
			"Founded at the camp meeting grounds",
			"Early community traditions established",
		],
		sortOrder: 1,
	},
	{
		id: 3,
		title: "Growth & Development",
		slug: "growth-era",
		type: "period",
		era: "1950-1980",
		description: "Post-war expansion and community building",
		content:
			"The post-war era brought significant growth and development to Harmony. New infrastructure, community organizations, and a strengthened sense of civic pride transformed the town into a thriving community.",
		image: mediaUrls["history-growth"],
		highlights: [
			"Post-war growth and development",
			"Infrastructure improvements",
			"Community organizations flourish",
		],
		sortOrder: 2,
	},
	{
		id: 4,
		title: "Modern Harmony",
		slug: "modern-era",
		type: "period",
		era: "1980-Present",
		description: "Preserving heritage while embracing the future",
		content:
			"In the modern era, Harmony has focused on historic preservation while welcoming new growth. Community festivals, celebrations, and a dedication to maintaining the town's character have kept the spirit of Harmony alive.",
		image: mediaUrls["history-modern"],
		highlights: [
			"Historic preservation efforts",
			"Community festivals and celebrations",
			"Where Harmony LIVES and SINGS!",
		],
		sortOrder: 3,
	},
	// Landmarks
	{
		id: 5,
		title: "Original Camp Meeting Grounds",
		slug: "camp-meeting-grounds",
		type: "landmark",
		year: "Pre-1927",
		address: "Harmony Highway",
		description:
			"The historic camp meeting grounds where the community first gathered, forming the foundation of what would become the Town of Harmony.",
		content:
			"The Original Camp Meeting Grounds are the birthplace of the Harmony community. Before the town was incorporated, these grounds served as a gathering place for religious revivals and camp meetings that drew people from across the region.",
		image: mediaUrls["landmark-camp-grounds"],
		sortOrder: 0,
	},
	{
		id: 6,
		title: "Town Hall",
		slug: "town-hall-landmark",
		type: "landmark",
		year: "1927",
		address: "3389 Harmony Hwy",
		description:
			"The seat of town government since Harmony's founding, serving as the center of civic life.",
		content:
			"Town Hall has served as the center of government and civic life in Harmony since the town's founding in 1927. It continues to house town offices and serve as the meeting place for the Board of Aldermen.",
		image: mediaUrls["landmark-town-hall"],
		sortOrder: 1,
	},
	{
		id: 7,
		title: "Historic Harmony Church",
		slug: "historic-church",
		type: "landmark",
		year: "Early 1900s",
		address: "Church Street",
		description:
			"One of the earliest churches in the community, central to Harmony's spiritual heritage.",
		content:
			"The Historic Harmony Church stands as a testament to the community's deep spiritual roots. Dating back to the early 1900s, the church has been a cornerstone of community life and worship in Harmony.",
		image: mediaUrls["landmark-church"],
		sortOrder: 2,
	},
	{
		id: 8,
		title: "Community Center",
		slug: "community-center",
		type: "landmark",
		year: "1950s",
		address: "Main Street",
		description:
			"A gathering place for community events, celebrations, and civic activities.",
		content:
			"The Community Center was built in the 1950s to provide a dedicated space for community gatherings, events, and civic activities. It continues to serve as a vital hub for the people of Harmony.",
		image: mediaUrls["landmark-community-center"],
		sortOrder: 3,
	},
];
