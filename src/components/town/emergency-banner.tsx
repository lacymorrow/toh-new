import { and, desc, eq, gte, isNull, lte, or, sql } from "drizzle-orm";
import { AlertTriangle, X } from "lucide-react";
import Link from "next/link";
import { db } from "@/server/db";
import { emergencyAlerts } from "@/server/db/schema-town";

async function getActiveAlert() {
	if (!db) return null;

	const now = new Date();
	const alerts = await db
		.select()
		.from(emergencyAlerts)
		.where(
			and(
				eq(emergencyAlerts.isActive, true),
				or(isNull(emergencyAlerts.startsAt), lte(emergencyAlerts.startsAt, now)),
				or(isNull(emergencyAlerts.endsAt), gte(emergencyAlerts.endsAt, now))
			)
		)
		.orderBy(
			sql`CASE 
				WHEN ${emergencyAlerts.level} = 'critical' THEN 1 
				WHEN ${emergencyAlerts.level} = 'warning' THEN 2 
				ELSE 3 
			END`,
			desc(emergencyAlerts.createdAt)
		)
		.limit(1);

	return alerts[0] || null;
}

export async function EmergencyBanner() {
	const alert = await getActiveAlert();

	if (!alert) return null;

	const levelColors = {
		info: "bg-blue-600",
		warning: "bg-yellow-600",
		critical: "bg-red-600",
	};

	const bgColor = levelColors[alert.level] || "bg-blue-600";

	return (
		<div className={`${bgColor} text-white`}>
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between py-3">
					<div className="flex items-center gap-3 flex-1">
						<AlertTriangle className="h-5 w-5 flex-shrink-0" />
						<div className="flex-1">
							<strong className="font-semibold mr-2">{alert.title}:</strong>
							<span>{alert.message}</span>
							{alert.externalUrl && (
								<a
									href={alert.externalUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="ml-2 underline hover:no-underline"
								>
									Learn more
								</a>
							)}
							<Link
								href={`/emergency/alerts/${alert.id}`}
								className="ml-2 underline hover:no-underline"
							>
								View details
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
