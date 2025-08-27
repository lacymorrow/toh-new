import { Mail, Phone, Building2, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const townOfficials = [
	{
		category: "Executive",
		members: [
			{
				name: "Sean Turner",
				title: "Mayor",
				email: "mayor@townofharmony.org",
				phone: "(704) 546-7001",
				bio: "Mayor Turner has served the Town of Harmony since 2020, focusing on economic development and community engagement.",
				image: "/images/officials/mayor.jpg",
				termExpires: "2024",
			},
			{
				name: "Wanda Edwards",
				title: "Town Clerk",
				email: "clerk@townofharmony.org",
				phone: "(704) 546-7002",
				bio: "Wanda Edwards has been the Town Clerk since 2018, managing town records and ensuring transparent governance.",
				image: "/images/officials/clerk.jpg",
			},
		],
	},
	{
		category: "Board of Aldermen",
		members: [
			{
				name: "Brandon Angell",
				title: "Alderman",
				email: "bangell@townofharmony.org",
				phone: "(704) 546-7011",
				bio: "Alderman Angell chairs the Finance Committee and advocates for responsible fiscal management.",
				district: "District 1",
				termExpires: "2025",
			},
			{
				name: "Jared Clark",
				title: "Alderman",
				email: "jclark@townofharmony.org",
				phone: "(704) 546-7012",
				bio: "Alderman Clark focuses on infrastructure improvements and public safety initiatives.",
				district: "District 2",
				termExpires: "2024",
			},
			{
				name: "Scotty Harris",
				title: "Alderman",
				email: "sharris@townofharmony.org",
				phone: "(704) 546-7013",
				bio: "Alderman Harris champions parks and recreation programs for families and youth.",
				district: "District 3",
				termExpires: "2025",
			},
			{
				name: "Chris Pierce",
				title: "Alderman",
				email: "cpierce@townofharmony.org",
				phone: "(704) 546-7014",
				bio: "Alderman Pierce leads economic development efforts and business community outreach.",
				district: "District 4",
				termExpires: "2024",
			},
		],
	},
	{
		category: "Department Heads",
		members: [
			{
				name: "Michael Thompson",
				title: "Town Manager",
				email: "manager@townofharmony.org",
				phone: "(704) 546-7003",
				bio: "Oversees day-to-day operations and implements policies set by the Board of Aldermen.",
				department: "Administration",
			},
			{
				name: "Sarah Johnson",
				title: "Finance Director",
				email: "finance@townofharmony.org",
				phone: "(704) 546-7004",
				bio: "Manages town budget, financial reporting, and ensures fiscal responsibility.",
				department: "Finance",
			},
			{
				name: "David Williams",
				title: "Public Works Director",
				email: "publicworks@townofharmony.org",
				phone: "(704) 546-7005",
				bio: "Maintains town infrastructure including streets, water, sewer, and facilities.",
				department: "Public Works",
			},
			{
				name: "Jennifer Martinez",
				title: "Parks & Recreation Director",
				email: "recreation@townofharmony.org",
				phone: "(704) 546-7006",
				bio: "Develops community programs and maintains recreational facilities.",
				department: "Parks & Recreation",
			},
			{
				name: "Robert Anderson",
				title: "Planning Director",
				email: "planning@townofharmony.org",
				phone: "(704) 546-7007",
				bio: "Guides town development and ensures compliance with zoning regulations.",
				department: "Planning & Zoning",
			},
			{
				name: "Chief James Wilson",
				title: "Police Chief",
				email: "police@townofharmony.org",
				phone: "(704) 546-7008",
				bio: "Leads the Harmony Police Department in protecting and serving our community.",
				department: "Police Department",
			},
		],
	},
];

export default function OurTeamPage() {
	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase();
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold mb-4">Our Team</h1>
					<p className="text-xl">Meet the dedicated public servants working for you</p>
				</div>
			</section>

			{/* Town Government Structure */}
			<section className="py-12 bg-white">
				<div className="container mx-auto px-4">
					<Card className="p-6">
						<h2 className="text-2xl font-bold mb-4">Town Government Structure</h2>
						<p className="text-gray-600 mb-4">
							The Town of Harmony operates under a Mayor-Council form of government. The Mayor and four Aldermen are elected by residents to serve 
							four-year terms. Together, they set policy, approve the budget, and make decisions that shape our community's future.
						</p>
						<div className="grid md:grid-cols-3 gap-6 mt-6">
							<div className="text-center">
								<Building2 className="h-12 w-12 mx-auto mb-2 text-blue-600" />
								<h3 className="font-semibold">Town Hall</h3>
								<p className="text-sm text-gray-600">123 Main Street, Harmony, NC 28634</p>
							</div>
							<div className="text-center">
								<Phone className="h-12 w-12 mx-auto mb-2 text-blue-600" />
								<h3 className="font-semibold">Contact</h3>
								<p className="text-sm text-gray-600">(704) 546-7000</p>
							</div>
							<div className="text-center">
								<Calendar className="h-12 w-12 mx-auto mb-2 text-blue-600" />
								<h3 className="font-semibold">Board Meetings</h3>
								<p className="text-sm text-gray-600">2nd Tuesday of each month at 7:00 PM</p>
							</div>
						</div>
					</Card>
				</div>
			</section>

			{/* Officials Sections */}
			{townOfficials.map((section) => (
				<section key={section.category} className="py-12">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl font-bold mb-8 text-gray-900">{section.category}</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{section.members.map((member) => (
								<Card key={member.name} className="overflow-hidden">
									<CardHeader className="pb-4">
										<div className="flex items-start gap-4">
											<Avatar className="h-16 w-16">
												<AvatarImage src={member.image} alt={member.name} />
												<AvatarFallback>{getInitials(member.name)}</AvatarFallback>
											</Avatar>
											<div className="flex-1">
												<CardTitle className="text-lg">{member.name}</CardTitle>
												<CardDescription className="font-medium">{member.title}</CardDescription>
												{member.department && (
													<Badge variant="secondary" className="mt-1">
														{member.department}
													</Badge>
												)}
												{member.district && (
													<Badge variant="outline" className="mt-1">
														{member.district}
													</Badge>
												)}
											</div>
										</div>
									</CardHeader>
									<CardContent className="space-y-3">
										<p className="text-sm text-gray-600">{member.bio}</p>
										<div className="space-y-2 pt-2 border-t">
											<div className="flex items-center gap-2 text-sm">
												<Mail className="h-4 w-4 text-gray-400" />
												<a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
													{member.email}
												</a>
											</div>
											<div className="flex items-center gap-2 text-sm">
												<Phone className="h-4 w-4 text-gray-400" />
												<span className="text-gray-600">{member.phone}</span>
											</div>
											{member.termExpires && (
												<div className="text-sm text-gray-500">
													Term expires: {member.termExpires}
												</div>
											)}
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>
			))}

			{/* Committees Section */}
			<section className="py-12 bg-white">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold mb-8 text-gray-900">Advisory Committees</h2>
					<div className="grid md:grid-cols-2 gap-6">
						<Card className="p-6">
							<h3 className="text-xl font-semibold mb-3">Planning Board</h3>
							<p className="text-gray-600 mb-4">
								Reviews development proposals and makes recommendations on land use and zoning matters.
							</p>
							<p className="text-sm text-gray-500">Meets: 1st Monday of each month</p>
						</Card>
						<Card className="p-6">
							<h3 className="text-xl font-semibold mb-3">Parks & Recreation Advisory Board</h3>
							<p className="text-gray-600 mb-4">
								Advises on recreational programs, facilities, and community events.
							</p>
							<p className="text-sm text-gray-500">Meets: 3rd Thursday of each month</p>
						</Card>
						<Card className="p-6">
							<h3 className="text-xl font-semibold mb-3">Finance Committee</h3>
							<p className="text-gray-600 mb-4">
								Reviews budget proposals and provides financial oversight recommendations.
							</p>
							<p className="text-sm text-gray-500">Meets: Quarterly or as needed</p>
						</Card>
						<Card className="p-6">
							<h3 className="text-xl font-semibold mb-3">Historic Preservation Commission</h3>
							<p className="text-gray-600 mb-4">
								Works to preserve and promote Harmony's rich historical heritage.
							</p>
							<p className="text-sm text-gray-500">Meets: 2nd Wednesday of each month</p>
						</Card>
					</div>
				</div>
			</section>

			{/* Contact Information */}
			<section className="py-12 bg-blue-50">
				<div className="container mx-auto px-4">
					<Card className="p-6">
						<h2 className="text-2xl font-bold mb-4">Contact Town Hall</h2>
						<div className="grid md:grid-cols-2 gap-6">
							<div>
								<h3 className="font-semibold mb-2">Office Hours</h3>
								<p className="text-gray-600">
									Monday - Friday: 8:30 AM - 5:00 PM<br />
									Closed on weekends and town holidays
								</p>
							</div>
							<div>
								<h3 className="font-semibold mb-2">General Inquiries</h3>
								<p className="text-gray-600">
									Phone: (704) 546-7000<br />
									Email: info@townofharmony.org<br />
									Fax: (704) 546-7099
								</p>
							</div>
						</div>
					</Card>
				</div>
			</section>
		</div>
	);
}