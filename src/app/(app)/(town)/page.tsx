import { Suspense } from "react";
import { CommunitySpotlight } from "@/components/town/community-spotlight";
import { HeroSection } from "@/components/town/hero-section";
import { LatestNews } from "@/components/town/latest-news";
import { NewsletterSignup } from "@/components/town/newsletter-signup";
import { QuickLinks } from "@/components/town/quick-links";
import { UpcomingEvents } from "@/components/town/upcoming-events";
import { env } from "@/env";
import { RenderBuilderContent } from "@/lib/builder-io/builder-io";
import type { BuilderContent } from "@builder.io/sdk";

async function getBuilderHomepage(): Promise<BuilderContent | null> {
	if (!env.NEXT_PUBLIC_FEATURE_BUILDER_ENABLED || !env.NEXT_PUBLIC_BUILDER_API_KEY) {
		return null;
	}

	try {
		const url = new URL("https://cdn.builder.io/api/v3/content/page");
		url.searchParams.set("apiKey", env.NEXT_PUBLIC_BUILDER_API_KEY);
		url.searchParams.set("userAttributes.urlPath", "/");
		url.searchParams.set("limit", "1");
		url.searchParams.set("noCache", "true");

		const res = await fetch(url.toString(), {
			next: { revalidate: 0 },
		});

		if (!res.ok) return null;

		const data = await res.json();
		const results = data?.results;
		if (!results || results.length === 0) return null;

		return results[0] as BuilderContent;
	} catch {
		return null;
	}
}

export default async function HomePage() {
	const builderContent = await getBuilderHomepage();

	if (builderContent) {
		return <RenderBuilderContent content={builderContent} model="page" />;
	}

	return (
		<>
			<HeroSection />
			<QuickLinks />

			<section className="py-16 bg-warm-white">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-[5fr_3fr] gap-12">
						{/* Latest News */}
						<div>
							<h2 className="text-2xl font-serif font-bold text-sage-dark mb-6 pb-3 border-b-2 border-wheat">
								Latest News
							</h2>
							<Suspense fallback={<div className="text-[#7A756C]">Loading news...</div>}>
								<LatestNews />
							</Suspense>
						</div>

						{/* Upcoming Events */}
						<div>
							<h2 className="text-2xl font-serif font-bold text-sage-dark mb-6 pb-3 border-b-2 border-wheat">
								Upcoming Events
							</h2>
							<Suspense fallback={<div className="text-[#7A756C]">Loading events...</div>}>
								<UpcomingEvents />
							</Suspense>
						</div>
					</div>
				</div>
			</section>

			<CommunitySpotlight />
			<NewsletterSignup />
		</>
	);
}
