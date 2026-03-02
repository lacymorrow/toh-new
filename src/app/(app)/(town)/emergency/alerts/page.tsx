import { AlertTriangle, ArrowLeft, Shield } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { EmergencyAlertsList } from "@/components/town/emergency/emergency-alerts-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
	title: "Emergency Alerts | Town of Harmony",
	description: "Current and past emergency alerts for the Town of Harmony, West Virginia.",
	keywords: [
		"emergency",
		"alerts",
		"notifications",
		"warnings",
		"safety",
		"Harmony",
		"West Virginia",
	],
};

export default function EmergencyAlertsPage() {
	return (
		<div className="min-h-screen bg-cream">
			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<div className="flex items-center gap-4 mb-6">
					<Button asChild variant="outline" size="sm">
						<Link href="/emergency" className="flex items-center gap-2">
							<ArrowLeft className="h-4 w-4" />
							Back to Emergency Info
						</Link>
					</Button>
				</div>

				<div className="bg-red-600 text-white rounded-lg p-6 mb-8">
					<div className="flex items-center gap-3 mb-4">
						<AlertTriangle className="h-8 w-8" />
						<h1 className="text-3xl font-bold">Emergency Alerts</h1>
					</div>
					<p className="text-red-100 text-lg">
						Current and past emergency alerts issued by the Town of Harmony.
					</p>
				</div>

				{/* Emergency Reminder */}
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

				{/* Alert Filtering Options */}
				<div className="bg-white rounded-lg border p-4 mb-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<h2 className="font-semibold text-[#2D2A24]">All Emergency Alerts</h2>
							<span className="text-sm text-[#7A756C]">
								Showing all alerts (active and inactive)
							</span>
						</div>
						<div className="flex items-center gap-2">
							<Link href="/emergency" className="text-sm text-sage hover:underline">
								View Active Only
							</Link>
						</div>
					</div>
				</div>

				{/* Alerts List */}
				<Suspense
					fallback={
						<Card>
							<CardContent className="py-12">
								<div className="flex items-center justify-center">
									<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600" />
									<span className="ml-2">Loading emergency alerts...</span>
								</div>
							</CardContent>
						</Card>
					}
				>
					<EmergencyAlertsList showAll={true} />
				</Suspense>

				{/* Emergency Services Quick Access */}
				<div className="mt-12 bg-cream border border-sage/20 rounded-lg p-6">
					<h2 className="text-xl font-bold text-sage-dark mb-4 flex items-center gap-2">
						<Shield className="h-6 w-6" />
						Need Help?
					</h2>
					<div className="grid md:grid-cols-3 gap-4">
						<div className="bg-white rounded p-4">
							<h3 className="font-semibold text-red-800 mb-1">Emergency Services</h3>
							<p className="text-red-600 text-xl font-bold">911</p>
							<p className="text-xs text-[#4A4640]">Police, Fire, Medical</p>
						</div>
						<div className="bg-white rounded p-4">
							<h3 className="font-semibold text-sage-dark mb-1">Town Emergency</h3>
							<p className="text-sage text-xl font-bold">(304) 555-0100</p>
							<p className="text-xs text-[#4A4640]">Non-life threatening</p>
						</div>
						<div className="bg-white rounded p-4">
							<h3 className="font-semibold text-green-800 mb-1">Poison Control</h3>
							<p className="text-green-600 text-xl font-bold">1-800-222-1222</p>
							<p className="text-xs text-[#4A4640]">Poisoning emergencies</p>
						</div>
					</div>
				</div>

				{/* Footer Links */}
				<div className="mt-8 text-center space-y-2">
					<div className="flex justify-center gap-6 text-sm">
						<Link href="/emergency" className="text-sage hover:underline">
							Emergency Services
						</Link>
						<Link href="/emergency#contacts" className="text-sage hover:underline">
							Contact Information
						</Link>
						<Link href="/emergency#preparedness" className="text-sage hover:underline">
							Emergency Preparedness
						</Link>
					</div>
					<p className="text-xs text-[#7A756C]">
						Stay informed by following @HarmonyTownWV on social media or text HARMONY to 67283
					</p>
				</div>
			</div>
		</div>
	);
}
