import type { CollectionConfig } from "payload";

export const HistoryArticles: CollectionConfig = {
	slug: "history-articles",
	admin: {
		useAsTitle: "title",
		defaultColumns: ["title", "type", "era", "sortOrder"],
		description: "Historical periods and landmarks for the town history page",
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
			name: "slug",
			type: "text",
			required: true,
			unique: true,
		},
		{
			name: "type",
			type: "select",
			required: true,
			options: [
				{ label: "Historical Period", value: "period" },
				{ label: "Landmark", value: "landmark" },
			],
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "era",
			type: "text",
			admin: {
				description: "Time period label (e.g. '1927-1960')",
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
		{
			name: "description",
			type: "textarea",
			admin: {
				description: "Short description for listings",
			},
		},
		{
			name: "content",
			type: "richText",
			admin: {
				description: "Full article content",
			},
		},
		{
			name: "highlights",
			type: "json",
			admin: {
				description: 'Key highlights as a JSON array of strings',
			},
		},
		{
			name: "image",
			type: "upload",
			relationTo: "media",
		},
		{
			name: "year",
			type: "text",
			admin: {
				description: "Year built/established (for landmarks)",
				condition: (data) => data?.type === "landmark",
			},
		},
		{
			name: "address",
			type: "text",
			admin: {
				description: "Physical address (for landmarks)",
				condition: (data) => data?.type === "landmark",
			},
		},
	],
};
