import { Calendar, FileText, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { extractTextFromRichText } from "@/components/town/payload-rich-text";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ElectionCardProps {
	election: {
		id: number;
		title: string;
		slug: string;
		description?: any;
		electionDate: string;
		registrationDeadline?: string | null;
		pollingLocations?: { name: string; address: string; hours?: string | null }[] | null;
		sampleBallot?: any;
		resultsUrl?: string | null;
	};
	candidateCount?: number;
}

export function ElectionCard({ election, candidateCount = 0 }: ElectionCardProps) {
	const electionDate = new Date(election.electionDate);
	const registrationDeadline = election.registrationDeadline
		? new Date(election.registrationDeadline)
		: null;
	const isUpcoming = electionDate > new Date();
	const isPast = electionDate < new Date();
	const isToday = electionDate.toDateString() === new Date().toDateString();

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

	// Extract plain text from rich text description for card display
	const descriptionText = extractTextFromRichText(election.description);

	return (
		<Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
			<CardHeader>
				<div className="flex items-start justify-between">
					<CardTitle className="text-lg line-clamp-2">
						<Link
							href={`/elections/${election.slug}`}
							className="hover:text-blue-600 transition-colors"
						>
							{election.title}
						</Link>
					</CardTitle>
					<Badge variant={status.variant}>{status.label}</Badge>
				</div>

				{descriptionText && (
					<p className="text-sm text-gray-600 line-clamp-2 mt-2">{descriptionText}</p>
				)}
			</CardHeader>

			<CardContent className="flex-1 flex flex-col justify-between">
				<div className="space-y-3">
					{/* Election Date */}
					<div className="flex items-start gap-2 text-sm">
						<Calendar className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
						<div>
							<p className="font-medium">Election Day</p>
							<p className="text-gray-600">{formatDate(electionDate)}</p>
						</div>
					</div>

					{/* Registration Deadline */}
					{registrationDeadline && isUpcoming && (
						<div className="flex items-start gap-2 text-sm">
							<FileText className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
							<div>
								<p className="font-medium">Registration Deadline</p>
								<p className="text-gray-600">{formatDate(registrationDeadline)}</p>
							</div>
						</div>
					)}

					{/* Candidates Count */}
					{candidateCount > 0 && (
						<div className="flex items-center gap-2 text-sm">
							<Users className="h-4 w-4 text-green-600" />
							<span className="text-gray-600">
								{candidateCount} candidate{candidateCount !== 1 ? "s" : ""}
							</span>
						</div>
					)}

					{/* Polling Locations */}
					{election.pollingLocations &&
						Array.isArray(election.pollingLocations) &&
						election.pollingLocations.length > 0 && (
							<div className="flex items-center gap-2 text-sm">
								<MapPin className="h-4 w-4 text-purple-600" />
								<span className="text-gray-600">
									{election.pollingLocations.length} polling location
									{election.pollingLocations.length !== 1 ? "s" : ""}
								</span>
							</div>
						)}
				</div>

				<div className="mt-6 pt-4 border-t">
					<Link
						href={`/elections/${election.slug}`}
						className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
					>
						View Details
						<span className="ml-1">→</span>
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
