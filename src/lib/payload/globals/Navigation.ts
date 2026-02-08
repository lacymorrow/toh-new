import type { GlobalConfig } from "payload";

export const Navigation: GlobalConfig = {
	slug: "navigation",
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "mainNav",
			type: "array",
			admin: {
				description: "Primary navigation menu items",
			},
			fields: [
				{
					name: "name",
					type: "text",
					required: true,
				},
				{
					name: "href",
					type: "text",
					required: true,
				},
				{
					name: "children",
					type: "array",
					fields: [
						{
							name: "name",
							type: "text",
							required: true,
						},
						{
							name: "href",
							type: "text",
							required: true,
						},
					],
				},
			],
		},
		{
			name: "topBarLinks",
			type: "array",
			admin: {
				description: "Links shown in the top bar (above main navigation)",
			},
			fields: [
				{
					name: "name",
					type: "text",
					required: true,
				},
				{
					name: "href",
					type: "text",
					required: true,
				},
				{
					name: "icon",
					type: "text",
					admin: {
						description: "Lucide icon name (e.g. 'Calendar', 'Phone')",
					},
				},
			],
		},
		{
			name: "quickLinks",
			type: "array",
			admin: {
				description: "Quick links grid on the homepage",
			},
			fields: [
				{
					name: "title",
					type: "text",
					required: true,
				},
				{
					name: "description",
					type: "text",
				},
				{
					name: "href",
					type: "text",
					required: true,
				},
				{
					name: "icon",
					type: "text",
					admin: {
						description: "Lucide icon name",
					},
				},
				{
					name: "color",
					type: "text",
					admin: {
						description: "Tailwind background color class (e.g. 'bg-blue-500')",
					},
				},
			],
		},
		{
			name: "footerLinks",
			type: "array",
			admin: {
				description: "Footer link categories",
			},
			fields: [
				{
					name: "category",
					type: "text",
					required: true,
				},
				{
					name: "links",
					type: "array",
					fields: [
						{
							name: "name",
							type: "text",
							required: true,
						},
						{
							name: "href",
							type: "text",
							required: true,
						},
					],
				},
			],
		},
	],
};
