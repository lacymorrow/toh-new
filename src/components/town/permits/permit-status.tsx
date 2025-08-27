"use client";

import { format, formatDistanceToNow } from "date-fns";
import {
	AlertCircle,
	Calendar,
	CheckCircle,
	Clock,
	DollarSign,
	FileText,
	Loader2,
	MapPin,
	Search,
	User,
	XCircle,
} from "lucide-react";
import React, { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getPermitByNumber } from "@/server/actions/permit-actions";
import type { Permit } from "@/server/db/schema-town";

const statusConfig = {
	pending: {
		icon: Clock,
		color: "bg-yellow-100 text-yellow-800",
		description: "Your application is being reviewed by city staff",
	},
	approved: {
		icon: CheckCircle,
		color: "bg-green-100 text-green-800",
		description: "Your permit has been approved and is ready for use",
	},
	denied: {
		icon: XCircle,
		color: "bg-red-100 text-red-800",
		description: "Your application has been denied. Check notes for details",
	},
	expired: {
		icon: AlertCircle,
		color: "bg-gray-100 text-gray-800",
		description: "This permit has expired and is no longer valid",
	},
};

export function PermitStatus() {
	const [permitNumber, setPermitNumber] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	const [permit, setPermit] = useState<Permit | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleSearch = async () => {
		if (!permitNumber.trim()) {
			setError("Please enter a permit number");
			return;
		}

		setIsSearching(true);
		setError(null);
		setPermit(null);

		try {
			const result = await getPermitByNumber(permitNumber.trim());

			if (result.success && result.permit) {
				setPermit(result.permit);
			} else {
				setError(result.error || "Permit not found");
			}
		} catch (error) {
			console.error("Error searching permit:", error);
			setError("An error occurred while searching. Please try again.");
		} finally {
			setIsSearching(false);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	return (
		<div className="max-w-2xl mx-auto space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Check Permit Status</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex gap-2">
						<div className="flex-1">
							<Label htmlFor="permit-number">Permit Number</Label>
							<Input
								id="permit-number"
								placeholder="Enter permit number (e.g., PERM-2024-001)"
								value={permitNumber}
								onChange={(e) => setPermitNumber(e.target.value)}
								onKeyPress={handleKeyPress}
							/>
						</div>
						<div className="flex items-end">
							<Button onClick={handleSearch} disabled={isSearching || !permitNumber.trim()}>
								{isSearching ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									<Search className="h-4 w-4" />
								)}
							</Button>
						</div>
					</div>

					{error && (
						<Alert className="border-red-200 bg-red-50">
							<AlertCircle className="h-4 w-4 text-red-600" />
							<AlertDescription className="text-red-800">{error}</AlertDescription>
						</Alert>
					)}
				</CardContent>
			</Card>

			{permit && (
				<Card>
					<CardHeader>
						<div className="flex justify-between items-start">
							<div>
								<CardTitle className="flex items-center gap-3">
									<FileText className="h-6 w-6" />
									{permit.type}
								</CardTitle>
								<p className="text-sm text-muted-foreground mt-1">Permit #{permit.permitNumber}</p>
							</div>
							<Badge variant="secondary" className={statusConfig[permit.status].color}>
								{React.createElement(statusConfig[permit.status].icon, {
									className: "h-3 w-3 mr-1",
								})}
								{permit.status.charAt(0).toUpperCase() + permit.status.slice(1)}
							</Badge>
						</div>
					</CardHeader>

					<CardContent className="space-y-6">
						<Alert>
							<AlertCircle className="h-4 w-4" />
							<AlertDescription>{statusConfig[permit.status].description}</AlertDescription>
						</Alert>

						<div className="grid gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<div className="flex items-center gap-2">
									<User className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm font-medium">Applicant:</span>
								</div>
								<p className="text-sm pl-6">{permit.applicantName}</p>
								{permit.applicantEmail && (
									<p className="text-sm pl-6 text-muted-foreground">{permit.applicantEmail}</p>
								)}
							</div>

							{permit.propertyAddress && (
								<div className="space-y-2">
									<div className="flex items-center gap-2">
										<MapPin className="h-4 w-4 text-muted-foreground" />
										<span className="text-sm font-medium">Property:</span>
									</div>
									<p className="text-sm pl-6">{permit.propertyAddress}</p>
								</div>
							)}
						</div>

						{permit.description && (
							<div className="space-y-2">
								<h4 className="text-sm font-medium">Project Description:</h4>
								<p className="text-sm text-muted-foreground">{permit.description}</p>
							</div>
						)}

						<div className="grid gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<div className="flex items-center gap-2">
									<Calendar className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm font-medium">Submitted:</span>
								</div>
								<p className="text-sm pl-6">
									{format(new Date(permit.submittedAt), "PPP")}
									<span className="text-muted-foreground ml-2">
										({formatDistanceToNow(new Date(permit.submittedAt), { addSuffix: true })})
									</span>
								</p>
							</div>

							{permit.fee !== null && (
								<div className="space-y-2">
									<div className="flex items-center gap-2">
										<DollarSign className="h-4 w-4 text-muted-foreground" />
										<span className="text-sm font-medium">Fee:</span>
									</div>
									<p className="text-sm pl-6">
										${(permit.fee / 100).toFixed(2)}
										{permit.isPaid && (
											<Badge variant="outline" className="ml-2 text-green-700 border-green-200">
												Paid
											</Badge>
										)}
										{!permit.isPaid && permit.fee > 0 && (
											<Badge variant="outline" className="ml-2 text-orange-700 border-orange-200">
												Unpaid
											</Badge>
										)}
									</p>
								</div>
							)}
						</div>

						{permit.reviewedAt && (
							<div className="space-y-2">
								<div className="flex items-center gap-2">
									<CheckCircle className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm font-medium">Reviewed:</span>
								</div>
								<p className="text-sm pl-6">
									{format(new Date(permit.reviewedAt), "PPP")}
									{permit.reviewedBy && (
										<span className="text-muted-foreground"> by {permit.reviewedBy}</span>
									)}
								</p>
							</div>
						)}

						{permit.approvedAt && (
							<div className="space-y-2">
								<div className="flex items-center gap-2">
									<CheckCircle className="h-4 w-4 text-green-600" />
									<span className="text-sm font-medium">Approved:</span>
								</div>
								<p className="text-sm pl-6 text-green-700">
									{format(new Date(permit.approvedAt), "PPP")}
								</p>
							</div>
						)}

						{permit.expiresAt && (
							<div className="space-y-2">
								<div className="flex items-center gap-2">
									<AlertCircle className="h-4 w-4 text-orange-600" />
									<span className="text-sm font-medium">Expires:</span>
								</div>
								<p className="text-sm pl-6 text-orange-700">
									{format(new Date(permit.expiresAt), "PPP")}
									<span className="text-muted-foreground ml-2">
										({formatDistanceToNow(new Date(permit.expiresAt), { addSuffix: true })})
									</span>
								</p>
							</div>
						)}

						{permit.notes && (
							<div className="space-y-2">
								<h4 className="text-sm font-medium">Notes:</h4>
								<div className="bg-muted/50 p-3 rounded text-sm">{permit.notes}</div>
							</div>
						)}

						{permit.documents && permit.documents.length > 0 && (
							<div className="space-y-2">
								<h4 className="text-sm font-medium">Documents:</h4>
								<div className="grid gap-2">
									{permit.documents.map((doc, index) => (
										<div key={index} className="flex items-center gap-2 text-sm">
											<FileText className="h-4 w-4 text-muted-foreground" />
											<a
												href={doc}
												target="_blank"
												rel="noopener noreferrer"
												className="text-blue-600 hover:underline"
											>
												Document {index + 1}
											</a>
										</div>
									))}
								</div>
							</div>
						)}
					</CardContent>
				</Card>
			)}
		</div>
	);
}
