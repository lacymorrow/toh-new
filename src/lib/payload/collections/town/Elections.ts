import type { CollectionConfig } from "payload";

export const Elections: CollectionConfig = {
	slug: "elections",
	admin: {
		useAsTitle: "title",
		defaultColumns: ["title", "electionDate", "isActive"],
		description: "Election information, candidates, and voting resources",
		preview: (doc) => {
			if (doc?.slug) {
				return `/elections/${doc.slug as string}`;
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
			name: "description",
			type: "richText",
		},
		{
			name: "electionDate",
			type: "date",
			required: true,
			admin: {
				date: {
					pickerAppearance: "dayOnly",
				},
			},
		},
		{
			name: "registrationDeadline",
			type: "date",
			admin: {
				date: {
					pickerAppearance: "dayOnly",
				},
			},
		},
		{
			type: "row",
			fields: [
				{
					name: "earlyVotingStart",
					type: "date",
					admin: {
						width: "50%",
						date: {
							pickerAppearance: "dayOnly",
						},
					},
				},
				{
					name: "earlyVotingEnd",
					type: "date",
					admin: {
						width: "50%",
						date: {
							pickerAppearance: "dayOnly",
						},
					},
				},
			],
		},
		{
			name: "pollingLocations",
			type: "array",
			fields: [
				{
					name: "name",
					type: "text",
					required: true,
				},
				{
					name: "address",
					type: "text",
					required: true,
				},
				{
					name: "hours",
					type: "text",
				},
			],
		},
		{
			name: "sampleBallot",
			type: "upload",
			relationTo: "media",
			admin: {
				description: "Upload sample ballot PDF",
			},
		},
		{
			name: "resultsUrl",
			type: "text",
			admin: {
				description: "Link to election results",
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
		{
			name: "candidates",
			type: "array",
			admin: {
				description: "Candidates running in this election",
			},
			fields: [
				{
					name: "name",
					type: "text",
					required: true,
				},
				{
					name: "position",
					type: "text",
					required: true,
					admin: {
						description: "Position they are running for",
					},
				},
				{
					name: "party",
					type: "text",
				},
				{
					name: "photo",
					type: "upload",
					relationTo: "media",
				},
				{
					name: "bio",
					type: "textarea",
				},
				{
					name: "website",
					type: "text",
				},
				{
					name: "sortOrder",
					type: "number",
					defaultValue: 0,
				},
			],
		},
	],
};
