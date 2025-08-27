import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { ElectionDetail } from "@/components/town/elections/election-detail";
import { db } from "@/server/db";
import { elections } from "@/server/db/schema-town";

interface ElectionPageProps {
	params: {
		slug: string;
	};
}

async function getElection(slug: string) {
	if (!db) return null;

	const election = await db.select().from(elections).where(eq(elections.slug, slug)).limit(1);

	return election[0] || null;
}

export async function generateMetadata({ params }: ElectionPageProps): Promise<Metadata> {
	const election = await getElection(params.slug);

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

	return {
		title: `${election.title} - Elections`,
		description:
			election.description ||
			`View details about the ${election.title} election scheduled for ${formattedDate}, including candidates, polling locations, and voting information.`,
		openGraph: {
			title: `${election.title} - Town of Harmony Elections`,
			description: election.description || `Election details for ${formattedDate}`,
			type: "website",
		},
	};
}

export default function ElectionPage({ params }: ElectionPageProps) {
	return <ElectionDetail slug={params.slug} />;
}
