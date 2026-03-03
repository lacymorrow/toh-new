import { Calendar, Clock, FileText, Headphones, MapPin, Users, Video } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDate, formatTime } from "@/lib/utils";

interface MeetingCardProps {
	meeting: {
		id: number;
		title: string;
		slug: string;
		type: string | null;
		meetingDate: string;
		meetingTime: string | null;
		location: string | null;
		agenda: string | null;
		agendaUrl: string | null;
		minutes: string | null;
		minutesUrl: string | null;
		videoUrl: string | null;
		audioUrl: string | null;
		documents: string[] | null;
		attendees: any;
		isPublic: boolean | null;
	};
}

export function MeetingCard({ meeting }: MeetingCardProps) {
	const meetingDate = new Date(meeting.meetingDate);
	const isPastMeeting = meetingDate < new Date();
	const hasRecordings = meeting.videoUrl || meeting.audioUrl;
	const hasDocuments =
		meeting.agendaUrl || meeting.minutesUrl || (meeting.documents && meeting.documents.length > 0);

	return (
		<Card className="hover:shadow-lg transition-shadow">
			<CardHeader>
				<div className="flex justify-between items-start gap-4">
					<div className="flex-1">
						<Link
							href={`/meetings/${meeting.slug}`}
							className="hover:text-sage-dark transition-colors"
						>
							<h3 className="text-xl font-semibold mb-2">{meeting.title}</h3>
						</Link>

						<div className="flex gap-2 flex-wrap mb-3">
							{meeting.type && <Badge variant="secondary">{meeting.type}</Badge>}
							{!meeting.isPublic && <Badge variant="outline">Private</Badge>}
							{isPastMeeting ? (
								<Badge variant="default">Completed</Badge>
							) : (
								<Badge variant="outline">Upcoming</Badge>
							)}
						</div>
					</div>

					{hasRecordings && (
						<div className="flex gap-1">
							{meeting.videoUrl && (
								<Badge variant="outline" className="flex items-center gap-1">
									<Video className="h-3 w-3" />
									Video
								</Badge>
							)}
							{meeting.audioUrl && (
								<Badge variant="outline" className="flex items-center gap-1">
									<Headphones className="h-3 w-3" />
									Audio
								</Badge>
							)}
						</div>
					)}
				</div>
			</CardHeader>

			<CardContent>
				<div className="space-y-2 text-sm mb-4">
					<div className="flex items-center gap-2">
						<Calendar className="h-4 w-4 text-muted-foreground" />
						<span>{formatDate(meetingDate)}</span>
					</div>

					{meeting.meetingTime && (
						<div className="flex items-center gap-2">
							<Clock className="h-4 w-4 text-muted-foreground" />
							<span>{formatTime(meeting.meetingTime)}</span>
						</div>
					)}

					{meeting.location && (
						<div className="flex items-center gap-2">
							<MapPin className="h-4 w-4 text-muted-foreground" />
							<span>{meeting.location}</span>
						</div>
					)}

					{meeting.attendees &&
						Array.isArray(meeting.attendees) &&
						meeting.attendees.length > 0 && (
							<div className="flex items-center gap-2">
								<Users className="h-4 w-4 text-muted-foreground" />
								<span>{meeting.attendees.length} attendees</span>
							</div>
						)}
				</div>

				{hasDocuments && (
					<div className="space-y-2">
						<div className="flex items-center gap-2 text-sm font-medium">
							<FileText className="h-4 w-4 text-muted-foreground" />
							<span>Available Documents:</span>
						</div>
						<div className="flex gap-2 flex-wrap text-xs">
							{meeting.agendaUrl && (
								<a
									href={meeting.agendaUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="text-sage hover:text-sage-dark underline"
								>
									Agenda
								</a>
							)}
							{meeting.minutesUrl && (
								<a
									href={meeting.minutesUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="text-sage hover:text-sage-dark underline"
								>
									Minutes
								</a>
							)}
							{meeting.documents &&
								meeting.documents.map((doc, index) => (
									<a
										key={index}
										href={doc}
										target="_blank"
										rel="noopener noreferrer"
										className="text-sage hover:text-sage-dark underline"
									>
										Document {index + 1}
									</a>
								))}
						</div>
					</div>
				)}

				{hasRecordings && (
					<div className="mt-4 pt-4 border-t">
						<div className="flex gap-3">
							{meeting.videoUrl && (
								<a
									href={meeting.videoUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 text-sage hover:text-sage-dark text-sm font-medium"
								>
									<Video className="h-4 w-4" />
									Watch Recording
								</a>
							)}
							{meeting.audioUrl && (
								<a
									href={meeting.audioUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 text-sage hover:text-sage-dark text-sm font-medium"
								>
									<Headphones className="h-4 w-4" />
									Listen to Audio
								</a>
							)}
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
