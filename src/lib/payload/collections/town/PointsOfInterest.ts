import type { CollectionConfig } from "payload";

export const PointsOfInterest: CollectionConfig = {
	slug: "points-of-interest",
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "category", "address"],
		description: "Parks, historic sites, and other points of interest",
		preview: (doc) => {
			if (doc?.slug) {
				return `/points-of-interest#${doc.slug as string}`;
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
			name: "category",
			type: "select",
			required: true,
			options: [
				{ label: "Parks & Recreation", value: "Parks" },
				{ label: "Historic Sites", value: "Historic Sites" },
				{ label: "Education", value: "Education" },
				{ label: "Shopping", value: "Shopping" },
				{ label: "Government", value: "Government" },
				{ label: "Memorials", value: "Memorials" },
			],
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "description",
			type: "richText",
		},
		{
			name: "address",
			type: "text",
		},
		{
			name: "hours",
			type: "text",
			admin: {
				description: "Operating hours (e.g. 'Dawn to Dusk')",
			},
		},
		{
			name: "phone",
			type: "text",
		},
		{
			name: "website",
			type: "text",
		},
		{
			name: "image",
			type: "upload",
			relationTo: "media",
		},
		{
			name: "amenities",
			type: "json",
			admin: {
				description: 'Amenities as a JSON array of strings (e.g. ["Playground", "Trails"])',
			},
		},
		{
			type: "row",
			fields: [
				{
					name: "latitude",
					type: "number",
					admin: {
						width: "50%",
					},
				},
				{
					name: "longitude",
					type: "number",
					admin: {
						width: "50%",
					},
				},
			],
		},
	],
};
