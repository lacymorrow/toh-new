import type { CollectionConfig } from "payload";

export const News: CollectionConfig = {
	slug: "news",
	admin: {
		useAsTitle: "title",
		defaultColumns: ["title", "status", "publishedAt"],
		description: "Town news articles and announcements",
		preview: (doc) => {
			if (doc?.slug) {
				return `/news/${doc.slug as string}`;
			}
			return null;
		},
	},
	access: {
		read: () => true,
	},
	versions: {
		drafts: true,
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
			admin: {
				description: "URL-friendly identifier (e.g. 'spring-cleanup-2025')",
			},
		},
		{
			name: "excerpt",
			type: "textarea",
			admin: {
				description: "Short summary displayed in news listings",
			},
		},
		{
			name: "content",
			type: "richText",
			required: true,
		},
		{
			name: "featuredImage",
			type: "upload",
			relationTo: "media",
		},
		{
			name: "author",
			type: "relationship",
			relationTo: "users",
		},
		{
			name: "status",
			type: "select",
			defaultValue: "draft",
			options: [
				{ label: "Draft", value: "draft" },
				{ label: "Published", value: "published" },
				{ label: "Archived", value: "archived" },
			],
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "publishedAt",
			type: "date",
			admin: {
				position: "sidebar",
				date: {
					pickerAppearance: "dayAndTime",
				},
				description: "When this article was or will be published",
			},
		},
		{
			name: "categories",
			type: "select",
			hasMany: true,
			options: [
				{ label: "Town News", value: "town-news" },
				{ label: "Community", value: "community" },
				{ label: "Government", value: "government" },
				{ label: "Public Safety", value: "public-safety" },
				{ label: "Infrastructure", value: "infrastructure" },
				{ label: "Events", value: "events" },
				{ label: "Business", value: "business" },
			],
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "tags",
			type: "json",
			admin: {
				description: 'Tags as a JSON array of strings, e.g. ["parks", "summer"]',
			},
		},
		{
			name: "viewCount",
			type: "number",
			defaultValue: 0,
			admin: {
				position: "sidebar",
				readOnly: true,
				description: "Number of times this article has been viewed",
			},
		},
	],
};
