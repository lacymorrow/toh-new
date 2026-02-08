import {
	AlertOctagon,
	AlertTriangle,
	Calendar,
	Clock,
	ExternalLink,
	Info,
	MapPin,
	Phone,
} from "lucide-react";
import { notFound } from "next/navigation";
import { PayloadRichText } from "@/components/town/payload-rich-text";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAnnouncementById } from "@/lib/payload/town-data";

interface EmergencyDetailProps {
	alertId: number;
}

const getLevelIcon = (level: string) => {
	switch (level) {
		case "critical":
			return AlertOctagon;
		case "warning":
			return AlertTriangle;
		case "info":
		default:
			return Info;
	}
};

const getLevelColors = (level: string) => {
	switch (level) {
		case "critical":
			return {
				bg: "bg-red-50",
				border: "border-red-200",
				text: "text-red-800",
				icon: "text-red-600",
				badge: "bg-red-100 text-red-800",
				headerBg: "bg-red-600",
			};
		case "warning":
			return {
				bg: "bg-yellow-50",
				border: "border-yellow-200",
				text: "text-yellow-800",
				icon: "text-yellow-600",
				badge: "bg-yellow-100 text-yellow-800",
				headerBg: "bg-yellow-600",
			};
		case "info":
		default:
			return {
				bg: "bg-blue-50",
				border: "border-blue-200",
				text: "text-blue-800",
				icon: "text-blue-600",
				badge: "bg-blue-100 text-blue-800",
				headerBg: "bg-blue-600",
			};
	}
};

export async function EmergencyDetail({ alertId }: EmergencyDetailProps) {
	const alert = await getAnnouncementById(alertId);

	if (!alert) {
		notFound();
	}

	const Icon = getLevelIcon(alert.level);
	const colors = getLevelColors(alert.level);
	const isActive =
		alert.isActive &&
		(!alert.startsAt || new Date(alert.startsAt) <= new Date()) &&
		(!alert.endsAt || new Date(alert.endsAt) >= new Date());

	// Parse affectedAreas from JSON field
	const affectedAreas: string[] = Array.isArray(alert.affectedAreas)
		? (alert.affectedAreas as string[])
		: [];

	// contactInfo is a group { name, phone, email } in Payload
	const contactInfo = alert.contactInfo as { name?: string; phone?: string; email?: string } | null | undefined;
	const hasContactInfo = contactInfo && (contactInfo.name || contactInfo.phone || contactInfo.email);

	return (
		<div className="space-y-6">
			{/* Alert Header */}
			<Card className={`border-l-8 ${colors.border} ${colors.bg}`}>
				<CardHeader className="pb-4">
					<div className="flex items-start gap-4">
						<Icon className={`h-8 w-8 ${colors.icon} flex-shrink-0 mt-1`} />
						<div className="flex-1">
							<div className="flex items-center gap-3 mb-2">
								<span
									className={`px-3 py-1 rounded-full text-sm font-bold ${colors.badge} uppercase`}
								>
									{alert.level}
								</span>
								{isActive && (
									<span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-bold">
										ACTIVE
									</span>
								)}
								{!isActive && (
									<span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-bold">
										INACTIVE
									</span>
								)}
							</div>
							<CardTitle className={`text-2xl ${colors.text} mb-3`}>{alert.title}</CardTitle>
						</div>
					</div>
				</CardHeader>

				<CardContent>
					<div className={`text-lg ${colors.text} leading-relaxed`}>
						<PayloadRichText content={alert.message as any} className="prose prose-lg max-w-none" />
					</div>
				</CardContent>
			</Card>

			<div className="grid gap-6 lg:grid-cols-3">
				<div className="lg:col-span-2 space-y-6">
					{/* Instructions */}
					{alert.instructions && (
						<Card>
							<CardHeader>
								<CardTitle className="text-lg text-gray-900">Instructions & Actions</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="prose prose-sm max-w-none">
									<PayloadRichText content={alert.instructions as any} />
								</div>
							</CardContent>
						</Card>
					)}

					{/* External Link */}
					{alert.externalUrl && (
						<Card>
							<CardHeader>
								<CardTitle className="text-lg text-gray-900">Additional Information</CardTitle>
							</CardHeader>
							<CardContent>
								<Button asChild variant="outline" className="w-full">
									<a
										href={alert.externalUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2"
									>
										<ExternalLink className="h-4 w-4" />
										View External Resource
									</a>
								</Button>
							</CardContent>
						</Card>
					)}
				</div>

				<div className="space-y-6">
					{/* Alert Timeline */}
					<Card>
						<CardHeader>
							<CardTitle className="text-lg text-gray-900 flex items-center gap-2">
								<Clock className="h-5 w-5" />
								Alert Timeline
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<div className="flex items-center gap-3 text-sm">
								<Calendar className="h-4 w-4 text-gray-500" />
								<div>
									<div className="font-medium">Issued</div>
									<div className="text-gray-600">{new Date(alert.createdAt).toLocaleString()}</div>
								</div>
							</div>

							{alert.startsAt && (
								<div className="flex items-center gap-3 text-sm">
									<Clock className="h-4 w-4 text-green-500" />
									<div>
										<div className="font-medium">Active From</div>
										<div className="text-gray-600">{new Date(alert.startsAt).toLocaleString()}</div>
									</div>
								</div>
							)}

							{alert.endsAt && (
								<div className="flex items-center gap-3 text-sm">
									<Clock className="h-4 w-4 text-red-500" />
									<div>
										<div className="font-medium">Active Until</div>
										<div className="text-gray-600">{new Date(alert.endsAt).toLocaleString()}</div>
									</div>
								</div>
							)}

							{alert.updatedAt && alert.updatedAt !== alert.createdAt && (
								<div className="flex items-center gap-3 text-sm">
									<Clock className="h-4 w-4 text-blue-500" />
									<div>
										<div className="font-medium">Last Updated</div>
										<div className="text-gray-600">
											{new Date(alert.updatedAt).toLocaleString()}
										</div>
									</div>
								</div>
							)}
						</CardContent>
					</Card>

					{/* Affected Areas */}
					{affectedAreas.length > 0 && (
						<Card>
							<CardHeader>
								<CardTitle className="text-lg text-gray-900 flex items-center gap-2">
									<MapPin className="h-5 w-5" />
									Affected Areas
								</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="space-y-1">
									{affectedAreas.map((area, index) => (
										<li key={index} className="text-sm text-gray-700 flex items-center gap-2">
											<span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
											{area}
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
					)}

					{/* Contact Information */}
					{hasContactInfo && (
						<Card>
							<CardHeader>
								<CardTitle className="text-lg text-gray-900 flex items-center gap-2">
									<Phone className="h-5 w-5" />
									Emergency Contacts
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-sm text-gray-700 space-y-1">
									{contactInfo.name && <p className="font-medium">{contactInfo.name}</p>}
									{contactInfo.phone && (
										<p>
											Phone:{" "}
											<a href={`tel:${contactInfo.phone}`} className="text-blue-600 hover:underline">
												{contactInfo.phone}
											</a>
										</p>
									)}
									{contactInfo.email && (
										<p>
											Email:{" "}
											<a href={`mailto:${contactInfo.email}`} className="text-blue-600 hover:underline">
												{contactInfo.email}
											</a>
										</p>
									)}
								</div>
							</CardContent>
						</Card>
					)}

					{/* Emergency Contacts */}
					<Card className="bg-red-50 border-red-200">
						<CardHeader>
							<CardTitle className="text-lg text-red-800">Emergency Services</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">
							<div className="text-sm">
								<div className="font-semibold text-red-800">Emergency: 911</div>
								<div className="text-red-700">Police, Fire, Medical</div>
							</div>
							<div className="text-sm">
								<div className="font-semibold text-red-800">Town Emergency: (304) 555-0100</div>
								<div className="text-red-700">Non-life-threatening emergencies</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
