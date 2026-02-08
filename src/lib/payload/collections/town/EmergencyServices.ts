import type { CollectionConfig } from "payload";

export const EmergencyServices: CollectionConfig = {
	slug: "emergency-services",
	admin: {
		useAsTitle: "title",
		defaultColumns: ["title", "category", "phone", "sortOrder"],
		description: "Emergency contacts, services, and preparedness information",
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
			name: "description",
			type: "textarea",
			required: true,
		},
		{
			name: "phone",
			type: "text",
			required: true,
			admin: {
				description: "Primary phone number for this service",
			},
		},
		{
			name: "category",
			type: "select",
			required: true,
			options: [
				{ label: "Immediate Emergency", value: "immediate" },
				{ label: "Utility Emergency", value: "utility" },
				{ label: "Public Safety", value: "public-safety" },
				{ label: "Health & Medical", value: "health" },
			],
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "icon",
			type: "text",
			admin: {
				description: "Lucide icon name (e.g. 'Phone', 'Shield', 'Flame')",
				position: "sidebar",
			},
		},
		{
			name: "preparedness",
			type: "json",
			admin: {
				description: 'Preparedness tips as a JSON array of strings',
			},
		},
		{
			name: "sortOrder",
			type: "number",
			defaultValue: 0,
			admin: {
				position: "sidebar",
				description: "Lower numbers appear first",
			},
		},
	],
};
