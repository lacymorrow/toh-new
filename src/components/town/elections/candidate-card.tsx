import { ExternalLink, Mail, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Candidate } from "@/server/db/schema-town";

interface CandidateCardProps {
	candidate: Candidate;
}

export function CandidateCard({ candidate }: CandidateCardProps) {
	return (
		<Card className="h-full">
			<CardHeader>
				<div className="flex items-start gap-4">
					{candidate.photo ? (
						<img
							src={candidate.photo}
							alt={candidate.name}
							className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
						/>
					) : (
						<div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
							<User className="h-8 w-8 text-gray-400" />
						</div>
					)}

					<div className="flex-1 min-w-0">
						<CardTitle className="text-lg">{candidate.name}</CardTitle>
						<p className="text-sm text-gray-600 mb-2">{candidate.position}</p>
						{candidate.party && (
							<Badge variant="outline" className="text-xs">
								{candidate.party}
							</Badge>
						)}
					</div>
				</div>
			</CardHeader>

			<CardContent className="space-y-4">
				{candidate.bio && (
					<div>
						<p className="text-sm text-gray-700 leading-relaxed">
							{candidate.bio.length > 300 ? `${candidate.bio.substring(0, 300)}...` : candidate.bio}
						</p>
					</div>
				)}

				<div className="flex flex-wrap gap-2 pt-2 border-t">
					{candidate.contactEmail && (
						<a
							href={`mailto:${candidate.contactEmail}`}
							className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 bg-blue-50 px-2 py-1 rounded-md"
						>
							<Mail className="h-3 w-3" />
							Email
						</a>
					)}

					{candidate.website && (
						<a
							href={candidate.website}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1 text-xs text-green-600 hover:text-green-700 bg-green-50 px-2 py-1 rounded-md"
						>
							<ExternalLink className="h-3 w-3" />
							Website
						</a>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
