/**
 * Catch-all page for Builder.io visual CMS pages within the town layout.
 * Inherits TownHeader + EmergencyBanner + TownFooter from (town)/layout.tsx.
 */

import { env } from "@/env";
import { RenderBuilderContent } from "@/lib/builder-io/builder-io";
import "@/styles/builder-io.css";
import { type BuilderContent } from "@builder.io/sdk";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
	params: Promise<{
		slug: string[];
	}>;
}

const shouldSkip = (slugString: string) => {
	return (
		slugString.startsWith("api/") ||
		slugString.includes(".") ||
		slugString.startsWith("_next/") ||
		slugString.startsWith("static/")
	);
};

async function getBuilderContent(
	slug: string[],
): Promise<BuilderContent | null> {
	if (!env.NEXT_PUBLIC_FEATURE_BUILDER_ENABLED || !env.NEXT_PUBLIC_BUILDER_API_KEY) {
		return null;
	}

	const slugString = slug.join("/");
	if (shouldSkip(slugString)) {
		return null;
	}

	const urlPath = `/${slugString}`;

	try {
		const url = new URL("https://cdn.builder.io/api/v3/content/page");
		url.searchParams.set("apiKey", env.NEXT_PUBLIC_BUILDER_API_KEY);
		url.searchParams.set("userAttributes.urlPath", urlPath);
		url.searchParams.set("limit", "1");
		url.searchParams.set("noCache", "true");

		const res = await fetch(url.toString(), {
			next: { revalidate: 0 },
		});

		if (!res.ok) {
			return null;
		}

		const data = await res.json();
		const results = data?.results;
		if (!results || results.length === 0) {
			return null;
		}

		return results[0] as BuilderContent;
	} catch {
		return null;
	}
}

export async function generateMetadata({
	params: paramsPromise,
}: PageProps): Promise<Metadata> {
	const params = await paramsPromise;
	const content = await getBuilderContent(params.slug);

	if (!content) {
		return notFound();
	}

	return {
		title: content.data?.title ?? "Town of Harmony",
		description: content.data?.description ?? "",
		openGraph: {
			title: content.data?.title ?? "Town of Harmony",
			description: content.data?.description ?? "",
			...(content.data?.ogImage && {
				images: [{ url: content.data.ogImage as string }],
			}),
			...(content.data?.ogType && {
				type: content.data.ogType as
					| "website"
					| "article"
					| "profile",
			}),
		},
	};
}

export default async function TownCatchAllPage({
	params: paramsPromise,
}: PageProps) {
	const params = await paramsPromise;
	const content = await getBuilderContent(params.slug);

	if (!content) {
		return notFound();
	}

	return <RenderBuilderContent content={content} model="page" />;
}
