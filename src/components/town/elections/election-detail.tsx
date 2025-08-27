import { asc, eq } from "drizzle-orm";
import { Calendar, ExternalLink, FileText, Users } from "lucide-react";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/town/mdx-content";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/server/db";
import { candidates, elections } from "@/server/db/schema-town";
import { CandidateCard } from "./candidate-card";
import { VotingInfo } from "./voting-info";

interface ElectionDetailProps {
	slug: string;
}

async function getElectionWithCandidates(slug: string) {
	if (!db) return null;

	const election = await db.select().from(elections).where(eq(elections.slug, slug)).limit(1);

	if (!election[0]) return null;

	const electionCandidates = await db
		.select()
		.from(candidates)
		.where(eq(candidates.electionId, election[0].id))
		.orderBy(asc(candidates.sortOrder), asc(candidates.name));

	return {
		...election[0],
		candidates: electionCandidates,
	};
}

export async function ElectionDetail({ slug }: ElectionDetailProps) {
	const election = await getElectionWithCandidates(slug);

	if (!election) {
		notFound();
	}

	const electionDate = new Date(election.electionDate);
	const isUpcoming = electionDate > new Date();
	const isToday = electionDate.toDateString() === new Date().toDateString();
	const isPast = electionDate < new Date();

	const getElectionStatus = () => {
		if (isToday) return { label: "Today", variant: "destructive" as const };
		if (isUpcoming) return { label: "Upcoming", variant: "default" as const };
		if (isPast) return { label: "Complete", variant: "secondary" as const };
		return { label: "Unknown", variant: "outline" as const };
	};

	const status = getElectionStatus();

	const formatDate = (date: Date) => {
		return date.toLocaleDateString("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	// Group candidates by position
	const candidatesByPosition = election.candidates.reduce(
		(acc, candidate) => {
			if (!acc[candidate.position]) {
				acc[candidate.position] = [];
			}
			acc[candidate.position].push(candidate);
			return acc;
		},
		{} as Record<string, typeof election.candidates>
	);

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Page Header */}
			<div className="bg-blue-900 text-white py-12">
				<div className="container mx-auto px-4">
					<div className="flex items-start justify-between">
						<div>
							<h1 className="text-4xl font-bold mb-4">{election.title}</h1>
							<div className="flex items-center gap-4 text-blue-100">
								<div className="flex items-center gap-2">
									<Calendar className="h-5 w-5" />
									{formatDate(electionDate)}
								</div>
								<Badge variant={status.variant} className="text-sm">
									{status.label}
								</Badge>
							</div>
						</div>
					</div>

					{election.description && (
						<p className="text-xl text-blue-100 mt-4 max-w-3xl">{election.description}</p>
					)}
				</div>
			</div>

			{/* Content */}
			<div className="container mx-auto px-4 py-8">
				<div className="grid lg:grid-cols-3 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2 space-y-8">
						{/* Election Overview */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<FileText className="h-5 w-5" />
									Election Overview
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid sm:grid-cols-2 gap-6">
									<div>
										<h3 className="font-semibold text-gray-900 mb-2">Election Date</h3>
										<p className="text-gray-600">{formatDate(electionDate)}</p>
									</div>

									{election.registrationDeadline && (
										<div>
											<h3 className="font-semibold text-gray-900 mb-2">Registration Deadline</h3>
											<p className="text-gray-600">
												{formatDate(new Date(election.registrationDeadline))}
											</p>
										</div>
									)}

									<div>
										<h3 className="font-semibold text-gray-900 mb-2">Candidates</h3>
										<p className="text-gray-600">
											{election.candidates.length} candidate
											{election.candidates.length !== 1 ? "s" : ""}
										</p>
									</div>

									<div>
										<h3 className="font-semibold text-gray-900 mb-2">Polling Locations</h3>
										<p className="text-gray-600">
											{Array.isArray(election.pollingLocations)
												? `${election.pollingLocations.length} location${election.pollingLocations.length !== 1 ? "s" : ""}`
												: "Information not available"}
										</p>
									</div>
								</div>

								{/* External Links */}
								<div className="flex flex-wrap gap-3 mt-6 pt-6 border-t">
									{election.sampleBallot && (
										<a
											href={election.sampleBallot}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-2 rounded-md text-sm"
										>
											<FileText className="h-4 w-4" />
											Sample Ballot
											<ExternalLink className="h-3 w-3" />
										</a>
									)}

									{election.resultsUrl && !isUpcoming && (
										<a
											href={election.resultsUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 bg-green-50 px-3 py-2 rounded-md text-sm"
										>
											<FileText className="h-4 w-4" />
											Election Results
											<ExternalLink className="h-3 w-3" />
										</a>
									)}
								</div>
							</CardContent>
						</Card>

						{/* Candidates by Position */}
						{Object.entries(candidatesByPosition).map(([position, positionCandidates]) => (
							<Card key={position}>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Users className="h-5 w-5" />
										{position}
									</CardTitle>
									<p className="text-sm text-gray-600">
										{positionCandidates.length} candidate
										{positionCandidates.length !== 1 ? "s" : ""}
									</p>
								</CardHeader>
								<CardContent>
									<div className="grid gap-6">
										{positionCandidates.map((candidate) => (
											<CandidateCard key={candidate.id} candidate={candidate} />
										))}
									</div>
								</CardContent>
							</Card>
						))}

						{/* No Candidates Message */}
						{election.candidates.length === 0 && (
							<Card>
								<CardContent className="py-12 text-center">
									<Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
									<p className="text-gray-500">
										No candidates have been registered for this election yet.
									</p>
								</CardContent>
							</Card>
						)}
					</div>

					{/* Sidebar */}
					<div className="lg:col-span-1">
						<VotingInfo election={election} />
					</div>
				</div>
			</div>
		</div>
	);
}
