import { Calendar, ExternalLink, FileText, Users } from "lucide-react";
import { notFound } from "next/navigation";
import { PayloadRichText, extractTextFromRichText } from "@/components/town/payload-rich-text";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getElectionBySlug } from "@/lib/payload/town-data";
import { CandidateCard } from "./candidate-card";
import { VotingInfo } from "./voting-info";

interface ElectionDetailProps {
	slug: string;
}

export async function ElectionDetail({ slug }: ElectionDetailProps) {
	const election = await getElectionBySlug(slug);

	if (!election) {
		notFound();
	}

	const electionCandidates = election.candidates ?? [];

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
	const candidatesByPosition = electionCandidates.reduce(
		(acc, candidate) => {
			const position = candidate.position || "Unknown";
			if (!acc[position]) {
				acc[position] = [];
			}
			acc[position].push(candidate);
			return acc;
		},
		{} as Record<string, typeof electionCandidates>
	);

	// Resolve sampleBallot URL from upload relation
	const sampleBallotUrl =
		typeof election.sampleBallot === "object" && election.sampleBallot?.url
			? election.sampleBallot.url
			: typeof election.sampleBallot === "string"
				? election.sampleBallot
				: null;

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
						<div className="text-xl text-blue-100 mt-4 max-w-3xl">
							<PayloadRichText
								content={election.description as any}
								className="prose prose-lg prose-invert max-w-none"
							/>
						</div>
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
											{electionCandidates.length} candidate
											{electionCandidates.length !== 1 ? "s" : ""}
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
									{sampleBallotUrl && (
										<a
											href={sampleBallotUrl}
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
										{positionCandidates.map((candidate, index) => (
											<CandidateCard key={candidate.id ?? index} candidate={candidate} />
										))}
									</div>
								</CardContent>
							</Card>
						))}

						{/* No Candidates Message */}
						{electionCandidates.length === 0 && (
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
