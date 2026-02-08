import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { getActiveAnnouncements } from "@/lib/payload/town-data";
import { extractTextFromRichText } from "@/components/town/payload-rich-text";

export async function EmergencyBanner() {
	const announcements = await getActiveAnnouncements();
	const alert = announcements[0];

	if (!alert) return null;

	const levelColors = {
		info: "bg-blue-600",
		warning: "bg-yellow-600",
		critical: "bg-red-600",
	};

	const bgColor = levelColors[alert.level as keyof typeof levelColors] || "bg-blue-600";
	const messageText = extractTextFromRichText(alert.message as any);

	return (
		<div className={`${bgColor} text-white`}>
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between py-3">
					<div className="flex items-center gap-3 flex-1">
						<AlertTriangle className="h-5 w-5 flex-shrink-0" />
						<div className="flex-1">
							<strong className="font-semibold mr-2">{alert.title}:</strong>
							<span>{messageText}</span>
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
