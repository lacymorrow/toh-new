import type { Payload } from "payload";

export const seedNavigation = async (payload: Payload) => {
	try {
		console.info("🧭 Seeding navigation...");

		await payload.updateGlobal({
			slug: "navigation",
			data: {
				mainNav: [
					{
						name: "Home",
						href: "/",
					},
					{
						name: "Agenda & Minutes",
						href: "/meetings",
						children: [
							{ name: "Town Meetings", href: "/meetings" },
							{ name: "Meeting Archives", href: "/meetings/archives" },
						],
					},
					{
						name: "Explore",
						href: "/explore",
						children: [
							{ name: "Points of Interest", href: "/points-of-interest" },
							{ name: "Events", href: "/events" },
							{ name: "News", href: "/news" },
						],
					},
					{
						name: "Town",
						href: "/town",
						children: [
							{ name: "Our Team", href: "/our-team" },
							{ name: "History", href: "/history" },
							{ name: "Resources", href: "/resources" },
						],
					},
					{
						name: "Contact",
						href: "/contact",
					},
				],
				topBarLinks: [
					{
						name: "Events",
						href: "/events",
						icon: "Calendar",
					},
				],
				quickLinks: [
					{
						title: "Permits & Forms",
						description: "Apply for permits and download forms",
						href: "/services/permits",
						icon: "FileText",
						color: "bg-blue-500",
					},
						{
						title: "Events",
						description: "Community events and activities",
						href: "/events",
						icon: "Calendar",
						color: "bg-purple-500",
					},
					{
						title: "Report an Issue",
						description: "Report problems or concerns",
						href: "/services/report",
						icon: "AlertCircle",
						color: "bg-red-500",
					},
					{
						title: "Town Council",
						description: "Meeting schedules and agendas",
						href: "/government/council",
						icon: "Users",
						color: "bg-indigo-500",
					},
					{
						title: "Business Directory",
						description: "Find local businesses",
						href: "/business",
						icon: "Briefcase",
						color: "bg-orange-500",
					},
					{
						title: "Resident Resources",
						description: "Information for residents",
						href: "/residents",
						icon: "Home",
						color: "bg-teal-500",
					},
					{
						title: "Contact Us",
						description: "Get in touch with town offices",
						href: "/contact",
						icon: "Phone",
						color: "bg-pink-500",
					},
				],
				footerLinks: [
					{
						category: "Agenda & Minutes",
						links: [
							{ name: "Town Meetings", href: "/meetings" },
							{ name: "Meeting Archives", href: "/meetings/archives" },
							{ name: "Public Records", href: "/meetings/records" },
						],
					},
					{
						category: "Explore",
						links: [
							{ name: "Points of Interest", href: "/points-of-interest" },
							{ name: "Events", href: "/events" },
							{ name: "News", href: "/news" },
							{ name: "Photo Gallery", href: "/gallery" },
						],
					},
					{
						category: "Town",
						links: [
							{ name: "Our Team", href: "/our-team" },
							{ name: "History", href: "/history" },
							{ name: "Resources", href: "/resources" },
							{ name: "Contact Us", href: "/contact" },
							{ name: "Emergency Services", href: "/emergency" },
						],
					},
				],
			},
		});

		console.info("✅ Navigation updated");
	} catch (error) {
		console.error("Error seeding navigation:", error);
		throw error;
	}
};
