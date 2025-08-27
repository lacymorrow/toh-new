import { eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EmergencyDetail } from "@/components/town/emergency/emergency-detail";
import { Button } from "@/components/ui/button";
import { db } from "@/server/db";
import { emergencyAlerts } from "@/server/db/schema-town";

interface PageProps {
	params: {
		id: string;
	};
}

async function getAlertForMetadata(id: number) {
	if (!db) return null;

	const alerts = await db
		.select({
			id: emergencyAlerts.id,
			title: emergencyAlerts.title,
			message: emergencyAlerts.message,
			level: emergencyAlerts.level,
		})
		.from(emergencyAlerts)
		.where(eq(emergencyAlerts.id, id))
		.limit(1);

	return alerts[0] || null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const alertId = Number.parseInt(params.id);

	if (isNaN(alertId)) {
		return {
			title: "Alert Not Found | Town of Harmony",
			description: "The requested emergency alert could not be found.",
		};
	}

	const alert = await getAlertForMetadata(alertId);

	if (!alert) {
		return {
			title: "Alert Not Found | Town of Harmony",
			description: "The requested emergency alert could not be found.",
		};
	}

	return {
		title: `${alert.title} | Emergency Alert | Town of Harmony`,
		description: alert.message.substring(0, 160) + (alert.message.length > 160 ? "..." : ""),
		keywords: [
			"emergency",
			"alert",
			alert.level,
			"Harmony",
			"West Virginia",
			"safety",
			"notification",
		],
	};
}

export default function EmergencyAlertDetailPage({ params }: PageProps) {
	const alertId = Number.parseInt(params.id);

	if (isNaN(alertId)) {
		notFound();
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="container mx-auto px-4 py-8">
				{/* Navigation */}
				<div className="flex items-center gap-4 mb-6">
					<Button asChild variant="outline" size="sm">
						<Link href="/emergency/alerts" className="flex items-center gap-2">
							<ArrowLeft className="h-4 w-4" />
							Back to Alerts
						</Link>
					</Button>

					<div className="text-sm text-gray-500">
						<Link href="/emergency" className="hover:underline">
							Emergency Info
						</Link>
						{" > "}
						<Link href="/emergency/alerts" className="hover:underline">
							Alerts
						</Link>
						{" > "}
						Alert Detail
					</div>
				</div>

				{/* Alert Detail */}
				<EmergencyDetail alertId={alertId} />

				{/* Footer Actions */}
				<div className="mt-12 bg-white border rounded-lg p-6">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="font-semibold text-gray-900 mb-1">Need Additional Help?</h3>
							<p className="text-sm text-gray-600">
								Contact emergency services or town administration for assistance.
							</p>
						</div>
						<div className="flex gap-3">
							<Button asChild variant="outline">
								<Link href="/emergency">View All Emergency Info</Link>
							</Button>
							<Button asChild>
								<a href="tel:911">Call 911</a>
							</Button>
						</div>
					</div>
				</div>

				{/* Related Links */}
				<div className="mt-8 text-center">
					<div className="flex justify-center gap-6 text-sm">
						<Link href="/emergency/alerts" className="text-blue-600 hover:underline">
							← All Alerts
						</Link>
						<Link href="/emergency" className="text-blue-600 hover:underline">
							Emergency Services
						</Link>
						<Link href="/emergency#contacts" className="text-blue-600 hover:underline">
							Contact Information
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
