import type { CollectionConfig } from "payload";

export const Meetings: CollectionConfig = {
	slug: "meetings",
	admin: {
		useAsTitle: "title",
		defaultColumns: ["title", "type", "meetingDate", "isPublic"],
		description: "Town council and committee meetings with agendas and minutes",
		preview: (doc) => {
			if (doc?.slug) {
				return `/meetings/${doc.slug as string}`;
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
		},
		{
			name: "type",
			type: "select",
			required: true,
			options: [
				{ label: "Town Council", value: "Council" },
				{ label: "Planning Commission", value: "Planning" },
				{ label: "Zoning Board", value: "Zoning" },
				{ label: "Public Hearing", value: "Public Hearing" },
				{ label: "Special Meeting", value: "Special" },
			],
			admin: {
				position: "sidebar",
			},
		},
		{
			type: "row",
			fields: [
				{
					name: "meetingDate",
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
					name: "meetingTime",
					type: "text",
					admin: {
						width: "50%",
						description: "e.g. '7:00 PM'",
					},
				},
			],
		},
		{
			name: "location",
			type: "text",
			defaultValue: "Town Hall",
		},
		{
			type: "tabs",
			tabs: [
				{
					label: "Agenda",
					fields: [
						{
							name: "agenda",
							type: "richText",
							admin: {
								description: "Meeting agenda content",
							},
						},
						{
							name: "agendaDocument",
							type: "upload",
							relationTo: "media",
							admin: {
								description: "Upload agenda PDF",
							},
						},
					],
				},
				{
					label: "Minutes",
					fields: [
						{
							name: "minutes",
							type: "richText",
							admin: {
								description: "Meeting minutes content",
							},
						},
						{
							name: "minutesDocument",
							type: "upload",
							relationTo: "media",
							admin: {
								description: "Upload minutes PDF",
							},
						},
					],
				},
				{
					label: "Media",
					fields: [
						{
							name: "videoUrl",
							type: "text",
							admin: {
								description: "YouTube or other video link",
							},
						},
						{
							name: "audioUrl",
							type: "text",
							admin: {
								description: "Audio recording link",
							},
						},
						{
							name: "documents",
							type: "array",
							admin: {
								description: "Additional meeting documents",
							},
							fields: [
								{
									name: "document",
									type: "upload",
									relationTo: "media",
									required: true,
								},
								{
									name: "label",
									type: "text",
								},
							],
						},
					],
				},
			],
		},
		{
			name: "attendees",
			type: "json",
			admin: {
				description: 'List of attendees as a JSON array of strings',
			},
		},
		{
			name: "isPublic",
			type: "checkbox",
			defaultValue: true,
			admin: {
				position: "sidebar",
				description: "Whether this meeting is open to the public",
			},
		},
	],
};
