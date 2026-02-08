import { Mail, Phone, Building2, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getTeamMembers, getSettings } from "@/lib/payload/town-data";

export default async function OurTeamPage() {
	const [members, settings] = await Promise.all([
		getTeamMembers(),
		getSettings(),
	]);

	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase();
	};

	// Group members by category
	const categories = ["Executive", "Board of Aldermen", "Department Heads", "Advisory Committees"];
	const grouped = categories
		.map((category) => ({
			category,
			members: members.filter((m: any) => m.category === category),
		}))
		.filter((g) => g.members.length > 0);

	const contactPhone = (settings as any)?.contactInfo?.phone ?? "(704) 546-7000";
	const contactAddress = (settings as any)?.contactInfo?.address ?? "3389 Harmony Hwy, Harmony, NC 28634";

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
								<p className="text-sm text-gray-600">{contactAddress}</p>
							</div>
							<div className="text-center">
								<Phone className="h-12 w-12 mx-auto mb-2 text-blue-600" />
								<h3 className="font-semibold">Contact</h3>
								<p className="text-sm text-gray-600">{contactPhone}</p>
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
			{grouped.map((section) => (
				<section key={section.category} className="py-12">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl font-bold mb-8 text-gray-900">{section.category}</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{section.members.map((member: any) => {
								const photoUrl = typeof member.photo === "object" && member.photo?.url
									? member.photo.url
									: undefined;
								return (
									<Card key={member.id} className="overflow-hidden">
										<CardHeader className="pb-4">
											<div className="flex items-start gap-4">
												<Avatar className="h-16 w-16">
													<AvatarImage src={photoUrl} alt={member.name} />
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
												</div>
											</div>
										</CardHeader>
										<CardContent className="space-y-3">
											<p className="text-sm text-gray-600">{member.bio}</p>
											<div className="space-y-2 pt-2 border-t">
												{member.email && (
													<div className="flex items-center gap-2 text-sm">
														<Mail className="h-4 w-4 text-gray-400" />
														<a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
															{member.email}
														</a>
													</div>
												)}
												{member.phone && (
													<div className="flex items-center gap-2 text-sm">
														<Phone className="h-4 w-4 text-gray-400" />
														<span className="text-gray-600">{member.phone}</span>
													</div>
												)}
												{member.termExpires && (
													<div className="text-sm text-gray-500">
														Term expires: {member.termExpires}
													</div>
												)}
											</div>
										</CardContent>
									</Card>
								);
							})}
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
									{(settings as any)?.officeHours?.weekday ?? "Monday - Friday: 8:30 AM - 5:00 PM"}<br />
									{(settings as any)?.officeHours?.weekend ?? "Closed on weekends and town holidays"}
								</p>
							</div>
							<div>
								<h3 className="font-semibold mb-2">General Inquiries</h3>
								<p className="text-gray-600">
									Phone: {contactPhone}<br />
									Email: {(settings as any)?.contactInfo?.email ?? "info@townofharmony.org"}<br />
									Fax: {(settings as any)?.contactInfo?.fax ?? "(704) 546-7099"}
								</p>
							</div>
						</div>
					</Card>
				</div>
			</section>
		</div>
	);
}
