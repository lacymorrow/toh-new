import { formatDistanceToNow } from "date-fns";
import {
	AlertCircle,
	Calendar,
	CheckCircle,
	Clock,
	DollarSign,
	FileText,
	MapPin,
	XCircle,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Permit } from "@/server/db/schema-town";

interface PermitCardProps {
	permit: Permit;
}

const statusColors: Record<string, string> = {
	pending: "bg-yellow-100 text-yellow-800",
	approved: "bg-green-100 text-green-800",
	denied: "bg-red-100 text-red-800",
	expired: "bg-stone text-[#2D2A24]",
};

const statusIcons: Record<string, React.ComponentType<{ className?: string }>> = {
	pending: Clock,
	approved: CheckCircle,
	denied: XCircle,
	expired: AlertCircle,
};

export function PermitCard({ permit }: PermitCardProps) {
	const StatusIcon = statusIcons[permit.status] || Clock;
	const formattedFee = permit.fee ? `$${(permit.fee / 100).toFixed(2)}` : "Free";

	return (
		<Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
			<CardHeader className="pb-3">
				<div className="flex justify-between items-start gap-2">
					<div className="flex-1">
						<Link
							href={`/permits/${permit.permitNumber}`}
							className="hover:text-sage-dark transition-colors"
						>
							<h3 className="font-semibold text-lg line-clamp-1">{permit.type}</h3>
						</Link>
						<p className="text-sm text-muted-foreground mt-1">#{permit.permitNumber}</p>
						<div className="flex items-center gap-2 mt-2">
							<Badge
								variant="secondary"
								className={statusColors[permit.status] || statusColors.pending}
							>
								<StatusIcon className="h-3 w-3 mr-1" />
								{permit.status}
							</Badge>
							{permit.isPaid && permit.fee && permit.fee > 0 && (
								<Badge variant="outline" className="text-green-700 border-green-200">
									Paid
								</Badge>
							)}
						</div>
					</div>
				</div>
			</CardHeader>

			<CardContent className="flex-1 flex flex-col justify-between">
				{permit.description && (
					<p className="text-sm text-muted-foreground line-clamp-2 mb-4">{permit.description}</p>
				)}

				<div className="space-y-2 text-sm">
					<div className="flex items-center gap-2">
						<FileText className="h-4 w-4 text-muted-foreground" />
						<span className="font-medium">{permit.applicantName}</span>
					</div>

					{permit.propertyAddress && (
						<div className="flex items-start gap-2">
							<MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
							<span className="line-clamp-2">{permit.propertyAddress}</span>
						</div>
					)}

					<div className="flex items-center gap-2">
						<Calendar className="h-4 w-4 text-muted-foreground" />
						<span>
							Submitted {formatDistanceToNow(new Date(permit.submittedAt), { addSuffix: true })}
						</span>
					</div>

					{permit.fee !== null && (
						<div className="flex items-center gap-2">
							<DollarSign className="h-4 w-4 text-muted-foreground" />
							<span>{formattedFee}</span>
						</div>
					)}

					{permit.approvedAt && (
						<div className="flex items-center gap-2">
							<CheckCircle className="h-4 w-4 text-green-600" />
							<span className="text-green-700">
								Approved {formatDistanceToNow(new Date(permit.approvedAt), { addSuffix: true })}
							</span>
						</div>
					)}

					{permit.expiresAt && (
						<div className="flex items-center gap-2">
							<AlertCircle className="h-4 w-4 text-orange-600" />
							<span className="text-orange-700">
								Expires {formatDistanceToNow(new Date(permit.expiresAt), { addSuffix: true })}
							</span>
						</div>
					)}
				</div>

				{permit.documents && permit.documents.length > 0 && (
					<div className="mt-4">
						<Badge variant="outline" className="text-xs">
							{permit.documents.length} document{permit.documents.length !== 1 ? "s" : ""}
						</Badge>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
