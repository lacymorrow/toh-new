import type { Metadata } from "next";
import { ElectionDetail } from "@/components/town/elections/election-detail";
import { getElectionBySlug } from "@/lib/payload/town-data";
import { extractTextFromRichText } from "@/components/town/payload-rich-text";

interface ElectionPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export async function generateMetadata({ params }: ElectionPageProps): Promise<Metadata> {
	const { slug } = await params;
	const election = await getElectionBySlug(slug);

	if (!election) {
		return {
			title: "Election Not Found",
			description: "The requested election could not be found.",
		};
	}

	const electionDate = new Date(election.electionDate);
	const formattedDate = electionDate.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	const descriptionText = extractTextFromRichText(election.description as any);

	return {
		title: `${election.title} - Elections`,
		description:
			descriptionText ||
			`View details about the ${election.title} election scheduled for ${formattedDate}, including candidates, polling locations, and voting information.`,
		openGraph: {
			title: `${election.title} - Town of Harmony Elections`,
			description: descriptionText || `Election details for ${formattedDate}`,
			type: "website",
		},
	};
}

export default async function ElectionPage({ params }: ElectionPageProps) {
	const { slug } = await params;
	return <ElectionDetail slug={slug} />;
}
