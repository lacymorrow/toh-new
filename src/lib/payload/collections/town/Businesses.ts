import type { CollectionConfig } from "payload";

export const Businesses: CollectionConfig = {
	slug: "businesses",
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "category", "isVerified", "isFeatured"],
		description: "Local business directory",
		preview: (doc) => {
			if (doc?.slug) {
				return `/business/${doc.slug as string}`;
			}
			return null;
		},
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
			name: "slug",
			type: "text",
			required: true,
			unique: true,
		},
		{
			name: "description",
			type: "richText",
		},
		{
			name: "category",
			type: "select",
			required: true,
			options: [
				{ label: "Restaurant", value: "restaurant" },
				{ label: "Retail", value: "retail" },
				{ label: "Service", value: "service" },
				{ label: "Healthcare", value: "healthcare" },
				{ label: "Education", value: "education" },
				{ label: "Government", value: "government" },
				{ label: "Nonprofit", value: "nonprofit" },
				{ label: "Other", value: "other" },
			],
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "logo",
			type: "upload",
			relationTo: "media",
		},
		{
			name: "images",
			type: "array",
			fields: [
				{
					name: "image",
					type: "upload",
					relationTo: "media",
					required: true,
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "contactName",
					type: "text",
					admin: {
						width: "50%",
					},
				},
				{
					name: "email",
					type: "email",
					admin: {
						width: "50%",
					},
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "phone",
					type: "text",
					admin: {
						width: "50%",
					},
				},
				{
					name: "website",
					type: "text",
					admin: {
						width: "50%",
					},
				},
			],
		},
		{
			name: "address",
			type: "text",
		},
		{
			type: "row",
			fields: [
				{
					name: "city",
					type: "text",
					defaultValue: "Harmony",
					admin: {
						width: "33%",
					},
				},
				{
					name: "state",
					type: "text",
					defaultValue: "NC",
					admin: {
						width: "33%",
					},
				},
				{
					name: "zipCode",
					type: "text",
					admin: {
						width: "33%",
					},
				},
			],
		},
		{
			name: "hours",
			type: "json",
			admin: {
				description: "Operating hours as JSON",
			},
		},
		{
			name: "socialMedia",
			type: "group",
			fields: [
				{
					name: "facebook",
					type: "text",
				},
				{
					name: "twitter",
					type: "text",
				},
				{
					name: "instagram",
					type: "text",
				},
			],
		},
		{
			name: "isVerified",
			type: "checkbox",
			defaultValue: false,
			admin: {
				position: "sidebar",
				description: "Verified by town administration",
			},
		},
		{
			name: "isFeatured",
			type: "checkbox",
			defaultValue: false,
			admin: {
				position: "sidebar",
				description: "Show in featured listings",
			},
		},
	],
};
