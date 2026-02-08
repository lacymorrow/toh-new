import type { GlobalConfig } from "payload";

export const Homepage: GlobalConfig = {
	slug: "homepage",
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "heroSlides",
			type: "array",
			admin: {
				description: "Hero carousel slides on the homepage",
			},
			fields: [
				{
					name: "title",
					type: "text",
					required: true,
				},
				{
					name: "subtitle",
					type: "text",
				},
				{
					name: "description",
					type: "textarea",
				},
				{
					name: "image",
					type: "upload",
					relationTo: "media",
				},
				{
					name: "ctaText",
					type: "text",
					admin: {
						description: "Call-to-action button text",
					},
				},
				{
					name: "ctaHref",
					type: "text",
					admin: {
						description: "Call-to-action button link",
					},
				},
			],
		},
		{
			name: "spotlightCards",
			type: "array",
			admin: {
				description: "Community spotlight featured cards",
			},
			fields: [
				{
					name: "title",
					type: "text",
					required: true,
				},
				{
					name: "subtitle",
					type: "text",
				},
				{
					name: "description",
					type: "textarea",
				},
				{
					name: "gradient",
					type: "text",
					admin: {
						description: "Tailwind gradient class (e.g. 'from-blue-500 to-blue-600')",
					},
				},
				{
					name: "ctaText",
					type: "text",
				},
				{
					name: "ctaHref",
					type: "text",
				},
			],
		},
		{
			name: "stats",
			type: "array",
			admin: {
				description: "Homepage statistics (e.g. Population, Established year)",
			},
			fields: [
				{
					name: "value",
					type: "text",
					required: true,
					admin: {
						description: "Display value (e.g. '5,234', '1927', '150+')",
					},
				},
				{
					name: "label",
					type: "text",
					required: true,
					admin: {
						description: "Label text (e.g. 'Population', 'Established')",
					},
				},
			],
		},
	],
};
