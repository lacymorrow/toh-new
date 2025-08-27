import { AlertOctagon, AlertTriangle, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { EmergencyAlert as EmergencyAlertType } from "@/server/db/schema-town";

interface EmergencyAlertProps {
	alert: EmergencyAlertType;
	showDismiss?: boolean;
	onDismiss?: () => void;
	compact?: boolean;
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
			};
		case "warning":
			return {
				bg: "bg-yellow-50",
				border: "border-yellow-200",
				text: "text-yellow-800",
				icon: "text-yellow-600",
			};
		case "info":
		default:
			return {
				bg: "bg-blue-50",
				border: "border-blue-200",
				text: "text-blue-800",
				icon: "text-blue-600",
			};
	}
};

export const EmergencyAlert = ({
	alert,
	showDismiss = false,
	onDismiss,
	compact = false,
}: EmergencyAlertProps) => {
	const Icon = getLevelIcon(alert.level);
	const colors = getLevelColors(alert.level);

	return (
		<Card className={`${colors.bg} ${colors.border} border-2`}>
			<CardContent className={`${compact ? "p-3" : "p-4"}`}>
				<div className="flex items-start gap-3">
					<Icon className={`h-5 w-5 ${colors.icon} flex-shrink-0 mt-0.5`} />

					<div className="flex-1 min-w-0">
						<h3 className={`font-semibold ${colors.text} ${compact ? "text-sm" : "text-base"}`}>
							{alert.title}
						</h3>

						<p className={`${colors.text} ${compact ? "text-xs" : "text-sm"} mt-1`}>
							{alert.message}
						</p>

						{!compact && alert.instructions && (
							<div className={`mt-3 p-3 bg-white/50 rounded ${colors.text} text-sm`}>
								<strong>Instructions: </strong>
								{alert.instructions}
							</div>
						)}

						{!compact && alert.affectedAreas && alert.affectedAreas.length > 0 && (
							<div className="mt-2">
								<span className={`text-xs ${colors.text} opacity-75`}>
									Affected areas: {alert.affectedAreas.join(", ")}
								</span>
							</div>
						)}

						{alert.externalUrl && (
							<div className="mt-3">
								<a
									href={alert.externalUrl}
									target="_blank"
									rel="noopener noreferrer"
									className={`inline-flex items-center text-sm underline hover:no-underline ${colors.text} font-medium`}
								>
									Learn more
								</a>
							</div>
						)}

						{alert.contactInfo && (
							<div className="mt-3 text-xs text-gray-600">
								Contact:{" "}
								{typeof alert.contactInfo === "string"
									? alert.contactInfo
									: JSON.stringify(alert.contactInfo)}
							</div>
						)}

						<div className="mt-2 text-xs text-gray-500">
							{alert.startsAt && (
								<span>Active from {new Date(alert.startsAt).toLocaleString()}</span>
							)}
							{alert.endsAt && (
								<span>
									{alert.startsAt ? " until " : "Until "}
									{new Date(alert.endsAt).toLocaleString()}
								</span>
							)}
						</div>
					</div>

					{showDismiss && onDismiss && (
						<Button
							variant="ghost"
							size="sm"
							onClick={onDismiss}
							className={`h-6 w-6 p-0 ${colors.text} hover:bg-white/20`}
						>
							<X className="h-4 w-4" />
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
};
