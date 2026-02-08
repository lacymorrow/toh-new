import type { CollectionConfig } from "payload";

export const Announcements: CollectionConfig = {
	slug: "announcements",
	admin: {
		useAsTitle: "title",
		defaultColumns: ["title", "level", "isActive", "startsAt", "endsAt"],
		description: "Emergency alerts, warnings, and town-wide announcements",
	},
	access: {
		read: () => true,
	},
	timestamps: true,
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
		},
		{
			name: "message",
			type: "richText",
			required: true,
		},
		{
			name: "level",
			type: "select",
			required: true,
			defaultValue: "info",
			options: [
				{ label: "Info", value: "info" },
				{ label: "Warning", value: "warning" },
				{ label: "Critical", value: "critical" },
			],
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "isActive",
			type: "checkbox",
			defaultValue: true,
			admin: {
				position: "sidebar",
				description: "Whether this announcement is currently visible",
			},
		},
		{
			type: "row",
			fields: [
				{
					name: "startsAt",
					type: "date",
					admin: {
						width: "50%",
						date: {
							pickerAppearance: "dayAndTime",
						},
						description: "When this announcement becomes visible",
					},
				},
				{
					name: "endsAt",
					type: "date",
					admin: {
						width: "50%",
						date: {
							pickerAppearance: "dayAndTime",
						},
						description: "When this announcement expires",
					},
				},
			],
		},
		{
			name: "affectedAreas",
			type: "json",
			admin: {
				description: 'Affected areas as a JSON array of strings',
			},
		},
		{
			name: "instructions",
			type: "richText",
			admin: {
				description: "Safety instructions or actions to take",
			},
		},
		{
			name: "contactInfo",
			type: "group",
			fields: [
				{
					name: "name",
					type: "text",
				},
				{
					name: "phone",
					type: "text",
				},
				{
					name: "email",
					type: "email",
				},
			],
		},
		{
			name: "externalUrl",
			type: "text",
			admin: {
				description: "Link to more information",
			},
		},
	],
};
