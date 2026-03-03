import { format, formatDistanceToNow } from "date-fns";
import {
	AlertCircle,
	Calendar,
	CheckCircle,
	Clock,
	DollarSign,
	Download,
	ExternalLink,
	FileText,
	Mail,
	MapPin,
	Phone,
	User,
	XCircle,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Permit } from "@/server/db/schema-town";

interface PermitDetailProps {
	permit: Permit;
}

const statusConfig = {
	pending: {
		icon: Clock,
		color: "bg-yellow-100 text-yellow-800",
		description: "This application is currently being reviewed by city staff",
	},
	approved: {
		icon: CheckCircle,
		color: "bg-green-100 text-green-800",
		description: "This permit has been approved and is ready for use",
	},
	denied: {
		icon: XCircle,
		color: "bg-red-100 text-red-800",
		description: "This application has been denied. See notes for details",
	},
	expired: {
		icon: AlertCircle,
		color: "bg-stone text-[#2D2A24]",
		description: "This permit has expired and is no longer valid",
	},
};

export function PermitDetail({ permit }: PermitDetailProps) {
	const StatusIcon = statusConfig[permit.status].icon;

	return (
		<div className="max-w-4xl mx-auto space-y-6">
			{/* Header */}
			<Card>
				<CardHeader>
					<div className="flex justify-between items-start">
						<div className="space-y-2">
							<CardTitle className="flex items-center gap-3 text-2xl">
								<FileText className="h-7 w-7" />
								{permit.type}
							</CardTitle>
							<div className="flex items-center gap-3">
								<p className="text-muted-foreground">Permit #{permit.permitNumber}</p>
								<Badge variant="secondary" className={statusConfig[permit.status].color}>
									<StatusIcon className="h-3 w-3 mr-1" />
									{permit.status.charAt(0).toUpperCase() + permit.status.slice(1)}
								</Badge>
								{permit.isPaid && permit.fee && permit.fee > 0 && (
									<Badge variant="outline" className="text-green-700 border-green-200">
										Paid
									</Badge>
								)}
							</div>
						</div>
						<div className="flex gap-2">
							<Button variant="outline" size="sm" asChild>
								<Link href="/permits/status">Check Another Permit</Link>
							</Button>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className="bg-muted/50 p-4 rounded-lg">
						<p className="text-sm">{statusConfig[permit.status].description}</p>
					</div>
				</CardContent>
			</Card>

			<div className="grid gap-6 lg:grid-cols-2">
				{/* Applicant Information */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<User className="h-5 w-5" />
							Applicant Information
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<label className="text-sm font-medium text-muted-foreground">Full Name</label>
							<p className="text-sm">{permit.applicantName}</p>
						</div>

						{permit.applicantEmail && (
							<div>
								<label className="text-sm font-medium text-muted-foreground">Email</label>
								<div className="flex items-center gap-2">
									<Mail className="h-4 w-4 text-muted-foreground" />
									<a
										href={`mailto:${permit.applicantEmail}`}
										className="text-sm text-sage hover:underline"
									>
										{permit.applicantEmail}
									</a>
								</div>
							</div>
						)}

						{permit.applicantPhone && (
							<div>
								<label className="text-sm font-medium text-muted-foreground">Phone</label>
								<div className="flex items-center gap-2">
									<Phone className="h-4 w-4 text-muted-foreground" />
									<a
										href={`tel:${permit.applicantPhone}`}
										className="text-sm text-sage hover:underline"
									>
										{permit.applicantPhone}
									</a>
								</div>
							</div>
						)}

						{permit.propertyAddress && (
							<div>
								<label className="text-sm font-medium text-muted-foreground">
									Property Address
								</label>
								<div className="flex items-start gap-2">
									<MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
									<p className="text-sm">{permit.propertyAddress}</p>
								</div>
							</div>
						)}
					</CardContent>
				</Card>

				{/* Application Timeline */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Calendar className="h-5 w-5" />
							Application Timeline
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-3">
							<div className="flex items-start gap-3">
								<div className="w-2 h-2 rounded-full bg-sage mt-2" />
								<div className="flex-1">
									<p className="text-sm font-medium">Submitted</p>
									<p className="text-xs text-muted-foreground">
										{format(new Date(permit.submittedAt), "PPP")}
									</p>
									<p className="text-xs text-muted-foreground">
										{formatDistanceToNow(new Date(permit.submittedAt), { addSuffix: true })}
									</p>
								</div>
							</div>

							{permit.reviewedAt && (
								<div className="flex items-start gap-3">
									<div className="w-2 h-2 rounded-full bg-orange-600 mt-2" />
									<div className="flex-1">
										<p className="text-sm font-medium">Reviewed</p>
										<p className="text-xs text-muted-foreground">
											{format(new Date(permit.reviewedAt), "PPP")}
											{permit.reviewedBy && ` by ${permit.reviewedBy}`}
										</p>
									</div>
								</div>
							)}

							{permit.approvedAt && (
								<div className="flex items-start gap-3">
									<div className="w-2 h-2 rounded-full bg-green-600 mt-2" />
									<div className="flex-1">
										<p className="text-sm font-medium">Approved</p>
										<p className="text-xs text-muted-foreground">
											{format(new Date(permit.approvedAt), "PPP")}
										</p>
									</div>
								</div>
							)}

							{permit.expiresAt && (
								<div className="flex items-start gap-3">
									<div className="w-2 h-2 rounded-full bg-red-600 mt-2" />
									<div className="flex-1">
										<p className="text-sm font-medium">
											{new Date(permit.expiresAt) > new Date() ? "Expires" : "Expired"}
										</p>
										<p className="text-xs text-muted-foreground">
											{format(new Date(permit.expiresAt), "PPP")}
										</p>
										<p className="text-xs text-muted-foreground">
											{formatDistanceToNow(new Date(permit.expiresAt), { addSuffix: true })}
										</p>
									</div>
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Project Details */}
			<Card>
				<CardHeader>
					<CardTitle>Project Details</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{permit.description && (
						<div>
							<label className="text-sm font-medium text-muted-foreground">Description</label>
							<p className="text-sm mt-1">{permit.description}</p>
						</div>
					)}

					{permit.fee !== null && (
						<div>
							<label className="text-sm font-medium text-muted-foreground">Permit Fee</label>
							<div className="flex items-center gap-2 mt-1">
								<DollarSign className="h-4 w-4 text-muted-foreground" />
								<span className="text-sm">
									{permit.fee === 0 ? "Free" : `$${(permit.fee / 100).toFixed(2)}`}
								</span>
								{permit.isPaid && permit.fee > 0 && (
									<Badge variant="outline" className="text-green-700 border-green-200">
										Paid
									</Badge>
								)}
								{!permit.isPaid && permit.fee > 0 && (
									<Badge variant="outline" className="text-orange-700 border-orange-200">
										Payment Required
									</Badge>
								)}
							</div>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Documents */}
			{permit.documents && permit.documents.length > 0 && (
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<FileText className="h-5 w-5" />
							Supporting Documents
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid gap-3 md:grid-cols-2">
							{permit.documents.map((doc, index) => (
								<div
									key={index}
									className="flex items-center justify-between p-3 border rounded-lg"
								>
									<div className="flex items-center gap-3">
										<FileText className="h-4 w-4 text-muted-foreground" />
										<span className="text-sm">Document {index + 1}</span>
									</div>
									<Button variant="outline" size="sm" asChild>
										<a
											href={doc}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-1"
										>
											<Download className="h-3 w-3" />
											View
											<ExternalLink className="h-3 w-3" />
										</a>
									</Button>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			)}

			{/* Notes */}
			{permit.notes && (
				<Card>
					<CardHeader>
						<CardTitle>Official Notes</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="bg-muted/50 p-4 rounded-lg">
							<p className="text-sm whitespace-pre-wrap">{permit.notes}</p>
						</div>
					</CardContent>
				</Card>
			)}

			{/* Actions */}
			<Card>
				<CardHeader>
					<CardTitle>Need Help?</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-2">
						<div className="space-y-2">
							<h4 className="font-medium text-sm">Contact Information</h4>
							<div className="text-sm space-y-1">
								<div className="flex items-center gap-2">
									<Phone className="h-4 w-4 text-muted-foreground" />
									<a href="tel:+1234567890" className="text-sage hover:underline">
										(123) 456-7890
									</a>
								</div>
								<div className="flex items-center gap-2">
									<Mail className="h-4 w-4 text-muted-foreground" />
									<a
										href="mailto:permits@townofharmony.gov"
										className="text-sage hover:underline"
									>
										permits@townofharmony.gov
									</a>
								</div>
							</div>
						</div>
						<div className="space-y-2">
							<h4 className="font-medium text-sm">Office Hours</h4>
							<div className="text-sm text-muted-foreground">
								<p>Monday - Friday: 8:00 AM - 5:00 PM</p>
								<p>Saturday: 9:00 AM - 1:00 PM</p>
								<p>Sunday: Closed</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
