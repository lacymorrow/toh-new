import { Calendar, Clock, FileText, Download, Search, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const upcomingMeetings = [
	{
		id: 1,
		type: "Regular Board Meeting",
		date: "December 12, 2024",
		time: "7:00 PM",
		location: "Town Hall Council Chambers",
		agenda: "/agendas/2024-12-12-regular.pdf",
		status: "upcoming",
		description: "Regular monthly meeting of the Board of Aldermen",
	},
	{
		id: 2,
		type: "Planning Board Meeting",
		date: "January 6, 2025",
		time: "6:30 PM",
		location: "Town Hall Conference Room",
		agenda: "/agendas/2025-01-06-planning.pdf",
		status: "upcoming",
		description: "Review of development proposals and zoning matters",
	},
	{
		id: 3,
		type: "Parks & Recreation Board",
		date: "January 16, 2025",
		time: "6:00 PM",
		location: "Community Center",
		agenda: null,
		status: "upcoming",
		description: "Discussion of spring programs and facility improvements",
	},
];

const pastMeetings = [
	{
		id: 4,
		type: "Regular Board Meeting",
		date: "November 14, 2024",
		time: "7:00 PM",
		location: "Town Hall Council Chambers",
		agenda: "/agendas/2024-11-14-regular.pdf",
		minutes: "/minutes/2024-11-14-regular.pdf",
		recording: "https://youtube.com/watch?v=example",
		status: "completed",
	},
	{
		id: 5,
		type: "Special Called Meeting",
		date: "November 7, 2024",
		time: "5:30 PM",
		location: "Town Hall Council Chambers",
		agenda: "/agendas/2024-11-07-special.pdf",
		minutes: "/minutes/2024-11-07-special.pdf",
		status: "completed",
		highlights: ["Budget Amendment Approved", "New Police Chief Sworn In"],
	},
	{
		id: 6,
		type: "Regular Board Meeting",
		date: "October 10, 2024",
		time: "7:00 PM",
		location: "Town Hall Council Chambers",
		agenda: "/agendas/2024-10-10-regular.pdf",
		minutes: "/minutes/2024-10-10-regular.pdf",
		recording: "https://youtube.com/watch?v=example2",
		status: "completed",
	},
	{
		id: 7,
		type: "Planning Board Meeting",
		date: "October 2, 2024",
		time: "6:30 PM",
		location: "Town Hall Conference Room",
		agenda: "/agendas/2024-10-02-planning.pdf",
		minutes: "/minutes/2024-10-02-planning.pdf",
		status: "completed",
	},
	{
		id: 8,
		type: "Regular Board Meeting",
		date: "September 12, 2024",
		time: "7:00 PM",
		location: "Town Hall Council Chambers",
		agenda: "/agendas/2024-09-12-regular.pdf",
		minutes: "/minutes/2024-09-12-regular.pdf",
		recording: "https://youtube.com/watch?v=example3",
		status: "completed",
	},
];

const meetingTypes = [
	"All Meetings",
	"Regular Board Meeting",
	"Special Called Meeting",
	"Planning Board Meeting",
	"Parks & Recreation Board",
	"Finance Committee",
	"Historic Preservation Commission",
];

const years = ["2024", "2023", "2022", "2021", "2020"];

export default function AgendaMinutesPage() {
	return (
		<div className="min-h-screen bg-cream">
			{/* Hero Section */}
			<section className="bg-gradient-to-r from-sage-dark to-sage text-white py-16">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold mb-4">Agendas & Minutes</h1>
					<p className="text-xl">Stay informed about town government meetings and decisions</p>
				</div>
			</section>

			{/* Meeting Notice */}
			<section className="py-6 bg-yellow-50 border-b border-yellow-200">
				<div className="container mx-auto px-4">
					<div className="flex items-center gap-3">
						<Calendar className="h-6 w-6 text-yellow-600" />
						<div>
							<p className="font-semibold text-[#2D2A24]">Next Regular Board Meeting</p>
							<p className="text-sm text-[#4A4640]">December 12, 2024 at 7:00 PM - Town Hall Council Chambers</p>
						</div>
					</div>
				</div>
			</section>

			{/* Tabs for Upcoming and Past Meetings */}
			<section className="py-12">
				<div className="container mx-auto px-4">
					<Tabs defaultValue="upcoming" className="w-full">
						<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
							<TabsList>
								<TabsTrigger value="upcoming">Upcoming Meetings</TabsTrigger>
								<TabsTrigger value="past">Past Meetings</TabsTrigger>
							</TabsList>
							
							{/* Search and Filter */}
							<div className="flex gap-2 w-full md:w-auto">
								<div className="relative flex-1 md:w-64">
									<Search className="absolute left-2 top-2.5 h-4 w-4 text-[#7A756C]" />
									<Input placeholder="Search meetings..." className="pl-8" />
								</div>
								<Select defaultValue="all">
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Meeting Type" />
									</SelectTrigger>
									<SelectContent>
										{meetingTypes.map((type) => (
											<SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, "-")}>
												{type}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>

						{/* Upcoming Meetings */}
						<TabsContent value="upcoming" className="space-y-4">
							{upcomingMeetings.map((meeting) => (
								<Card key={meeting.id}>
									<CardHeader>
										<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
											<div>
												<CardTitle className="text-xl">{meeting.type}</CardTitle>
												<CardDescription className="mt-1">{meeting.description}</CardDescription>
											</div>
											<Badge variant="secondary">Upcoming</Badge>
										</div>
									</CardHeader>
									<CardContent>
										<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
											<div className="flex items-center gap-2 text-sm">
												<Calendar className="h-4 w-4 text-[#7A756C]" />
												<span>{meeting.date}</span>
											</div>
											<div className="flex items-center gap-2 text-sm">
												<Clock className="h-4 w-4 text-[#7A756C]" />
												<span>{meeting.time}</span>
											</div>
											<div className="flex items-center gap-2 text-sm col-span-2">
												<FileText className="h-4 w-4 text-[#7A756C]" />
												<span>{meeting.location}</span>
											</div>
										</div>
										<div className="flex gap-2">
											{meeting.agenda ? (
												<Button variant="outline" size="sm" asChild>
													<a href={meeting.agenda} download>
														<Download className="mr-2 h-4 w-4" />
														Download Agenda
													</a>
												</Button>
											) : (
												<Button variant="outline" size="sm" disabled>
													Agenda Coming Soon
												</Button>
											)}
											<Button variant="outline" size="sm">
												Add to Calendar
											</Button>
										</div>
									</CardContent>
								</Card>
							))}
						</TabsContent>

						{/* Past Meetings */}
						<TabsContent value="past" className="space-y-4">
							{/* Year Filter */}
							<div className="flex gap-2 mb-4">
								<Select defaultValue="2024">
									<SelectTrigger className="w-[120px]">
										<SelectValue placeholder="Year" />
									</SelectTrigger>
									<SelectContent>
										{years.map((year) => (
											<SelectItem key={year} value={year}>
												{year}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							{pastMeetings.map((meeting) => (
								<Card key={meeting.id}>
									<CardHeader>
										<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
											<CardTitle className="text-xl">{meeting.type}</CardTitle>
											<div className="flex items-center gap-2 text-sm text-[#7A756C]">
												<Calendar className="h-4 w-4" />
												<span>{meeting.date}</span>
												<Clock className="h-4 w-4 ml-2" />
												<span>{meeting.time}</span>
											</div>
										</div>
									</CardHeader>
									<CardContent>
										{meeting.highlights && (
											<div className="mb-4">
												<p className="text-sm font-medium mb-2">Key Decisions:</p>
												<div className="flex flex-wrap gap-2">
													{meeting.highlights.map((highlight, index) => (
														<Badge key={index} variant="outline">
															{highlight}
														</Badge>
													))}
												</div>
											</div>
										)}
										<div className="flex flex-wrap gap-2">
											<Button variant="outline" size="sm" asChild>
												<a href={meeting.agenda} download>
													<Download className="mr-2 h-4 w-4" />
													Agenda
												</a>
											</Button>
											<Button variant="outline" size="sm" asChild>
												<a href={meeting.minutes} download>
													<FileText className="mr-2 h-4 w-4" />
													Minutes
												</a>
											</Button>
											{meeting.recording && (
												<Button variant="outline" size="sm" asChild>
													<a href={meeting.recording} target="_blank" rel="noopener noreferrer">
														Video Recording
													</a>
												</Button>
											)}
										</div>
									</CardContent>
								</Card>
							))}

							{/* Load More */}
							<div className="text-center pt-4">
								<Button variant="outline">Load More Meetings</Button>
							</div>
						</TabsContent>
					</Tabs>
				</div>
			</section>

			{/* Meeting Information */}
			<section className="py-12 bg-white">
				<div className="container mx-auto px-4">
					<h2 className="text-2xl font-bold mb-6">Meeting Information</h2>
					<div className="grid md:grid-cols-2 gap-6">
						<Card className="p-6">
							<h3 className="text-lg font-semibold mb-3">Public Participation</h3>
							<p className="text-[#4A4640] mb-4">
								All regular meetings are open to the public. Citizens may address the Board during the public comment period 
								at the beginning of each regular meeting. Comments are limited to 3 minutes per speaker.
							</p>
							<Button variant="outline" size="sm">
								Public Comment Guidelines
							</Button>
						</Card>
						<Card className="p-6">
							<h3 className="text-lg font-semibold mb-3">Meeting Broadcasts</h3>
							<p className="text-[#4A4640] mb-4">
								Regular Board meetings are broadcast live on the Town's YouTube channel and local cable channel 21. 
								Recordings are available within 48 hours of the meeting.
							</p>
							<Button variant="outline" size="sm" asChild>
								<a href="https://youtube.com/@townofharmony" target="_blank" rel="noopener noreferrer">
									Watch Live
								</a>
							</Button>
						</Card>
						<Card className="p-6">
							<h3 className="text-lg font-semibold mb-3">Meeting Notifications</h3>
							<p className="text-[#4A4640] mb-4">
								Sign up to receive email notifications about upcoming meetings, agenda postings, and meeting cancellations.
							</p>
							<Button variant="outline" size="sm">
								Subscribe to Notifications
							</Button>
						</Card>
						<Card className="p-6">
							<h3 className="text-lg font-semibold mb-3">Records Request</h3>
							<p className="text-[#4A4640] mb-4">
								To request meeting records not available online, please submit a public records request to the Town Clerk's office.
							</p>
							<Button variant="outline" size="sm">
								Submit Records Request
							</Button>
						</Card>
					</div>
				</div>
			</section>

			{/* Archive Notice */}
			<section className="py-12 bg-stone">
				<div className="container mx-auto px-4">
					<Card className="p-6 bg-cream border-sage/20">
						<div className="flex items-start gap-4">
							<FileText className="h-6 w-6 text-sage mt-1" />
							<div>
								<h3 className="text-lg font-semibold mb-2">Historical Archives</h3>
								<p className="text-[#4A4640] mb-3">
									Meeting agendas and minutes from 2019 and earlier are available in the Town Clerk's office. 
									Digital archives are being developed and will be available online soon.
								</p>
								<p className="text-sm text-[#4A4640]">
									For assistance accessing historical records, contact the Town Clerk at{" "}
									<a href="tel:704-546-7002" className="text-sage hover:underline">
										(704) 546-7002
									</a>{" "}
									or{" "}
									<a href="mailto:clerk@townofharmony.org" className="text-sage hover:underline">
										clerk@townofharmony.org
									</a>
								</p>
							</div>
						</div>
					</Card>
				</div>
			</section>
		</div>
	);
}