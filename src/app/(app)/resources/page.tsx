import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
	FileText, 
	Download, 
	Phone, 
	Mail, 
	Globe, 
	MapPin,
	Users,
	Shield,
	Heart,
	School,
	Briefcase,
	Home
} from "lucide-react";

export const metadata: Metadata = {
	title: "Resources | Town of Harmony",
	description: "Access important resources, documents, and services for Town of Harmony residents and visitors.",
};

const documentResources = [
	{
		title: "Town Charter",
		description: "The official charter establishing the Town of Harmony",
		icon: FileText,
		link: "/documents/town-charter.pdf",
	},
	{
		title: "Town Ordinances",
		description: "Current ordinances and regulations",
		icon: FileText,
		link: "/documents/ordinances.pdf",
	},
	{
		title: "Annual Budget",
		description: "Current fiscal year budget and financial reports",
		icon: FileText,
		link: "/documents/budget.pdf",
	},
	{
		title: "Meeting Minutes",
		description: "Archive of town meeting minutes",
		icon: FileText,
		link: "/meetings/archives",
	},
];

const communityServices = [
	{
		title: "Emergency Services",
		description: "Police, Fire, and Medical emergency contacts",
		icon: Shield,
		phone: "911",
		nonEmergency: "(704) 546-2340",
	},
	{
		title: "Town Hall",
		description: "General inquiries and town services",
		icon: Home,
		phone: "(704) 546-2339",
		hours: "Mon-Fri 8:00 AM - 5:00 PM",
	},
	{
		title: "Public Works",
		description: "Water, sewer, and road maintenance",
		icon: Briefcase,
		phone: "(704) 546-2341",
		email: "publicworks@townofharmony.org",
	},
	{
		title: "Parks & Recreation",
		description: "Community programs and facilities",
		icon: Heart,
		phone: "(704) 546-2342",
		email: "recreation@townofharmony.org",
	},
];

const externalLinks = [
	{
		title: "Iredell County Government",
		description: "County services and information",
		url: "https://www.co.iredell.nc.us/",
		icon: Globe,
	},
	{
		title: "North Carolina State Government",
		description: "State resources and services",
		url: "https://www.nc.gov/",
		icon: Globe,
	},
	{
		title: "Iredell-Statesville Schools",
		description: "Local school district information",
		url: "https://www.iss.k12.nc.us/",
		icon: School,
	},
	{
		title: "Greater Statesville Chamber",
		description: "Business and economic development",
		url: "https://statesvillechamber.org/",
		icon: Briefcase,
	},
];

const residentResources = [
	{
		title: "Voter Registration",
		description: "Register to vote or update your registration",
		link: "/resources/voter-registration",
	},
	{
		title: "Utility Services",
		description: "Set up or manage utility accounts",
		link: "/resources/utilities",
	},
	{
		title: "Permits & Licenses",
		description: "Apply for building permits and business licenses",
		link: "/permits",
	},
	{
		title: "Property Tax Information",
		description: "View property tax rates and payment options",
		link: "/resources/property-tax",
	},
	{
		title: "Waste & Recycling",
		description: "Collection schedules and guidelines",
		link: "/resources/waste-recycling",
	},
	{
		title: "Community Calendar",
		description: "Events and activities in Harmony",
		link: "/events",
	},
];

const downloadableForms = [
	{
		category: "Building & Development",
		forms: [
			{ name: "Building Permit Application", file: "building-permit.pdf" },
			{ name: "Zoning Permit Application", file: "zoning-permit.pdf" },
			{ name: "Sign Permit Application", file: "sign-permit.pdf" },
			{ name: "Driveway Permit Application", file: "driveway-permit.pdf" },
		],
	},
	{
		category: "Business",
		forms: [
			{ name: "Business License Application", file: "business-license.pdf" },
			{ name: "Home Occupation Permit", file: "home-occupation.pdf" },
			{ name: "Special Event Permit", file: "special-event.pdf" },
			{ name: "Vendor Permit Application", file: "vendor-permit.pdf" },
		],
	},
	{
		category: "Utilities",
		forms: [
			{ name: "New Service Application", file: "new-service.pdf" },
			{ name: "Service Disconnection Request", file: "disconnect.pdf" },
			{ name: "Billing Dispute Form", file: "billing-dispute.pdf" },
			{ name: "Automatic Draft Authorization", file: "auto-draft.pdf" },
		],
	},
	{
		category: "Parks & Recreation",
		forms: [
			{ name: "Facility Rental Agreement", file: "facility-rental.pdf" },
			{ name: "Program Registration Form", file: "program-registration.pdf" },
			{ name: "Park Shelter Reservation", file: "shelter-reservation.pdf" },
			{ name: "Athletic Field Request", file: "field-request.pdf" },
		],
	},
];

export default function ResourcesPage() {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-16">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl md:text-5xl font-bold mb-4">Town Resources</h1>
					<p className="text-xl max-w-3xl">
						Access important information, documents, and services for residents and visitors of the Town of Harmony.
					</p>
				</div>
			</section>

			{/* Quick Contact Section */}
			<section className="bg-white border-b py-6">
				<div className="container mx-auto px-4">
					<div className="flex flex-wrap gap-6 justify-center">
						<div className="flex items-center gap-2">
							<Phone className="h-5 w-5 text-blue-600" />
							<span className="font-medium">Town Hall:</span>
							<a href="tel:704-546-2339" className="text-blue-600 hover:underline">
								(704) 546-2339
							</a>
						</div>
						<div className="flex items-center gap-2">
							<MapPin className="h-5 w-5 text-blue-600" />
							<span className="font-medium">Address:</span>
							<span>3389 Harmony Hwy, Harmony, NC 28634</span>
						</div>
						<div className="flex items-center gap-2">
							<Mail className="h-5 w-5 text-blue-600" />
							<a href="mailto:info@townofharmony.org" className="text-blue-600 hover:underline">
								info@townofharmony.org
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* Document Resources */}
			<section className="py-12">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold mb-8">Official Documents</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{documentResources.map((doc, index) => {
							const Icon = doc.icon;
							return (
								<Card key={index} className="hover:shadow-lg transition-shadow">
									<CardHeader>
										<Icon className="h-8 w-8 text-blue-600 mb-2" />
										<CardTitle className="text-lg">{doc.title}</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-sm text-gray-600 mb-4">{doc.description}</p>
										<Button variant="outline" className="w-full" asChild>
											<Link href={doc.link}>
												<Download className="mr-2 h-4 w-4" />
												View Document
											</Link>
										</Button>
									</CardContent>
								</Card>
							);
						})}
					</div>
				</div>
			</section>

			{/* Community Services */}
			<section className="py-12 bg-white">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold mb-8">Community Services</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{communityServices.map((service, index) => {
							const Icon = service.icon;
							return (
								<Card key={index}>
									<CardHeader>
										<Icon className="h-8 w-8 text-blue-600 mb-2" />
										<CardTitle className="text-lg">{service.title}</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-sm text-gray-600 mb-3">{service.description}</p>
										<div className="space-y-1 text-sm">
											{service.phone && (
												<div>
													<span className="font-medium">Phone: </span>
													<a href={`tel:${service.phone.replace(/[^0-9]/g, '')}`} className="text-blue-600 hover:underline">
														{service.phone}
													</a>
												</div>
											)}
											{service.nonEmergency && (
												<div>
													<span className="font-medium">Non-Emergency: </span>
													<a href={`tel:${service.nonEmergency.replace(/[^0-9]/g, '')}`} className="text-blue-600 hover:underline">
														{service.nonEmergency}
													</a>
												</div>
											)}
											{service.email && (
												<div>
													<span className="font-medium">Email: </span>
													<a href={`mailto:${service.email}`} className="text-blue-600 hover:underline text-xs">
														{service.email}
													</a>
												</div>
											)}
											{service.hours && (
												<div>
													<span className="font-medium">Hours: </span>
													<span className="text-gray-600">{service.hours}</span>
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

			{/* Resident Resources */}
			<section className="py-12">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold mb-8">Resident Resources</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{residentResources.map((resource, index) => (
							<Card key={index} className="hover:shadow-lg transition-shadow">
								<CardHeader>
									<CardTitle className="text-lg">{resource.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-gray-600 mb-4">{resource.description}</p>
									<Button variant="outline" className="w-full" asChild>
										<Link href={resource.link}>Learn More</Link>
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Downloadable Forms */}
			<section className="py-12 bg-gray-100">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold mb-8">Downloadable Forms</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{downloadableForms.map((category, index) => (
							<Card key={index}>
								<CardHeader>
									<CardTitle className="text-lg">{category.category}</CardTitle>
								</CardHeader>
								<CardContent>
									<ul className="space-y-2">
										{category.forms.map((form, formIndex) => (
											<li key={formIndex}>
												<a 
													href={`/forms/${form.file}`} 
													className="text-sm text-blue-600 hover:underline flex items-center gap-1"
													download
												>
													<Download className="h-3 w-3" />
													{form.name}
												</a>
											</li>
										))}
									</ul>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* External Links */}
			<section className="py-12 bg-white">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold mb-8">External Resources</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{externalLinks.map((link, index) => {
							const Icon = link.icon;
							return (
								<Card key={index}>
									<CardHeader>
										<Icon className="h-8 w-8 text-blue-600 mb-2" />
										<CardTitle className="text-lg">{link.title}</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-sm text-gray-600 mb-4">{link.description}</p>
										<Button variant="outline" className="w-full" asChild>
											<a href={link.url} target="_blank" rel="noopener noreferrer">
												Visit Website
												<Globe className="ml-2 h-4 w-4" />
											</a>
										</Button>
									</CardContent>
								</Card>
							);
						})}
					</div>
				</div>
			</section>

			{/* Help Section */}
			<section className="py-12 bg-blue-900 text-white">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-4">Need Additional Help?</h2>
					<p className="text-lg mb-6 max-w-2xl mx-auto">
						Can't find what you're looking for? Our staff is here to help you with any questions or concerns.
					</p>
					<div className="flex flex-wrap gap-4 justify-center">
						<Button size="lg" variant="secondary" asChild>
							<Link href="/contact">
								<Mail className="mr-2 h-5 w-5" />
								Contact Us
							</Link>
						</Button>
						<Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-blue-900" asChild>
							<a href="tel:704-546-2339">
								<Phone className="mr-2 h-5 w-5" />
								Call Town Hall
							</a>
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}