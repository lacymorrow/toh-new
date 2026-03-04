/**
 * Seed Builder.io data models and entries via the Admin SDK and Write API.
 *
 * Usage:
 *   BUILDER_PRIVATE_KEY=<key> npx tsx scripts/seed-builder-data.ts
 *   BUILDER_PRIVATE_KEY=<key> npx tsx scripts/seed-builder-data.ts --models-only
 *   BUILDER_PRIVATE_KEY=<key> npx tsx scripts/seed-builder-data.ts --data-only
 *   BUILDER_PRIVATE_KEY=<key> npx tsx scripts/seed-builder-data.ts --model=town-news
 *
 * Requires:
 *   BUILDER_PRIVATE_KEY - Builder.io private API key
 *   NEXT_PUBLIC_BUILDER_API_KEY - Builder.io public API key
 */

import { createAdminApiClient } from "@builder.io/admin-sdk";
import { modelDefinitions } from "../src/lib/builder-model-definitions";

const BUILDER_PRIVATE_KEY = process.env.BUILDER_PRIVATE_KEY;
const BUILDER_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY;

if (!BUILDER_PRIVATE_KEY) {
	console.error("Missing BUILDER_PRIVATE_KEY env var");
	process.exit(1);
}
if (!BUILDER_API_KEY) {
	console.error("Missing NEXT_PUBLIC_BUILDER_API_KEY env var");
	process.exit(1);
}

const adminClient = createAdminApiClient(BUILDER_PRIVATE_KEY);

// --- CLI flags ---
const args = process.argv.slice(2);
const modelsOnly = args.includes("--models-only");
const dataOnly = args.includes("--data-only");
const modelFilter = args.find((a) => a.startsWith("--model="))?.split("=")[1];

// --- Date helpers (match the ones in data files) ---
const getNextDate = (month: number, day: number) => {
	const now = new Date();
	const year = now.getMonth() >= month ? now.getFullYear() + 1 : now.getFullYear();
	return new Date(year, month, day).toISOString();
};

const getNextSaturday = () => {
	const now = new Date();
	const daysUntilSaturday = (6 - now.getDay() + 7) % 7 || 7;
	const nextSaturday = new Date(now);
	nextSaturday.setDate(now.getDate() + daysUntilSaturday);
	return nextSaturday.toISOString();
};

const getFutureDate = (daysFromNow: number) => {
	const date = new Date();
	date.setDate(date.getDate() + daysFromNow);
	return date.toISOString();
};

// --- Media URLs (copied from src/data/town/media.ts to avoid import issues) ---
const mediaUrls = {
	"news-spring-cleanup": "https://picsum.photos/seed/harmony-cleanup/1200/800",
	"news-park-improvements": "https://picsum.photos/seed/harmony-park/1200/800",
	"news-farmers-market": "https://picsum.photos/seed/harmony-market/1200/800",
	"event-farmers-market": "https://picsum.photos/seed/harmony-sat-market/1200/800",
	"event-fall-festival": "https://picsum.photos/seed/harmony-fall/1200/800",
	"event-christmas-parade": "https://picsum.photos/seed/harmony-christmas/1200/800",
	"event-spring-cleanup": "https://picsum.photos/seed/harmony-spring-cleanup/1200/800",
	"poi-park": "https://picsum.photos/seed/harmony-poi-park/1200/800",
	"poi-town-hall": "https://picsum.photos/seed/harmony-poi-hall/1200/800",
	"poi-camp-grounds": "https://picsum.photos/seed/harmony-poi-camp/1200/800",
	"poi-memorial": "https://picsum.photos/seed/harmony-poi-memorial/1200/800",
	"poi-community-center": "https://picsum.photos/seed/harmony-poi-cc/1200/800",
	"poi-school": "https://picsum.photos/seed/harmony-poi-school/1200/800",
	"history-early": "https://picsum.photos/seed/harmony-hist-early/1200/800",
	"history-founding": "https://picsum.photos/seed/harmony-hist-founding/1200/800",
	"history-growth": "https://picsum.photos/seed/harmony-hist-growth/1200/800",
	"history-modern": "https://picsum.photos/seed/harmony-hist-modern/1200/800",
	"landmark-camp-grounds": "https://picsum.photos/seed/harmony-lm-camp/1200/800",
	"landmark-town-hall": "https://picsum.photos/seed/harmony-lm-hall/1200/800",
	"landmark-church": "https://picsum.photos/seed/harmony-lm-church/1200/800",
	"landmark-community-center": "https://picsum.photos/seed/harmony-lm-cc/1200/800",
	"biz-general-store": "https://picsum.photos/seed/harmony-biz-store/800/600",
	"biz-diner": "https://picsum.photos/seed/harmony-biz-diner/800/600",
	"biz-medical": "https://picsum.photos/seed/harmony-biz-med/800/600",
	"biz-hardware": "https://picsum.photos/seed/harmony-biz-hw/800/600",
	"biz-auto": "https://picsum.photos/seed/harmony-biz-auto/800/600",
	"biz-thrift": "https://picsum.photos/seed/harmony-biz-thrift/800/600",
} as const;

// ============================================================
// Data entries for each model
// ============================================================

interface SeedEntry {
	name: string;
	data: Record<string, unknown>;
}

const seedData: Record<string, SeedEntry[]> = {
	"town-team-member": [
		{ name: "Sean Turner", data: { name: "Sean Turner", title: "Mayor", category: "Executive", email: "mayor@townofharmony.org", phone: "(704) 546-7001", termExpires: "2024", sortOrder: 0, isActive: true } },
		{ name: "Wanda Edwards", data: { name: "Wanda Edwards", title: "Town Clerk", category: "Executive", email: "clerk@townofharmony.org", phone: "(704) 546-7002", sortOrder: 1, isActive: true } },
		{ name: "Brandon Angell", data: { name: "Brandon Angell", title: "Alderman", category: "Board of Aldermen", email: "bangell@townofharmony.org", phone: "(704) 546-7011", termExpires: "2025", sortOrder: 0, isActive: true } },
		{ name: "Jared Clark", data: { name: "Jared Clark", title: "Alderman", category: "Board of Aldermen", email: "jclark@townofharmony.org", phone: "(704) 546-7012", termExpires: "2024", sortOrder: 1, isActive: true } },
		{ name: "Scotty Harris", data: { name: "Scotty Harris", title: "Alderman", category: "Board of Aldermen", email: "sharris@townofharmony.org", phone: "(704) 546-7013", termExpires: "2025", sortOrder: 2, isActive: true } },
		{ name: "Chris Pierce", data: { name: "Chris Pierce", title: "Alderman", category: "Board of Aldermen", email: "cpierce@townofharmony.org", phone: "(704) 546-7014", termExpires: "2024", sortOrder: 3, isActive: true } },
		{ name: "Michael Thompson", data: { name: "Michael Thompson", title: "Town Manager", category: "Department Heads", email: "manager@townofharmony.org", phone: "(704) 546-7003", department: "Administration", sortOrder: 0, isActive: true } },
		{ name: "Sarah Johnson", data: { name: "Sarah Johnson", title: "Finance Director", category: "Department Heads", email: "finance@townofharmony.org", phone: "(704) 546-7004", department: "Finance", sortOrder: 1, isActive: true } },
		{ name: "David Williams", data: { name: "David Williams", title: "Public Works Director", category: "Department Heads", email: "publicworks@townofharmony.org", phone: "(704) 546-7005", department: "Public Works", sortOrder: 2, isActive: true } },
		{ name: "Jennifer Martinez", data: { name: "Jennifer Martinez", title: "Parks & Recreation Director", category: "Department Heads", email: "recreation@townofharmony.org", phone: "(704) 546-7006", department: "Parks & Recreation", sortOrder: 3, isActive: true } },
		{ name: "Robert Anderson", data: { name: "Robert Anderson", title: "Planning Director", category: "Department Heads", email: "planning@townofharmony.org", phone: "(704) 546-7007", department: "Planning & Zoning", sortOrder: 4, isActive: true } },
		{ name: "Chief James Wilson", data: { name: "Chief James Wilson", title: "Police Chief", category: "Department Heads", email: "police@townofharmony.org", phone: "(704) 546-7008", department: "Police Department", sortOrder: 5, isActive: true } },
	],

	"town-emergency-service": [
		{ name: "Emergency Services", data: { title: "Emergency Services", description: "For life-threatening emergencies, fire, or crimes in progress. Call 911 immediately.", phone: "911", category: "immediate", icon: "Phone", preparedness: ["Call 911", "Know your address", "Stay calm", "Follow dispatcher instructions", "Do not hang up until told to do so"], sortOrder: 0 } },
		{ name: "Fire Department", data: { title: "Fire Department", description: "Harmony Volunteer Fire Department provides fire suppression, rescue, and emergency medical services to the community.", phone: "(704) 546-3200", category: "immediate", icon: "Flame", preparedness: ["Install smoke detectors on every level", "Create a fire escape plan", "Keep fire extinguishers accessible", "Never leave cooking unattended"], sortOrder: 1 } },
		{ name: "Police Department", data: { title: "Police Department", description: "The Harmony Police Department serves and protects the community with professional law enforcement services.", phone: "(704) 546-2340", category: "public-safety", icon: "Shield", preparedness: ["Lock doors and windows", "Report suspicious activity", "Keep emergency numbers handy"], sortOrder: 2 } },
		{ name: "Power Outages", data: { title: "Power Outages", description: "Report power outages and downed power lines. Stay away from downed lines and report them immediately.", phone: "(704) 555-0100", category: "utility", icon: "Zap", preparedness: ["Keep flashlights and batteries available", "Have a battery-powered radio", "Unplug sensitive electronics during storms"], sortOrder: 3 } },
		{ name: "Water/Sewer Emergency", data: { title: "Water/Sewer Emergency", description: "Report water main breaks, sewer backups, and other water or sewer emergencies.", phone: "(704) 555-0101", category: "utility", icon: "Wrench", preparedness: ["Know where your main water shutoff is", "Keep bottled water for emergencies", "Report leaks promptly"], sortOrder: 4 } },
		{ name: "Gas Leaks", data: { title: "Gas Leaks", description: "If you smell gas, leave the area immediately and call from a safe distance. Do not use electrical switches.", phone: "(704) 555-0102", category: "utility", icon: "AlertTriangle", preparedness: ["Know the smell of natural gas", "Leave immediately if you smell gas", "Do not use electrical switches or phones near a gas leak"], sortOrder: 5 } },
		{ name: "Animal Control", data: { title: "Animal Control", description: "Report stray, dangerous, or injured animals. Animal control officers are available to assist with animal-related issues.", phone: "(704) 555-0103", category: "public-safety", icon: "Shield", preparedness: ["Keep pets vaccinated and licensed", "Do not approach unfamiliar animals", "Secure garbage cans to avoid attracting wildlife"], sortOrder: 6 } },
		{ name: "Road Hazards", data: { title: "Road Hazards", description: "Report road hazards including fallen trees, potholes, flooding, and debris on roadways.", phone: "(704) 555-0104", category: "public-safety", icon: "AlertCircle", preparedness: ["Drive cautiously in bad weather", "Report hazards promptly", "Keep an emergency kit in your vehicle"], sortOrder: 7 } },
		{ name: "Hospital", data: { title: "Hospital", description: "Iredell Memorial Hospital provides emergency medical care and hospital services to the Harmony area.", phone: "(704) 555-0105", category: "health", icon: "Stethoscope", preparedness: ["Know the route to the nearest hospital", "Keep a list of medications and allergies", "Have health insurance information accessible"], sortOrder: 8 } },
		{ name: "Poison Control", data: { title: "Poison Control", description: "National Poison Control Center provides free, confidential medical advice 24 hours a day, 7 days a week.", phone: "1-800-222-1222", category: "health", icon: "ShieldAlert", preparedness: ["Keep the poison control number posted", "Store household chemicals safely", "Keep medications out of reach of children"], sortOrder: 9 } },
	],

	"town-history-article": [
		{ name: "Early Settlement", data: { title: "Early Settlement", slug: "early-settlement", type: "period", era: "Pre-1927", description: "The camp meeting grounds era before incorporation", content: "Before the town was officially established, the area that would become Harmony was known for its camp meeting grounds. Religious gatherings and revivals drew people from across the region, and a community began to form around these grounds.", image: mediaUrls["history-early"], highlights: ["Camp meeting grounds established", "Early religious gatherings and revivals", "Community begins to form around the grounds"], sortOrder: 0 } },
		{ name: "Founding & Early Years", data: { title: "Founding & Early Years", slug: "founding-years", type: "period", era: "1927-1950", description: "Establishment of the Town of Harmony", content: "The Town of Harmony was officially established in 1927, founded at the historic camp meeting grounds. The early years saw the community come together to build the institutions and traditions that would define the town for generations to come.", image: mediaUrls["history-founding"], highlights: ["Town officially established in 1927", "Founded at the camp meeting grounds", "Early community traditions established"], sortOrder: 1 } },
		{ name: "Growth & Development", data: { title: "Growth & Development", slug: "growth-era", type: "period", era: "1950-1980", description: "Post-war expansion and community building", content: "The post-war era brought significant growth and development to Harmony. New infrastructure, community organizations, and a strengthened sense of civic pride transformed the town into a thriving community.", image: mediaUrls["history-growth"], highlights: ["Post-war growth and development", "Infrastructure improvements", "Community organizations flourish"], sortOrder: 2 } },
		{ name: "Modern Harmony", data: { title: "Modern Harmony", slug: "modern-era", type: "period", era: "1980-Present", description: "Preserving heritage while embracing the future", content: "In the modern era, Harmony has focused on historic preservation while welcoming new growth. Community festivals, celebrations, and a dedication to maintaining the town's character have kept the spirit of Harmony alive.", image: mediaUrls["history-modern"], highlights: ["Historic preservation efforts", "Community festivals and celebrations", "Where Harmony LIVES and SINGS!"], sortOrder: 3 } },
		{ name: "Original Camp Meeting Grounds", data: { title: "Original Camp Meeting Grounds", slug: "camp-meeting-grounds", type: "landmark", year: "Pre-1927", address: "Harmony Highway", description: "The historic camp meeting grounds where the community first gathered, forming the foundation of what would become the Town of Harmony.", content: "The Original Camp Meeting Grounds are the birthplace of the Harmony community. Before the town was incorporated, these grounds served as a gathering place for religious revivals and camp meetings that drew people from across the region.", image: mediaUrls["landmark-camp-grounds"], sortOrder: 0 } },
		{ name: "Town Hall", data: { title: "Town Hall", slug: "town-hall-landmark", type: "landmark", year: "1927", address: "3389 Harmony Hwy", description: "The seat of town government since Harmony's founding, serving as the center of civic life.", content: "Town Hall has served as the center of government and civic life in Harmony since the town's founding in 1927. It continues to house town offices and serve as the meeting place for the Board of Aldermen.", image: mediaUrls["landmark-town-hall"], sortOrder: 1 } },
		{ name: "Historic Harmony Church", data: { title: "Historic Harmony Church", slug: "historic-church", type: "landmark", year: "Early 1900s", address: "Church Street", description: "One of the earliest churches in the community, central to Harmony's spiritual heritage.", content: "The Historic Harmony Church stands as a testament to the community's deep spiritual roots. Dating back to the early 1900s, the church has been a cornerstone of community life and worship in Harmony.", image: mediaUrls["landmark-church"], sortOrder: 2 } },
		{ name: "Community Center", data: { title: "Community Center", slug: "community-center", type: "landmark", year: "1950s", address: "Main Street", description: "A gathering place for community events, celebrations, and civic activities.", content: "The Community Center was built in the 1950s to provide a dedicated space for community gatherings, events, and civic activities. It continues to serve as a vital hub for the people of Harmony.", image: mediaUrls["landmark-community-center"], sortOrder: 3 } },
	],

	"town-point-of-interest": [
		{ name: "Harmony Park", data: { name: "Harmony Park", slug: "harmony-park", category: "Parks", description: "A beautiful community park offering recreational facilities for all ages. Features include a playground, walking trails, picnic shelters, and open green spaces perfect for family gatherings and community events.", image: mediaUrls["poi-park"], address: "100 Park Drive, Harmony, NC 28634", hours: "Dawn to Dusk", phone: "(704) 546-2342", amenities: ["Playground", "Walking Trails", "Picnic Shelters", "Open Fields", "Restrooms"] } },
		{ name: "Harmony Town Hall", data: { name: "Harmony Town Hall", slug: "town-hall", category: "Government", description: "The seat of town government and center of civic life in Harmony. Town Hall houses administrative offices and serves as the meeting place for the Board of Aldermen.", image: mediaUrls["poi-town-hall"], address: "3389 Harmony Hwy, Harmony, NC 28634", hours: "Monday - Friday: 8:00 AM - 5:00 PM", phone: "(704) 546-2339", amenities: ["Accessible Entrance", "Public Meeting Room", "Parking"] } },
		{ name: "Camp Meeting Grounds", data: { name: "Camp Meeting Grounds", slug: "camp-meeting-grounds-poi", category: "Historic Sites", description: "The original camp meeting grounds where the Harmony community first gathered. This historic site predates the town's incorporation and represents the spiritual and communal roots of Harmony.", image: mediaUrls["poi-camp-grounds"], address: "Harmony Highway, Harmony, NC 28634", hours: "Open during events", phone: "(704) 546-2339", amenities: ["Historic Markers", "Open Grounds", "Parking"] } },
		{ name: "Harmony Veterans Memorial", data: { name: "Harmony Veterans Memorial", slug: "veterans-memorial", category: "Memorials", description: "A solemn memorial honoring the brave men and women from the Harmony community who served in the United States Armed Forces.", image: mediaUrls["poi-memorial"], address: "Main Street, Harmony, NC 28634", hours: "Open 24 hours", amenities: ["Memorial Plaques", "Flag Display", "Garden", "Benches"] } },
		{ name: "Harmony Community Center", data: { name: "Harmony Community Center", slug: "community-center-poi", category: "Government", description: "A multipurpose facility that serves as the heart of community activities. The center hosts meetings, classes, events, and social gatherings.", image: mediaUrls["poi-community-center"], address: "Main Street, Harmony, NC 28634", hours: "Monday - Saturday: 9:00 AM - 9:00 PM", phone: "(704) 546-2342", amenities: ["Meeting Rooms", "Kitchen", "Stage", "Parking", "Accessible"] } },
		{ name: "Harmony Elementary School", data: { name: "Harmony Elementary School", slug: "harmony-elementary", category: "Education", description: "Part of the Iredell-Statesville Schools district, Harmony Elementary serves the children of the Harmony community.", image: mediaUrls["poi-school"], address: "Harmony Highway, Harmony, NC 28634", hours: "School hours: 7:30 AM - 2:30 PM", phone: "(704) 546-2340", amenities: ["Playground", "Athletic Fields", "Library", "Parking"] } },
	],

	"town-resource": [
		{ name: "Town Charter", data: { title: "Town Charter", slug: "town-charter", type: "document", category: "General", icon: "FileText", description: "The founding charter of the Town of Harmony, outlining the structure and powers of the town government.", sortOrder: 0 } },
		{ name: "Town Ordinances", data: { title: "Town Ordinances", slug: "town-ordinances", type: "document", category: "General", icon: "FileText", description: "A compilation of all current town ordinances and local laws governing the Town of Harmony.", sortOrder: 1 } },
		{ name: "Annual Budget", data: { title: "Annual Budget", slug: "annual-budget", type: "document", category: "General", icon: "FileText", description: "The current fiscal year budget for the Town of Harmony, including revenue projections and expenditure details.", sortOrder: 2 } },
		{ name: "Emergency Services", data: { title: "Emergency Services", slug: "emergency-services-resource", type: "service", category: "Community", icon: "Shield", description: "Access emergency services including police, fire, and medical assistance.", contactPhone: "911", sortOrder: 3 } },
		{ name: "Town Hall", data: { title: "Town Hall", slug: "town-hall-service", type: "service", category: "Community", icon: "Home", description: "Town Hall administrative offices providing general town services, permits, and information.", contactPhone: "(704) 546-2339", sortOrder: 4 } },
		{ name: "Public Works", data: { title: "Public Works", slug: "public-works-service", type: "service", category: "Community", icon: "Wrench", description: "Public Works Department handles roads, water, sewer, and infrastructure maintenance.", contactPhone: "(704) 546-2341", contactEmail: "publicworks@townofharmony.org", sortOrder: 5 } },
		{ name: "Parks & Recreation", data: { title: "Parks & Recreation", slug: "parks-service", type: "service", category: "Community", icon: "Heart", description: "Parks & Recreation Department manages town parks, recreational facilities, and community programs.", contactPhone: "(704) 546-2342", contactEmail: "recreation@townofharmony.org", sortOrder: 6 } },
		{ name: "Iredell County Government", data: { title: "Iredell County Government", slug: "iredell-county", type: "link", category: "External", icon: "Globe", description: "Official website of Iredell County Government, providing county services and information.", externalUrl: "https://www.co.iredell.nc.us/", sortOrder: 7 } },
		{ name: "North Carolina State Government", data: { title: "North Carolina State Government", slug: "nc-state", type: "link", category: "External", icon: "Globe", description: "Official website of the State of North Carolina.", externalUrl: "https://www.nc.gov/", sortOrder: 8 } },
		{ name: "Iredell-Statesville Schools", data: { title: "Iredell-Statesville Schools", slug: "iss-schools", type: "link", category: "External", icon: "Globe", description: "Iredell-Statesville Schools district serving the Harmony area.", externalUrl: "https://www.iss.k12.nc.us/", sortOrder: 9 } },
		{ name: "Greater Statesville Chamber", data: { title: "Greater Statesville Chamber", slug: "statesville-chamber", type: "link", category: "External", icon: "Globe", description: "Greater Statesville Chamber of Commerce supporting local businesses and economic development.", externalUrl: "https://statesvillechamber.org/", sortOrder: 10 } },
	],

	"town-permit-type": [
		{ name: "Building Permit", data: { permitId: "building", name: "Building Permit", description: "Required for new construction, additions, and major renovations", fee: 10000, processingTime: "2-4 weeks", requirements: ["Construction plans and blueprints", "Site survey", "Engineering reports (if applicable)", "Contractor license verification"], category: "construction", icon: "Building" } },
		{ name: "Residential Renovation", data: { permitId: "residential-renovation", name: "Residential Renovation", description: "For interior and exterior home improvements", fee: 5000, processingTime: "1-2 weeks", requirements: ["Project description", "Before/after photos or drawings", "Contractor information"], category: "construction", icon: "Home" } },
		{ name: "Electrical Permit", data: { permitId: "electrical", name: "Electrical Permit", description: "For electrical work and installations", fee: 7500, processingTime: "3-5 business days", requirements: ["Electrical plan", "Licensed electrician information", "Load calculations"], category: "utilities", icon: "Zap" } },
		{ name: "Plumbing Permit", data: { permitId: "plumbing", name: "Plumbing Permit", description: "For plumbing installations and major repairs", fee: 6000, processingTime: "3-5 business days", requirements: ["Plumbing diagram", "Licensed plumber information", "Material specifications"], category: "utilities", icon: "Wrench" } },
		{ name: "Driveway Permit", data: { permitId: "driveway", name: "Driveway Permit", description: "For new driveways and driveway modifications", fee: 2500, processingTime: "1 week", requirements: ["Property survey", "Driveway specifications", "Drainage plan"], category: "property", icon: "Car" } },
		{ name: "Tree Removal Permit", data: { permitId: "tree-removal", name: "Tree Removal Permit", description: "Required for removing trees over 6 inches in diameter", fee: 1500, processingTime: "3-5 business days", requirements: ["Tree location map", "Arborist report (for protected species)", "Replacement plan (if required)"], category: "property", icon: "TreePine" } },
		{ name: "Fence Permit", data: { permitId: "fence", name: "Fence Permit", description: "For installing or replacing fences over 4 feet high", fee: 3000, processingTime: "1 week", requirements: ["Property survey", "Fence specifications", "Neighbor notification form"], category: "property", icon: "Shield" } },
		{ name: "Demolition Permit", data: { permitId: "demolition", name: "Demolition Permit", description: "Required for demolishing structures or parts of structures", fee: 15000, processingTime: "2-3 weeks", requirements: ["Demolition plan", "Hazmat inspection report", "Utilities disconnection confirmation", "Waste disposal plan"], category: "construction", icon: "Hammer" } },
	],

	"town-announcement": [],

	"town-settings": [
		{
			name: "Town of Harmony Settings",
			data: {
				siteTitle: "Town of Harmony",
				siteDescription: "Official website of the Town of Harmony, North Carolina",
				contactPhone: "(704) 546-2339",
				contactAddress: "3389 Harmony Hwy, Harmony, NC 28634",
				contactEmail: "info@townofharmony.org",
				officeHoursWeekday: "Monday - Friday: 8:00 AM - 5:00 PM",
				officeHoursWeekend: "Saturday - Sunday: Closed",
				socialFacebook: "https://facebook.com/townofharmony",
				socialTwitter: "https://twitter.com/harmonytown",
				socialYoutube: "https://youtube.com/townofharmony",
				brandingTagline: "Where Harmony LIVES and SINGS!",
				brandingEstablished: "1927",
				brandingCounty: "Iredell County",
				brandingState: "North Carolina",
			},
		},
	],

	// --- Collection Models (Phase 3) ---
	"town-news": [
		{ name: "Spring Cleanup Day Scheduled for April", data: { title: "Spring Cleanup Day Scheduled for April", slug: "spring-cleanup-day-2025", excerpt: "Join your neighbors for our annual Spring Cleanup Day. Volunteers will gather to beautify our town's parks, roads, and public spaces.", content: "The Town of Harmony is excited to announce our annual Spring Cleanup Day! This year's event will take place on the third Saturday in April. Volunteers are encouraged to meet at Town Hall at 8:00 AM where supplies, refreshments, and assignments will be provided. Together, we can keep our community beautiful and show our pride in Harmony. Trash bags, gloves, and safety vests will be provided. Bring your family, friends, and neighbors — the more hands we have, the more we can accomplish. Last year, over 100 volunteers participated and collected more than 200 bags of litter from our roadways and public spaces.", featuredImage: mediaUrls["news-spring-cleanup"], status: "published", publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), categories: ["community", "events"], tags: ["cleanup", "volunteer", "spring"] } },
		{ name: "Town Council Approves New Park Improvements", data: { title: "Town Council Approves New Park Improvements", slug: "park-improvements-approved", excerpt: "The Board of Aldermen has approved funding for significant improvements to Harmony Park, including new playground equipment and walking trails.", content: "At the most recent Board of Aldermen meeting, the Town Council unanimously approved a plan to invest in major improvements to Harmony Park. The project will include new state-of-the-art playground equipment, an extended walking trail system, improved lighting, and additional picnic shelters. Construction is expected to begin this summer and be completed by fall. The improvements are funded through a combination of town funds and a state recreation grant. Mayor Sean Turner stated that these improvements reflect the town's commitment to providing quality recreational facilities for residents of all ages. Public input sessions were held earlier this year, and the final plan incorporates many suggestions from community members.", featuredImage: mediaUrls["news-park-improvements"], status: "published", publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), categories: ["government", "infrastructure"], tags: ["parks", "improvements", "council"] } },
		{ name: "Harmony Farmers Market Returns This Weekend", data: { title: "Harmony Farmers Market Returns This Weekend", slug: "farmers-market-returns", excerpt: "The beloved Harmony Farmers Market kicks off its new season this Saturday with local vendors, fresh produce, and live music.", content: "The Harmony Farmers Market is back for another season! Starting this Saturday, the market will operate every Saturday morning from 8:00 AM to 12:00 PM at the Town Hall parking lot. This year's market features over 20 local vendors offering fresh produce, baked goods, honey, handmade crafts, and more. Live music will be featured each week, and there will be special activities for children. The Farmers Market has been a Harmony tradition for over a decade, connecting residents with local growers and artisans while building community. New vendors are always welcome — contact the Parks & Recreation Department for vendor application information.", featuredImage: mediaUrls["news-farmers-market"], status: "published", publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), categories: ["community", "events", "business"], tags: ["farmers-market", "local", "shopping"] } },
	],

	"town-event": [
		{ name: "Harmony Farmers Market", data: { title: "Harmony Farmers Market", slug: "harmony-farmers-market", description: "Shop local at the Harmony Farmers Market featuring fresh produce, baked goods, crafts, and live music every Saturday morning.", content: "The Harmony Farmers Market returns every Saturday morning from 8:00 AM to 12:00 PM at the Town Hall parking lot. Browse fresh, locally grown produce, homemade baked goods, local honey, handmade crafts, and more from over 20 local vendors. Live music is featured each week, and there are special activities for children.", featuredImage: mediaUrls["event-farmers-market"], eventDate: getNextSaturday(), eventTime: "8:00 AM", endTime: "12:00 PM", location: "Town Hall Parking Lot", locationAddress: "3389 Harmony Hwy, Harmony, NC 28634", organizer: "Parks & Recreation Department", contactEmail: "recreation@townofharmony.org", contactPhone: "(704) 546-2342", status: "upcoming", isRecurring: true, categories: ["community", "recreation"], tags: ["farmers-market", "local", "weekly"] } },
		{ name: "Fall Festival", data: { title: "Fall Festival", slug: "fall-festival-2025", description: "Celebrate autumn at Harmony's annual Fall Festival with hayrides, pumpkin carving, live entertainment, and delicious food.", content: "The annual Harmony Fall Festival is one of the most anticipated events of the year! Join us for a day of fall fun including hayrides, pumpkin carving contests, live music, a craft fair, food vendors, and activities for the whole family.", featuredImage: mediaUrls["event-fall-festival"], eventDate: getNextDate(9, 18), eventTime: "10:00 AM", endTime: "6:00 PM", location: "Harmony Park", locationAddress: "100 Park Drive, Harmony, NC 28634", organizer: "Town of Harmony", contactEmail: "info@townofharmony.org", contactPhone: "(704) 546-2339", status: "upcoming", isRecurring: false, categories: ["community", "festival"], tags: ["fall", "festival", "family"] } },
		{ name: "Christmas Parade", data: { title: "Christmas Parade", slug: "christmas-parade-2025", description: "Ring in the holiday season at the annual Harmony Christmas Parade featuring floats, bands, and a visit from Santa Claus.", content: "The Harmony Christmas Parade is a beloved holiday tradition that brings the entire community together to celebrate the season. The parade route runs along Harmony Highway, featuring decorated floats, marching bands, local organizations, classic cars, and of course, Santa Claus!", featuredImage: mediaUrls["event-christmas-parade"], eventDate: getNextDate(11, 6), eventTime: "2:00 PM", endTime: "4:00 PM", location: "Harmony Highway", locationAddress: "Harmony Hwy, Harmony, NC 28634", organizer: "Town of Harmony", contactEmail: "info@townofharmony.org", contactPhone: "(704) 546-2339", status: "upcoming", isRecurring: false, categories: ["community", "holiday"], tags: ["christmas", "parade", "holiday"] } },
		{ name: "Spring Cleanup Day", data: { title: "Spring Cleanup Day", slug: "spring-cleanup-day-2025", description: "Volunteer to help beautify our community during the annual Spring Cleanup Day. Supplies and refreshments provided.", content: "Join your neighbors for the annual Spring Cleanup Day! Volunteers will meet at Town Hall at 8:00 AM where supplies, refreshments, and area assignments will be provided.", featuredImage: mediaUrls["event-spring-cleanup"], eventDate: getNextDate(3, 19), eventTime: "8:00 AM", endTime: "12:00 PM", location: "Town Hall", locationAddress: "3389 Harmony Hwy, Harmony, NC 28634", organizer: "Public Works Department", contactEmail: "publicworks@townofharmony.org", contactPhone: "(704) 546-2341", status: "upcoming", isRecurring: false, categories: ["community"], tags: ["cleanup", "volunteer", "spring"] } },
	],

	"town-meeting": [
		{ name: "Town Council Regular Meeting", data: { title: "Town Council Regular Meeting", slug: "town-council-regular-meeting-2025", type: "Council", meetingDate: getFutureDate(14), meetingTime: "7:00 PM", location: "Town Hall", agenda: "1. Call to Order\n2. Invocation and Pledge of Allegiance\n3. Approval of Minutes from Previous Meeting\n4. Public Comment Period\n5. Old Business\n   a. Park Improvement Project Update\n   b. Budget Amendment Discussion\n6. New Business\n   a. Zoning Request - 100 Main Street\n   b. Public Works Equipment Purchase\n7. Department Reports\n8. Financial Report\n9. Mayor's Report\n10. Adjournment", attendees: ["Mayor Sean Turner", "Alderman Brandon Angell", "Alderman Jared Clark", "Alderman Scotty Harris", "Alderman Chris Pierce", "Town Clerk Wanda Edwards", "Town Manager Michael Thompson"], isPublic: true } },
		{ name: "Planning Commission Meeting", data: { title: "Planning Commission Meeting", slug: "planning-commission-meeting-2025", type: "Planning", meetingDate: getFutureDate(21), meetingTime: "6:00 PM", location: "Town Hall", agenda: "1. Call to Order\n2. Approval of Previous Meeting Minutes\n3. Public Comment Period\n4. Old Business\n   a. Comprehensive Plan Review Update\n5. New Business\n   a. Site Plan Review - Commercial Development on Harmony Hwy\n   b. Conditional Use Permit Application - Home Business\n   c. Subdivision Preliminary Plat Review\n6. Staff Reports\n7. Commissioner Comments\n8. Adjournment", attendees: ["Planning Director Robert Anderson", "Planning Commission Members"], isPublic: true } },
		{ name: "Public Hearing: Proposed Zoning Changes", data: { title: "Public Hearing: Proposed Zoning Changes", slug: "public-hearing-zoning-changes-2025", type: "Public Hearing", meetingDate: getFutureDate(28), meetingTime: "7:00 PM", location: "Town Hall", agenda: "1. Call to Order\n2. Purpose and Procedures of Public Hearing\n3. Staff Presentation\n4. Public Comment Period\n5. Board Discussion\n6. Vote on Proposed Changes\n7. Adjournment", attendees: ["Mayor Sean Turner", "Board of Aldermen", "Planning Director Robert Anderson", "Town Clerk Wanda Edwards"], isPublic: true } },
	],

	"town-business": [
		{ name: "Harmony General Store", data: { name: "Harmony General Store", slug: "harmony-general-store", description: "A family-owned general store serving the Harmony community since 1952. We carry groceries, household essentials, local produce, and a little bit of everything you might need.", logo: mediaUrls["biz-general-store"], category: "retail", contactName: "Martha Jenkins", email: "info@harmonygeneralstore.com", phone: "(704) 546-2350", address: "3401 Harmony Hwy", city: "Harmony", stateCode: "NC", zipCode: "28634", hours: "Mon-Thu: 7:00 AM - 7:00 PM\nFri: 7:00 AM - 8:00 PM\nSat: 8:00 AM - 6:00 PM\nSun: Closed", isVerified: true, isFeatured: true } },
		{ name: "Southern Comfort Diner", data: { name: "Southern Comfort Diner", slug: "southern-comfort-diner", description: "Home-style Southern cooking at its finest. Our diner has been a gathering place for the Harmony community for over 30 years.", logo: mediaUrls["biz-diner"], category: "restaurant", contactName: "Bobby Ray Thompson", email: "eat@southerncomfortdiner.com", phone: "(704) 546-2355", address: "3425 Harmony Hwy", city: "Harmony", stateCode: "NC", zipCode: "28634", hours: "Mon-Thu: 6:00 AM - 8:00 PM\nFri: 6:00 AM - 9:00 PM\nSat: 7:00 AM - 9:00 PM\nSun: 8:00 AM - 3:00 PM", isVerified: true, isFeatured: true } },
		{ name: "Harmony Family Medicine", data: { name: "Harmony Family Medicine", slug: "harmony-family-medicine", description: "Providing comprehensive family healthcare to the Harmony community.", logo: mediaUrls["biz-medical"], category: "healthcare", contactName: "Dr. Susan Patterson", email: "appointments@harmonyfamilymedicine.com", phone: "(704) 546-2360", website: "https://www.harmonyfamilymedicine.com", address: "125 Medical Center Dr", city: "Harmony", stateCode: "NC", zipCode: "28634", hours: "Mon-Thu: 8:00 AM - 5:00 PM\nFri: 8:00 AM - 12:00 PM\nSat-Sun: Closed", isVerified: true, isFeatured: false } },
		{ name: "Harmony Hardware & Farm Supply", data: { name: "Harmony Hardware & Farm Supply", slug: "harmony-hardware-farm-supply", description: "Your local source for hardware, tools, farm supplies, animal feed, and gardening essentials.", logo: mediaUrls["biz-hardware"], category: "retail", contactName: "Tom Davis", email: "info@harmonyhardware.com", phone: "(704) 546-2365", address: "3450 Harmony Hwy", city: "Harmony", stateCode: "NC", zipCode: "28634", hours: "Mon-Fri: 7:30 AM - 6:00 PM\nSat: 8:00 AM - 4:00 PM\nSun: Closed", isVerified: true, isFeatured: false } },
		{ name: "Harmony Auto Repair", data: { name: "Harmony Auto Repair", slug: "harmony-auto-repair", description: "Honest, reliable auto repair and maintenance service. ASE-certified mechanics providing quality work at fair prices for over 20 years.", logo: mediaUrls["biz-auto"], category: "service", contactName: "Mike Reynolds", phone: "(704) 546-2370", address: "3480 Harmony Hwy", city: "Harmony", stateCode: "NC", zipCode: "28634", hours: "Mon-Fri: 8:00 AM - 5:30 PM\nSat: By appointment\nSun: Closed", isVerified: true, isFeatured: false } },
		{ name: "Harmony Community Church Thrift Store", data: { name: "Harmony Community Church Thrift Store", slug: "harmony-thrift-store", description: "A community thrift store operated by volunteers from Harmony Community Church. All proceeds support local charitable programs.", logo: mediaUrls["biz-thrift"], category: "nonprofit", contactName: "Linda Cartwright", phone: "(704) 546-2375", address: "200 Church St", city: "Harmony", stateCode: "NC", zipCode: "28634", hours: "Mon: Closed\nTue-Fri: 10:00 AM - 4:00 PM\nSat: 9:00 AM - 2:00 PM\nSun: Closed", isVerified: true, isFeatured: false } },
	],

	"town-election": [
		{ name: "2025 Municipal Election", data: { title: "2025 Municipal Election", slug: "2025-municipal-election", description: "The 2025 Town of Harmony Municipal Election for Mayor and Town Council seats. All registered voters within town limits are eligible to participate.", electionDate: getNextDate(10, 4), registrationDeadline: getNextDate(9, 10), earlyVotingStart: getNextDate(9, 18), earlyVotingEnd: getNextDate(10, 1), pollingLocations: [{ name: "Harmony Community Center", address: "3389 Harmony Hwy, Harmony, NC 28634", hours: "6:30 AM - 7:30 PM" }, { name: "Harmony Volunteer Fire Department", address: "3500 Harmony Hwy, Harmony, NC 28634", hours: "6:30 AM - 7:30 PM" }], isActive: true, candidates: [{ name: "Patricia Williams", position: "Mayor", party: "Nonpartisan", bio: "Lifelong Harmony resident and retired educator. Served 8 years on the Town Council and 4 years as Planning Board chair.", sortOrder: 1 }, { name: "Robert Chen", position: "Mayor", party: "Nonpartisan", bio: "Local business owner and community volunteer. Founded the Harmony Business Association.", sortOrder: 2 }, { name: "Angela Foster", position: "Town Council - Seat 1", party: "Nonpartisan", bio: "Community organizer and parent advocate. Active in the PTA and Harmony Youth Sports League.", sortOrder: 3 }, { name: "James Mitchell", position: "Town Council - Seat 1", party: "Nonpartisan", bio: "Third-generation Harmony farmer and current volunteer fire department member.", sortOrder: 4 }, { name: "Diana Perez", position: "Town Council - Seat 2", party: "Nonpartisan", bio: "Director of the Harmony Food Bank and nonprofit leader.", sortOrder: 5 }, { name: "William Turner", position: "Town Council - Seat 2", party: "Nonpartisan", bio: "Retired Army veteran and current code enforcement officer.", sortOrder: 6 }] } },
		{ name: "2024 General Election", data: { title: "2024 General Election", slug: "2024-general-election", description: "The 2024 General Election for local, state, and federal offices.", electionDate: "2024-11-05T00:00:00.000Z", registrationDeadline: "2024-10-11T00:00:00.000Z", earlyVotingStart: "2024-10-17T00:00:00.000Z", earlyVotingEnd: "2024-11-02T00:00:00.000Z", pollingLocations: [{ name: "Harmony Community Center", address: "3389 Harmony Hwy, Harmony, NC 28634", hours: "6:30 AM - 7:30 PM" }], resultsUrl: "https://www.co.iredell.nc.us/462/Election-Results", isActive: false, candidates: [] } },
	],
};

// ============================================================
// Model creation via Admin SDK
// ============================================================

async function createModel(definition: (typeof modelDefinitions)[0]) {
	try {
		const body: Record<string, unknown> = {
			name: definition.name,
			kind: definition.kind,
			fields: definition.fields.map((f) => ({
				"@type": "@builder.io/core:Field",
				name: f.name,
				type: f.type,
				required: f.required ?? false,
				...(f.defaultValue !== undefined ? { defaultValue: f.defaultValue } : {}),
				...(f.enum ? { enum: f.enum } : {}),
				...(f.subFields
					? {
							subFields: f.subFields.map((sf: Record<string, unknown>) => ({
								"@type": "@builder.io/core:Field",
								...sf,
							})),
						}
					: {}),
			})),
		};

		// graphql-typed-client format: [argsObject, fieldSelectionsObject]
		const result = await adminClient.mutation({
			addModel: [{ body }, { id: true, name: true }],
		});

		return result.data?.addModel;
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : String(err);
		if (message.includes("already exists") || message.includes("duplicate") || message.includes("A model with that name already exists")) {
			console.log(`  [SKIP] Model "${definition.name}" already exists`);
			return null;
		}
		throw err;
	}
}

// ============================================================
// Data seeding via Write API
// ============================================================

async function seedEntry(modelName: string, entry: SeedEntry) {
	const res = await fetch(
		`https://builder.io/api/v1/write/${modelName}?apiKey=${BUILDER_API_KEY}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${BUILDER_PRIVATE_KEY}`,
			},
			body: JSON.stringify({
				name: entry.name,
				data: entry.data,
				published: "published",
			}),
		},
	);

	if (!res.ok) {
		const text = await res.text();
		throw new Error(`Failed to seed "${entry.name}" to ${modelName}: ${res.status} ${text}`);
	}

	return res.json();
}

// ============================================================
// Main
// ============================================================

async function main() {
	const models = modelFilter
		? modelDefinitions.filter((m) => m.name === modelFilter)
		: modelDefinitions;

	if (modelFilter && models.length === 0) {
		console.error(`No model definition found for "${modelFilter}"`);
		process.exit(1);
	}

	// Phase 1: Create models
	if (!dataOnly) {
		console.log(`\nCreating ${models.length} Builder.io data models...\n`);
		let modelSuccess = 0;
		let modelFailed = 0;

		for (const model of models) {
			try {
				const result = await createModel(model);
				if (result) {
					console.log(`  [OK] Model "${model.name}" created`);
					modelSuccess++;
				}
			} catch (err) {
				console.error(
					`  [FAIL] Model "${model.name}": ${err instanceof Error ? err.message : err}`,
				);
				modelFailed++;
			}
		}

		console.log(`\nModels: ${modelSuccess} created, ${modelFailed} failed.\n`);

		if (modelsOnly) {
			process.exit(modelFailed > 0 ? 1 : 0);
		}

		// Brief pause to let models propagate
		console.log("Waiting 3s for models to propagate...\n");
		await new Promise((r) => setTimeout(r, 3000));
	}

	// Phase 2: Seed data
	console.log("Seeding data entries...\n");
	let dataSuccess = 0;
	let dataFailed = 0;

	for (const model of models) {
		const entries = seedData[model.name];
		if (!entries || entries.length === 0) {
			console.log(`  [SKIP] No data for "${model.name}"`);
			continue;
		}

		console.log(`  ${model.name} (${entries.length} entries):`);

		for (const entry of entries) {
			try {
				const result = await seedEntry(model.name, entry);
				console.log(`    [OK] ${entry.name} → ${result.id}`);
				dataSuccess++;
			} catch (err) {
				console.error(
					`    [FAIL] ${entry.name}: ${err instanceof Error ? err.message : err}`,
				);
				dataFailed++;
			}
		}
	}

	console.log(`\nData: ${dataSuccess} created, ${dataFailed} failed.`);
	if (dataFailed > 0) process.exit(1);
}

main().catch((err) => {
	console.error("Fatal error:", err);
	process.exit(1);
});
