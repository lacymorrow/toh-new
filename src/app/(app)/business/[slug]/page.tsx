import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { BusinessDetail } from "@/components/town/business/business-detail";
import { RelatedBusinesses } from "@/components/town/business/related-businesses";
import { db } from "@/server/db";
import { businesses } from "@/server/db/schema-town";

interface BusinessPageProps {
	params: { slug: string };
}

async function getBusiness(slug: string) {
	if (!db) return null;

	const business = await db.select().from(businesses).where(eq(businesses.slug, slug)).limit(1);

	return business[0] || null;
}

export async function generateMetadata({ params }: BusinessPageProps) {
	const business = await getBusiness(params.slug);

	if (!business) {
		return {
			title: "Business Not Found | Town of Harmony",
		};
	}

	return {
		title: `${business.name} | Town of Harmony Business Directory`,
		description: business.description || `Learn more about ${business.name} in the Town of Harmony`,
	};
}

export default async function BusinessPage({ params }: BusinessPageProps) {
	const business = await getBusiness(params.slug);

	if (!business) {
		notFound();
	}

	return (
		<div className="container py-8">
			<div className="grid gap-8 lg:grid-cols-[1fr_300px]">
				<div>
					<BusinessDetail business={business} />
				</div>
				<aside className="space-y-6">
					<RelatedBusinesses currentBusinessId={business.id} category={business.category} />
				</aside>
			</div>
		</div>
	);
}
