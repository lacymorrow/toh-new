import {
	AlertTriangle,
	Car,
	Droplets,
	Flame,
	Heart,
	Home,
	Shield,
	Thermometer,
	Wind,
	Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EmergencyService {
	title: string;
	description: string;
	phone: string;
	icon: typeof Shield;
	category: "immediate" | "utility" | "public-safety" | "health";
	preparedness?: string[];
}

const emergencyServices: EmergencyService[] = [
	{
		title: "Police Emergency",
		description:
			"Immediate law enforcement response for crimes in progress, accidents, and public safety threats.",
		phone: "911",
		icon: Shield,
		category: "immediate",
		preparedness: [
			"Keep doors and windows locked",
			"Report suspicious activity immediately",
			"Have emergency contact list readily available",
			"Know your exact address and nearest cross streets",
		],
	},
	{
		title: "Fire Emergency",
		description: "Fire suppression, rescue operations, and hazardous material incidents.",
		phone: "911",
		icon: Flame,
		category: "immediate",
		preparedness: [
			"Install smoke detectors and check batteries monthly",
			"Create and practice a family fire escape plan",
			"Keep fire extinguishers in key locations",
			"Clear vegetation and debris from around your home",
		],
	},
	{
		title: "Medical Emergency",
		description:
			"Emergency medical services, ambulance dispatch, and life-threatening health issues.",
		phone: "911",
		icon: Heart,
		category: "immediate",
		preparedness: [
			"Keep a first aid kit stocked and accessible",
			"Learn basic CPR and first aid",
			"Maintain list of medications and medical conditions",
			"Know locations of nearest hospitals",
		],
	},
	{
		title: "Power Outage",
		description: "Electrical emergencies, power line damage, and utility restoration services.",
		phone: "(304) 555-0400",
		icon: Zap,
		category: "utility",
		preparedness: [
			"Keep flashlights and batteries readily available",
			"Have a battery-powered or hand-crank radio",
			"Store non-perishable food and water",
			"Avoid downed power lines - assume they are energized",
		],
	},
	{
		title: "Water/Sewer Emergency",
		description: "Water main breaks, sewer backups, and water quality issues.",
		phone: "(304) 555-0200",
		icon: Droplets,
		category: "utility",
		preparedness: [
			"Know location of your water main shutoff",
			"Store 1 gallon of water per person per day for 3 days",
			"Keep basic plumbing tools and supplies",
			"Report water discoloration or unusual taste immediately",
		],
	},
	{
		title: "Hazardous Materials",
		description: "Chemical spills, gas leaks, and dangerous substance incidents.",
		phone: "911",
		icon: AlertTriangle,
		category: "immediate",
		preparedness: [
			"Evacuate immediately if you smell gas",
			"Don't use electrical switches near gas odors",
			"Keep windows and doors closed during chemical incidents",
			"Have masks or cloth available for breathing protection",
		],
	},
	{
		title: "Severe Weather",
		description: "Tornado warnings, severe storms, flooding, and weather-related emergencies.",
		phone: "(304) 555-0100",
		icon: Wind,
		category: "public-safety",
		preparedness: [
			"Have a NOAA Weather Radio with battery backup",
			"Identify safe rooms in your home for severe weather",
			"Keep emergency supplies in easily accessible location",
			"Sign up for community alert systems",
		],
	},
	{
		title: "Extreme Temperature",
		description: "Heat emergencies, cold weather advisories, and temperature-related health risks.",
		phone: "(304) 555-0100",
		icon: Thermometer,
		category: "health",
		preparedness: [
			"Check on elderly neighbors during extreme weather",
			"Dress appropriately for weather conditions",
			"Stay hydrated during heat waves",
			"Never leave children or pets in vehicles",
		],
	},
	{
		title: "Road Emergency",
		description: "Traffic accidents, road closures, and transportation emergencies.",
		phone: "911",
		icon: Car,
		category: "public-safety",
		preparedness: [
			"Keep emergency kit in your vehicle",
			"Maintain vehicle in good working condition",
			"Plan alternate routes for regular travel",
			"Keep cell phone charged when traveling",
		],
	},
	{
		title: "Structural Emergency",
		description: "Building collapses, gas leaks in buildings, and structural damage.",
		phone: "911",
		icon: Home,
		category: "immediate",
		preparedness: [
			"Know how to shut off gas, water, and electricity",
			"Secure heavy furniture and appliances",
			"Keep tools for emergency repairs accessible",
			"Evacuate immediately if you suspect structural damage",
		],
	},
];

const categoryColors = {
	immediate: "border-red-200 bg-red-50",
	utility: "border-yellow-200 bg-yellow-50",
	"public-safety": "border-blue-200 bg-blue-50",
	health: "border-green-200 bg-green-50",
};

const categoryTitles = {
	immediate: "Immediate Emergency Response",
	utility: "Utility Services",
	"public-safety": "Public Safety",
	health: "Health & Wellness",
};

export const EmergencyServices = () => {
	const groupedServices = emergencyServices.reduce(
		(acc, service) => {
			if (!acc[service.category]) {
				acc[service.category] = [];
			}
			acc[service.category].push(service);
			return acc;
		},
		{} as Record<string, EmergencyService[]>
	);

	return (
		<div className="space-y-8">
			{Object.entries(groupedServices).map(([category, services]) => (
				<div key={category}>
					<h2 className="text-2xl font-bold text-gray-900 mb-4">
						{categoryTitles[category as keyof typeof categoryTitles]}
					</h2>

					<div className="grid gap-4 md:grid-cols-2">
						{services.map((service, index) => {
							const Icon = service.icon;

							return (
								<Card
									key={index}
									className={`hover:shadow-lg transition-shadow border-2 ${categoryColors[service.category]}`}
								>
									<CardHeader className="pb-3">
										<div className="flex items-center gap-3">
											<Icon className="h-6 w-6 text-gray-700" />
											<CardTitle className="text-lg">{service.title}</CardTitle>
										</div>
									</CardHeader>

									<CardContent className="space-y-4">
										<p className="text-gray-700 text-sm">{service.description}</p>

										<div className="flex items-center gap-2">
											<span className="font-semibold text-gray-700">Emergency Phone:</span>
											<a
												href={`tel:${service.phone}`}
												className="text-red-600 font-bold text-lg hover:underline"
											>
												{service.phone}
											</a>
										</div>

										{service.preparedness && (
											<div className="pt-3 border-t">
												<h4 className="font-semibold text-gray-800 mb-2 text-sm">
													Preparedness Tips:
												</h4>
												<ul className="text-xs text-gray-600 space-y-1">
													{service.preparedness.map((tip, tipIndex) => (
														<li key={tipIndex} className="flex items-start gap-2">
															<span className="text-gray-400 mt-1">•</span>
															<span>{tip}</span>
														</li>
													))}
												</ul>
											</div>
										)}
									</CardContent>
								</Card>
							);
						})}
					</div>
				</div>
			))}

			<Card className="bg-orange-50 border-orange-200 border-2">
				<CardContent className="p-6">
					<h3 className="font-bold text-orange-800 mb-3 text-lg">
						📱 Stay Connected During Emergencies
					</h3>
					<div className="space-y-2 text-sm text-orange-700">
						<p>
							<strong>Text Alerts:</strong> Text HARMONY to 67283 for emergency notifications
						</p>
						<p>
							<strong>Social Media:</strong> Follow @HarmonyTownWV for real-time updates
						</p>
						<p>
							<strong>Local Radio:</strong> Tune to AM 1090 or FM 101.5 for emergency broadcasts
						</p>
						<p>
							<strong>Website:</strong> Visit harmonytown.gov/emergency for current information
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
