import { Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getEmergencyServices } from "@/lib/payload/town-data";
import { resolveIcon } from "@/lib/utils/icon-resolver";

const categoryColors: Record<string, string> = {
	immediate: "border-red-200 bg-red-50",
	utility: "border-yellow-200 bg-yellow-50",
	"public-safety": "border-blue-200 bg-blue-50",
	health: "border-green-200 bg-green-50",
};

const categoryTitles: Record<string, string> = {
	immediate: "Immediate Emergency Response",
	utility: "Utility Services",
	"public-safety": "Public Safety",
	health: "Health & Wellness",
};

export const EmergencyServices = async () => {
	const services = await getEmergencyServices();

	if (services.length === 0) {
		return (
			<Card>
				<CardContent className="py-12 text-center">
					<div className="flex flex-col items-center gap-4">
						<Info className="h-12 w-12 text-gray-400" />
						<div>
							<h3 className="text-lg font-semibold text-gray-700 mb-2">No Emergency Services</h3>
							<p className="text-gray-500">Emergency services information is not available.</p>
						</div>
					</div>
				</CardContent>
			</Card>
		);
	}

	// Group services by category
	const groupedServices = services.reduce(
		(acc, service) => {
			const category = service.category || "immediate";
			if (!acc[category]) {
				acc[category] = [];
			}
			acc[category].push(service);
			return acc;
		},
		{} as Record<string, typeof services>
	);

	return (
		<div className="space-y-8">
			{Object.entries(groupedServices).map(([category, categoryServices]) => (
				<div key={category}>
					<h2 className="text-2xl font-bold text-gray-900 mb-4">
						{categoryTitles[category] || category}
					</h2>

					<div className="grid gap-4 md:grid-cols-2">
						{categoryServices.map((service) => {
							const Icon = resolveIcon(service.icon as string | null | undefined);
							const colorClass = categoryColors[category] || "border-gray-200 bg-gray-50";

							// Parse preparedness tips from JSON field
							const preparedness: string[] = Array.isArray(service.preparedness)
								? (service.preparedness as string[])
								: [];

							return (
								<Card
									key={service.id}
									className={`hover:shadow-lg transition-shadow border-2 ${colorClass}`}
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

										{preparedness.length > 0 && (
											<div className="pt-3 border-t">
												<h4 className="font-semibold text-gray-800 mb-2 text-sm">
													Preparedness Tips:
												</h4>
												<ul className="text-xs text-gray-600 space-y-1">
													{preparedness.map((tip, tipIndex) => (
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
						Stay Connected During Emergencies
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
