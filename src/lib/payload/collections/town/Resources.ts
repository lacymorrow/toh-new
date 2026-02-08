import type { CollectionConfig } from "payload";

export const Resources: CollectionConfig = {
	slug: "resources",
	admin: {
		useAsTitle: "title",
		defaultColumns: ["title", "type", "category", "sortOrder"],
		description: "Documents, forms, links, and services for residents",
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
				{ label: "Document", value: "document" },
				{ label: "Form", value: "form" },
				{ label: "Link", value: "link" },
				{ label: "Service", value: "service" },
			],
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "category",
			type: "select",
			required: true,
			options: [
				{ label: "Building & Permits", value: "Building" },
				{ label: "Business", value: "Business" },
				{ label: "Utilities", value: "Utilities" },
				{ label: "Parks & Recreation", value: "Parks" },
				{ label: "General", value: "General" },
				{ label: "Community Services", value: "Community" },
				{ label: "External Links", value: "External" },
				{ label: "Resident Resources", value: "Resident" },
			],
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "description",
			type: "textarea",
		},
		{
			name: "file",
			type: "upload",
			relationTo: "media",
			admin: {
				description: "Upload a document file (PDF, DOC, etc.)",
				condition: (data) => data?.type === "document" || data?.type === "form",
			},
		},
		{
			name: "externalUrl",
			type: "text",
			admin: {
				description: "External URL for links and services",
				condition: (data) => data?.type === "link" || data?.type === "service",
			},
		},
		{
			name: "icon",
			type: "text",
			admin: {
				description: "Lucide icon name (e.g. 'FileText', 'ExternalLink')",
				position: "sidebar",
			},
		},
		{
			name: "contactPhone",
			type: "text",
			admin: {
				description: "Contact phone for services",
				condition: (data) => data?.type === "service",
			},
		},
		{
			name: "contactEmail",
			type: "email",
			admin: {
				condition: (data) => data?.type === "service",
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
