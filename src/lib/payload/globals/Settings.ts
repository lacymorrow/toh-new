import type { GlobalConfig } from "payload";

export interface SettingsGlobal {
	seedCompleted: boolean;
	seedCompletedAt: string;
	siteTitle: string;
	siteDescription?: string;
}

/*
 * Settings Global
 * This global is used to store application-wide settings
 * Including seeding status to prevent reseeding on every initialization
 */
export const Settings: GlobalConfig = {
	slug: "settings",
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "seedCompleted",
			type: "checkbox",
			defaultValue: false,
			admin: {
				description: "Indicates whether initial data seeding has been completed",
				position: "sidebar",
			},
		},
		{
			name: "seedCompletedAt",
			type: "date",
			admin: {
				description: "When the initial data seeding was completed",
				position: "sidebar",
			},
		},
		{
			name: "siteTitle",
			type: "text",
			defaultValue: "Town of Harmony",
			admin: {
				description: "The title of the site used in various places",
			},
		},
		{
			name: "siteDescription",
			type: "textarea",
			admin: {
				description: "A brief description of the site used for SEO",
			},
		},
		{
			name: "contactInfo",
			type: "group",
			admin: {
				description: "Town contact information displayed in header and footer",
			},
			fields: [
				{
					name: "phone",
					type: "text",
					defaultValue: "(704) 546-2339",
				},
				{
					name: "address",
					type: "text",
					defaultValue: "3389 Harmony Hwy, Harmony, NC 28634",
				},
				{
					name: "email",
					type: "email",
					defaultValue: "info@townofharmony.org",
				},
				{
					name: "fax",
					type: "text",
				},
			],
		},
		{
			name: "officeHours",
			type: "group",
			admin: {
				description: "Town hall office hours",
			},
			fields: [
				{
					name: "weekday",
					type: "text",
					defaultValue: "Monday - Friday: 8:00 AM - 5:00 PM",
				},
				{
					name: "weekend",
					type: "text",
					defaultValue: "Saturday - Sunday: Closed",
				},
			],
		},
		{
			name: "socialMedia",
			type: "group",
			fields: [
				{
					name: "facebook",
					type: "text",
					defaultValue: "https://facebook.com/townofharmony",
				},
				{
					name: "twitter",
					type: "text",
					defaultValue: "https://twitter.com/harmonytown",
				},
				{
					name: "instagram",
					type: "text",
				},
				{
					name: "youtube",
					type: "text",
					defaultValue: "https://youtube.com/townofharmony",
				},
			],
		},
		{
			name: "branding",
			type: "group",
			fields: [
				{
					name: "tagline",
					type: "text",
					defaultValue: "Where Harmony LIVES and SINGS!",
				},
				{
					name: "established",
					type: "text",
					defaultValue: "1927",
				},
				{
					name: "county",
					type: "text",
					defaultValue: "Iredell County",
				},
				{
					name: "state",
					type: "text",
					defaultValue: "North Carolina",
				},
			],
		},
	],
};
