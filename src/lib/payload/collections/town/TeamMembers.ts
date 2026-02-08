import type { CollectionConfig } from "payload";

export const TeamMembers: CollectionConfig = {
	slug: "team-members",
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "title", "category", "isActive"],
		description: "Town officials, board members, and department heads",
	},
	access: {
		read: () => true,
	},
	timestamps: true,
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
		},
		{
			name: "title",
			type: "text",
			required: true,
			admin: {
				description: "Job title or position (e.g. 'Mayor', 'Town Clerk')",
			},
		},
		{
			name: "category",
			type: "select",
			required: true,
			options: [
				{ label: "Executive", value: "Executive" },
				{ label: "Board of Aldermen", value: "Board of Aldermen" },
				{ label: "Department Heads", value: "Department Heads" },
				{ label: "Advisory Committees", value: "Advisory Committees" },
			],
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "email",
			type: "email",
		},
		{
			name: "phone",
			type: "text",
		},
		{
			name: "bio",
			type: "textarea",
			admin: {
				description: "Short biography",
			},
		},
		{
			name: "photo",
			type: "upload",
			relationTo: "media",
		},
		{
			name: "department",
			type: "text",
			admin: {
				description: "Department name if applicable",
			},
		},
		{
			name: "termExpires",
			type: "text",
			admin: {
				description: "e.g. 'December 2027'",
				position: "sidebar",
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
			name: "isActive",
			type: "checkbox",
			defaultValue: true,
			admin: {
				position: "sidebar",
			},
		},
	],
};
