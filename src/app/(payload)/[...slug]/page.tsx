/**
 * Catch-all page for Builder.io visual CMS pages.
 * Serves Builder.io content at any URL path (e.g., /about, /services).
 */

import { env } from "@/env";
import { RenderBuilderContent } from "@/lib/builder-io/builder-io";
import "@/styles/builder-io.css";
import { type BuilderContent, builder } from "@builder.io/sdk";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

if (env.NEXT_PUBLIC_FEATURE_BUILDER_ENABLED && env.NEXT_PUBLIC_BUILDER_API_KEY) {
	builder.init(env.NEXT_PUBLIC_BUILDER_API_KEY);
}

interface PageProps {
	params: Promise<{
		slug: string[];
	}>;
	searchParams: Promise<{
		preview?: string;
	}>;
}

const shouldSkip = (slugString: string) => {
	return (
		slugString.startsWith("api/") ||
		slugString.includes(".") ||
		slugString.includes(".well-known") ||
		slugString.includes("manifest.json") ||
		slugString.includes("sitemap.xml") ||
		slugString.includes("robots.txt") ||
		slugString.includes("favicon.ico") ||
		slugString.startsWith("_next/") ||
		slugString.startsWith("static/")
	);
};

async function getBuilderContent(slug: string[]): Promise<BuilderContent | null> {
	if (!env.NEXT_PUBLIC_FEATURE_BUILDER_ENABLED) {
		return null;
	}

	const slugString = slug.join("/");
	if (shouldSkip(slugString)) {
		return null;
	}

	try {
		const content = await builder
			.get("page", {
				userAttributes: {
					urlPath: `/${slugString}`,
				},
				prerender: false,
			})
			.toPromise();

		return content ?? null;
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
		title: content.data?.title ?? "Page",
		description: content.data?.description ?? "",
	};
}

export default async function Page({ params: paramsPromise }: PageProps) {
	const params = await paramsPromise;
	const content = await getBuilderContent(params.slug);

	if (!content) {
		return notFound();
	}

	return <RenderBuilderContent content={content} model="page" />;
}
