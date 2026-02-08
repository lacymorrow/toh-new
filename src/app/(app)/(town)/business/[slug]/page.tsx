import { notFound } from "next/navigation";
import { getBusinessBySlug } from "@/lib/payload/town-data";
import { extractTextFromRichText } from "@/components/town/payload-rich-text";
import { BusinessDetail } from "@/components/town/business/business-detail";
import { RelatedBusinesses } from "@/components/town/business/related-businesses";

interface BusinessPageProps {
	params: { slug: string };
}

export async function generateMetadata({ params }: BusinessPageProps) {
	const business = await getBusinessBySlug(params.slug);

	if (!business) {
		return {
			title: "Business Not Found | Town of Harmony",
		};
	}

	const descriptionText = extractTextFromRichText(business.description as any);

	return {
		title: `${business.name} | Town of Harmony Business Directory`,
		description: descriptionText || `Learn more about ${business.name} in the Town of Harmony`,
	};
}

export default async function BusinessPage({ params }: BusinessPageProps) {
	const business = await getBusinessBySlug(params.slug);

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
