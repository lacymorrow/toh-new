import {
	AlertCircle,
	Briefcase,
	Calendar,
	FileText,
	Home,
	Phone,
	Star,
	Users,
} from "lucide-react";
import Link from "next/link";

const quickLinks = [
	{
		icon: FileText,
		title: "Permits & Forms",
		description: "Apply for permits and download forms",
		href: "/services/permits",
	},
	{
		icon: Calendar,
		title: "Events",
		description: "Community events and activities",
		href: "/events",
	},
	{
		icon: Users,
		title: "Town Council",
		description: "Meetings and agendas",
		href: "/government/council",
	},
	{
		icon: AlertCircle,
		title: "Report an Issue",
		description: "Report problems or concerns",
		href: "/services/report",
	},
	{
		icon: Briefcase,
		title: "Business Directory",
		description: "Find local businesses",
		href: "/business",
	},
	{
		icon: Home,
		title: "Resident Resources",
		description: "Information for residents",
		href: "/residents",
	},
	{
		icon: Phone,
		title: "Contact Us",
		description: "Reach town offices",
		href: "/contact",
	},
	{
		icon: Star,
		title: "Points of Interest",
		description: "Explore local landmarks",
		href: "/points-of-interest",
	},
];

export function QuickLinks() {
	return (
		<section className="py-16 bg-cream">
			<div className="container mx-auto px-4">
				<div className="text-center mb-10">
					<h2 className="text-[32px] font-serif font-bold text-sage-dark mb-2">
						Town Services
					</h2>
					<p className="text-[#4A4640] text-base">Find what you need quickly</p>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{quickLinks.map((link) => {
						const Icon = link.icon;
						return (
							<Link
								key={link.title}
								href={link.href}
								className="group flex items-start gap-4 bg-warm-white p-6 rounded-xl border border-[#DDD7CC] hover:border-sage-light hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
							>
								<div className="w-11 h-11 bg-stone rounded-[10px] flex items-center justify-center text-sage-dark flex-shrink-0 group-hover:bg-sage-dark group-hover:text-wheat transition-colors">
									<Icon className="h-5 w-5" />
								</div>
								<div>
									<h3 className="font-semibold text-base text-[#2D2A24] mb-1">{link.title}</h3>
									<p className="text-[13px] text-[#4A4640]">{link.description}</p>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
}
