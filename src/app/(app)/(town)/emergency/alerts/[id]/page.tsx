import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { extractTextFromRichText } from "@/components/town/payload-rich-text";
import { EmergencyDetail } from "@/components/town/emergency/emergency-detail";
import { Button } from "@/components/ui/button";
import { getAnnouncementById } from "@/lib/payload/town-data";

interface PageProps {
	params: Promise<{
		id: string;
	}>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { id } = await params;
	const alertId = Number.parseInt(id);

	if (isNaN(alertId)) {
		return {
			title: "Alert Not Found | Town of Harmony",
			description: "The requested emergency alert could not be found.",
		};
	}

	const alert = await getAnnouncementById(alertId);

	if (!alert) {
		return {
			title: "Alert Not Found | Town of Harmony",
			description: "The requested emergency alert could not be found.",
		};
	}

	const messageText = extractTextFromRichText(alert.message as any);
	const description = messageText.substring(0, 160) + (messageText.length > 160 ? "..." : "");

	return {
		title: `${alert.title} | Emergency Alert | Town of Harmony`,
		description,
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

export default async function EmergencyAlertDetailPage({ params }: PageProps) {
	const { id } = await params;
	const alertId = Number.parseInt(id);

	if (isNaN(alertId)) {
		notFound();
	}

	return (
		<div className="min-h-screen bg-cream">
			<div className="container mx-auto px-4 py-8">
				{/* Navigation */}
				<div className="flex items-center gap-4 mb-6">
					<Button asChild variant="outline" size="sm">
						<Link href="/emergency/alerts" className="flex items-center gap-2">
							<ArrowLeft className="h-4 w-4" />
							Back to Alerts
						</Link>
					</Button>

					<div className="text-sm text-[#7A756C]">
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
							<h3 className="font-semibold text-[#2D2A24] mb-1">Need Additional Help?</h3>
							<p className="text-sm text-[#4A4640]">
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
						<Link href="/emergency/alerts" className="text-sage hover:underline">
							← All Alerts
						</Link>
						<Link href="/emergency" className="text-sage hover:underline">
							Emergency Services
						</Link>
						<Link href="/emergency#contacts" className="text-sage hover:underline">
							Contact Information
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
