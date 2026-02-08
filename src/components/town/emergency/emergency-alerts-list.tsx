import { AlertOctagon, AlertTriangle, Calendar, Info, MapPin } from "lucide-react";
import Link from "next/link";
import { extractTextFromRichText } from "@/components/town/payload-rich-text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAnnouncements } from "@/lib/payload/town-data";

interface EmergencyAlertsListProps {
	showAll?: boolean;
	limit?: number;
	activeOnly?: boolean;
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
			};
		case "warning":
			return {
				bg: "bg-yellow-50",
				border: "border-yellow-200",
				text: "text-yellow-800",
				icon: "text-yellow-600",
				badge: "bg-yellow-100 text-yellow-800",
			};
		case "info":
		default:
			return {
				bg: "bg-blue-50",
				border: "border-blue-200",
				text: "text-blue-800",
				icon: "text-blue-600",
				badge: "bg-blue-100 text-blue-800",
			};
	}
};

export async function EmergencyAlertsList({
	showAll = false,
	limit = 10,
	activeOnly = false,
}: EmergencyAlertsListProps) {
	const result = await getAnnouncements({
		limit: showAll ? 100 : limit,
		activeOnly,
	});

	const alerts = result.docs;

	if (alerts.length === 0) {
		return (
			<Card>
				<CardContent className="py-12 text-center">
					<div className="flex flex-col items-center gap-4">
						<Info className="h-12 w-12 text-gray-400" />
						<div>
							<h3 className="text-lg font-semibold text-gray-700 mb-2">No Emergency Alerts</h3>
							<p className="text-gray-500">
								{activeOnly
									? "There are currently no active emergency alerts."
									: "No emergency alerts have been issued."}
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="space-y-4">
			{alerts.map((alert) => {
				const Icon = getLevelIcon(alert.level);
				const colors = getLevelColors(alert.level);
				const isActive =
					alert.isActive &&
					(!alert.startsAt || new Date(alert.startsAt) <= new Date()) &&
					(!alert.endsAt || new Date(alert.endsAt) >= new Date());

				// Extract plain text from rich text message
				const messageText = extractTextFromRichText(alert.message as any);

				// Parse affectedAreas from JSON field
				const affectedAreas: string[] = Array.isArray(alert.affectedAreas)
					? (alert.affectedAreas as string[])
					: [];

				return (
					<Card
						key={alert.id}
						className={`hover:shadow-lg transition-shadow border-l-4 ${
							isActive
								? `${colors.border} ${colors.bg} border-l-current`
								: "border-gray-200 bg-gray-50 border-l-gray-400"
						}`}
					>
						<CardHeader className="pb-3">
							<div className="flex items-start justify-between gap-3">
								<div className="flex items-start gap-3 flex-1">
									<Icon className={`h-5 w-5 mt-0.5 ${isActive ? colors.icon : "text-gray-400"}`} />
									<div className="flex-1">
										<div className="flex items-center gap-2 mb-2">
											<CardTitle className={`text-lg ${isActive ? colors.text : "text-gray-600"}`}>
												{alert.title}
											</CardTitle>
											<span
												className={`px-2 py-1 rounded-full text-xs font-medium ${
													isActive ? colors.badge : "bg-gray-200 text-gray-600"
												}`}
											>
												{alert.level.toUpperCase()}
											</span>
											{isActive && (
												<span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
													ACTIVE
												</span>
											)}
										</div>
									</div>
								</div>
							</div>
						</CardHeader>

						<CardContent className="space-y-3">
							<p className={`text-sm ${isActive ? colors.text : "text-gray-600"}`}>
								{messageText}
							</p>

							{affectedAreas.length > 0 && (
								<div className="flex items-center gap-2 text-sm text-gray-600">
									<MapPin className="h-4 w-4" />
									<span>Affected areas: {affectedAreas.join(", ")}</span>
								</div>
							)}

							<div className="flex items-center justify-between pt-2 border-t">
								<div className="flex items-center gap-4 text-xs text-gray-500">
									<div className="flex items-center gap-1">
										<Calendar className="h-3 w-3" />
										<span>Issued {new Date(alert.createdAt).toLocaleString()}</span>
									</div>

									{alert.startsAt && (
										<span>Active from {new Date(alert.startsAt).toLocaleString()}</span>
									)}

									{alert.endsAt && <span>Until {new Date(alert.endsAt).toLocaleString()}</span>}
								</div>

								<Link
									href={`/emergency/alerts/${alert.id}`}
									className={`text-sm font-medium hover:underline ${
										isActive ? colors.text : "text-gray-600"
									}`}
								>
									View Details →
								</Link>
							</div>
						</CardContent>
					</Card>
				);
			})}

			{!showAll && alerts.length === limit && (
				<div className="text-center pt-4">
					<Link
						href="/emergency/alerts"
						className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
					>
						View All Emergency Alerts
						<Calendar className="h-4 w-4" />
					</Link>
				</div>
			)}
		</div>
	);
}
