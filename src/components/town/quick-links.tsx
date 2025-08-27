import {
	AlertCircle,
	Briefcase,
	Calendar,
	DollarSign,
	FileText,
	Home,
	Phone,
	Users,
} from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

const quickLinks = [
	{
		icon: FileText,
		title: "Permits & Forms",
		description: "Apply for permits and download forms",
		href: "/services/permits",
		color: "bg-blue-500",
	},
	{
		icon: DollarSign,
		title: "Pay Bills",
		description: "Pay utility bills and taxes online",
		href: "/services/pay-bill",
		color: "bg-green-500",
	},
	{
		icon: Calendar,
		title: "Events",
		description: "Community events and activities",
		href: "/events",
		color: "bg-purple-500",
	},
	{
		icon: AlertCircle,
		title: "Report an Issue",
		description: "Report problems or concerns",
		href: "/services/report",
		color: "bg-red-500",
	},
	{
		icon: Users,
		title: "Town Council",
		description: "Meeting schedules and agendas",
		href: "/government/council",
		color: "bg-indigo-500",
	},
	{
		icon: Briefcase,
		title: "Business Directory",
		description: "Find local businesses",
		href: "/business",
		color: "bg-orange-500",
	},
	{
		icon: Home,
		title: "Resident Resources",
		description: "Information for residents",
		href: "/residents",
		color: "bg-teal-500",
	},
	{
		icon: Phone,
		title: "Contact Us",
		description: "Get in touch with town offices",
		href: "/contact",
		color: "bg-pink-500",
	},
];

export function QuickLinks() {
	return (
		<section className="py-12 bg-white">
			<div className="container mx-auto px-4">
				<h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
					Quick Links & Services
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{quickLinks.map((link) => {
						const Icon = link.icon;
						return (
							<Link key={link.title} href={link.href}>
								<Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer h-full">
									<div className="flex flex-col items-center text-center">
										<div
											className={`w-12 h-12 ${link.color} rounded-lg flex items-center justify-center mb-3`}
										>
											<Icon className="h-6 w-6 text-white" />
										</div>
										<h3 className="font-semibold text-gray-900 mb-1">{link.title}</h3>
										<p className="text-sm text-gray-600">{link.description}</p>
									</div>
								</Card>
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
}
