import { AlertTriangle, Info, Phone, Shield } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { EmergencyAlertsList } from "@/components/town/emergency/emergency-alerts-list";
import { EmergencyContacts } from "@/components/town/emergency/emergency-contacts";
import { EmergencyServices } from "@/components/town/emergency/emergency-services";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
	title: "Emergency Information | Town of Harmony",
	description:
		"Emergency services, contacts, and active alerts for the Town of Harmony, West Virginia.",
	keywords: ["emergency", "alerts", "services", "contacts", "safety", "Harmony", "West Virginia"],
};

export default function EmergencyPage() {
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<div className="bg-red-600 text-white rounded-lg p-6 mb-8">
					<div className="flex items-center gap-3 mb-4">
						<AlertTriangle className="h-8 w-8" />
						<h1 className="text-3xl font-bold">Emergency Information</h1>
					</div>
					<p className="text-red-100 text-lg">
						Stay informed and prepared with official emergency information for the Town of Harmony.
					</p>
				</div>

				{/* Emergency Banner */}
				<div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
					<div className="flex items-center gap-2 mb-2">
						<AlertTriangle className="h-5 w-5 text-red-600" />
						<h2 className="font-bold text-red-800 text-lg">Life-Threatening Emergency: Call 911</h2>
					</div>
					<p className="text-red-700">
						For immediate emergency assistance requiring police, fire, or medical response, always
						dial <strong>911</strong> first.
					</p>
				</div>

				{/* Active Alerts Section */}
				<section className="mb-8">
					<h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
						<AlertTriangle className="h-6 w-6 text-red-600" />
						Active Emergency Alerts
					</h2>
					<Suspense
						fallback={
							<Card>
								<CardContent className="py-12">
									<div className="flex items-center justify-center">
										<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600" />
										<span className="ml-2">Loading active alerts...</span>
									</div>
								</CardContent>
							</Card>
						}
					>
						<EmergencyAlertsList activeOnly={true} limit={5} />
					</Suspense>
				</section>

				{/* Main Content Tabs */}
				<Tabs defaultValue="services" className="w-full">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="services" className="flex items-center gap-2">
							<Shield className="h-4 w-4" />
							Emergency Services
						</TabsTrigger>
						<TabsTrigger value="contacts" className="flex items-center gap-2">
							<Phone className="h-4 w-4" />
							Emergency Contacts
						</TabsTrigger>
						<TabsTrigger value="preparedness" className="flex items-center gap-2">
							<Info className="h-4 w-4" />
							Preparedness
						</TabsTrigger>
					</TabsList>

					<TabsContent value="services" className="mt-6">
						<EmergencyServices />
					</TabsContent>

					<TabsContent value="contacts" className="mt-6">
						<EmergencyContacts />
					</TabsContent>

					<TabsContent value="preparedness" className="mt-6">
						<div className="space-y-6">
							<Card>
								<CardContent className="p-6">
									<h3 className="text-xl font-bold text-gray-900 mb-4">
										🎒 Emergency Preparedness Kit
									</h3>
									<div className="grid md:grid-cols-2 gap-6">
										<div>
											<h4 className="font-semibold text-gray-800 mb-2">
												Basic Supplies (72-hour kit):
											</h4>
											<ul className="space-y-1 text-sm text-gray-700">
												<li>• Water (1 gallon per person per day)</li>
												<li>• Non-perishable food</li>
												<li>• Battery-powered or hand crank radio</li>
												<li>• Flashlights and extra batteries</li>
												<li>• First aid kit</li>
												<li>• Cell phone with chargers</li>
												<li>• Cash and credit cards</li>
												<li>• Emergency contact information</li>
											</ul>
										</div>
										<div>
											<h4 className="font-semibold text-gray-800 mb-2">Additional Items:</h4>
											<ul className="space-y-1 text-sm text-gray-700">
												<li>• Prescription medications</li>
												<li>• Blankets and clothing</li>
												<li>• Important documents (copies)</li>
												<li>• Fire extinguisher</li>
												<li>• Matches in waterproof container</li>
												<li>• Personal hygiene items</li>
												<li>• Tools and supplies (wrench, duct tape)</li>
												<li>• Pet supplies if needed</li>
											</ul>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardContent className="p-6">
									<h3 className="text-xl font-bold text-gray-900 mb-4">🏠 Home Emergency Plan</h3>
									<div className="space-y-4 text-sm text-gray-700">
										<div>
											<h4 className="font-semibold text-gray-800 mb-2">
												Create a Family Communication Plan:
											</h4>
											<ul className="space-y-1">
												<li>• Identify an out-of-area contact person</li>
												<li>• Choose two meeting places (near home and outside neighborhood)</li>
												<li>• Learn important telephone numbers by heart</li>
												<li>• Keep contact information updated</li>
											</ul>
										</div>
										<div>
											<h4 className="font-semibold text-gray-800 mb-2">Know Your Home:</h4>
											<ul className="space-y-1">
												<li>• Locate main water shut-off valve</li>
												<li>• Know how to turn off gas at meter</li>
												<li>• Identify electrical panel location</li>
												<li>• Plan evacuation routes from each room</li>
											</ul>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardContent className="p-6">
									<h3 className="text-xl font-bold text-gray-900 mb-4">⛈️ Weather Preparedness</h3>
									<div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
										<div>
											<h4 className="font-semibold text-gray-800 mb-2">Severe Thunderstorms:</h4>
											<ul className="space-y-1">
												<li>• Move to interior room on lowest floor</li>
												<li>• Stay away from windows</li>
												<li>• Unplug electrical appliances</li>
												<li>• Avoid using landline phones</li>
											</ul>

											<h4 className="font-semibold text-gray-800 mb-2 mt-4">Winter Storms:</h4>
											<ul className="space-y-1">
												<li>• Insulate pipes to prevent freezing</li>
												<li>• Keep alternate heating source available</li>
												<li>• Stock up on food before storms</li>
												<li>• Keep car emergency kit updated</li>
											</ul>
										</div>
										<div>
											<h4 className="font-semibold text-gray-800 mb-2">Flooding:</h4>
											<ul className="space-y-1">
												<li>• Never drive through flooded roads</li>
												<li>• Move to higher ground immediately</li>
												<li>• Turn off utilities if instructed</li>
												<li>• Monitor emergency broadcasts</li>
											</ul>

											<h4 className="font-semibold text-gray-800 mb-2 mt-4">Power Outages:</h4>
											<ul className="space-y-1">
												<li>• Use flashlights, not candles</li>
												<li>• Keep refrigerator and freezer closed</li>
												<li>• Use generators outside only</li>
												<li>• Check on neighbors, especially elderly</li>
											</ul>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className="bg-blue-50 border-blue-200">
								<CardContent className="p-6">
									<h3 className="text-xl font-bold text-blue-800 mb-4">📱 Stay Connected</h3>
									<div className="grid md:grid-cols-2 gap-6 text-sm text-blue-700">
										<div>
											<h4 className="font-semibold mb-2">Alert Systems:</h4>
											<ul className="space-y-1">
												<li>• Text HARMONY to 67283 for alerts</li>
												<li>• Download FEMA app for warnings</li>
												<li>• Enable Wireless Emergency Alerts</li>
												<li>• Follow @HarmonyTownWV on social media</li>
											</ul>
										</div>
										<div>
											<h4 className="font-semibold mb-2">Local Information:</h4>
											<ul className="space-y-1">
												<li>• Website: harmonytown.gov/emergency</li>
												<li>• Radio: AM 1090 or FM 101.5</li>
												<li>• TV: Local news channels</li>
												<li>• NOAA Weather Radio: 162.550 MHz</li>
											</ul>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
