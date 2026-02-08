import type { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
	slug: "events",
	admin: {
		useAsTitle: "title",
		defaultColumns: ["title", "eventDate", "status", "location"],
		description: "Community events and calendar items",
		preview: (doc) => {
			if (doc?.slug) {
				return `/events/${doc.slug as string}`;
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
				description: "URL-friendly identifier",
			},
		},
		{
			name: "description",
			type: "textarea",
			admin: {
				description: "Short description for event listings",
			},
		},
		{
			name: "content",
			type: "richText",
			admin: {
				description: "Detailed event information",
			},
		},
		{
			name: "featuredImage",
			type: "upload",
			relationTo: "media",
		},
		{
			type: "row",
			fields: [
				{
					name: "eventDate",
					type: "date",
					required: true,
					admin: {
						width: "50%",
						date: {
							pickerAppearance: "dayOnly",
						},
					},
				},
				{
					name: "eventTime",
					type: "text",
					admin: {
						width: "50%",
						description: "e.g. '6:00 PM'",
					},
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "endDate",
					type: "date",
					admin: {
						width: "50%",
						date: {
							pickerAppearance: "dayOnly",
						},
					},
				},
				{
					name: "endTime",
					type: "text",
					admin: {
						width: "50%",
						description: "e.g. '9:00 PM'",
					},
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "location",
					type: "text",
					admin: {
						width: "50%",
					},
				},
				{
					name: "locationAddress",
					type: "textarea",
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
					name: "organizer",
					type: "text",
					admin: {
						width: "50%",
					},
				},
				{
					name: "contactEmail",
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
					name: "contactPhone",
					type: "text",
					admin: {
						width: "50%",
					},
				},
				{
					name: "registrationUrl",
					type: "text",
					admin: {
						width: "50%",
						description: "External registration link",
					},
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "maxAttendees",
					type: "number",
					admin: {
						width: "50%",
					},
				},
				{
					name: "currentAttendees",
					type: "number",
					defaultValue: 0,
					admin: {
						width: "50%",
					},
				},
			],
		},
		{
			name: "status",
			type: "select",
			defaultValue: "upcoming",
			options: [
				{ label: "Upcoming", value: "upcoming" },
				{ label: "Ongoing", value: "ongoing" },
				{ label: "Completed", value: "completed" },
				{ label: "Cancelled", value: "cancelled" },
			],
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "isRecurring",
			type: "checkbox",
			defaultValue: false,
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "categories",
			type: "select",
			hasMany: true,
			options: [
				{ label: "Community", value: "community" },
				{ label: "Government", value: "government" },
				{ label: "Recreation", value: "recreation" },
				{ label: "Education", value: "education" },
				{ label: "Holiday", value: "holiday" },
				{ label: "Festival", value: "festival" },
				{ label: "Meeting", value: "meeting" },
			],
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "tags",
			type: "json",
			admin: {
				description: 'Tags as a JSON array of strings',
			},
		},
	],
};
