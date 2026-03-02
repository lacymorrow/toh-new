import { ArrowLeft, FileText, Search } from "lucide-react";
import Link from "next/link";
import { PermitStatus } from "@/components/town/permits/permit-status";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
	title: "Check Permit Status | Town of Harmony",
	description: "Check the status of your permit application with the Town of Harmony",
};

export default function PermitStatusPage() {
	return (
		<div className="container py-8">
			<div className="mb-6">
				<Button variant="ghost" size="sm" asChild className="mb-4">
					<Link href="/permits">
						<ArrowLeft className="h-4 w-4 mr-2" />
						Back to Permits
					</Link>
				</Button>

				<div className="flex items-center gap-3 mb-4">
					<Search className="h-8 w-8 text-sage" />
					<h1 className="text-4xl font-bold">Check Permit Status</h1>
				</div>
				<p className="text-lg text-muted-foreground">
					Enter your permit number to check the current status of your application
				</p>
			</div>

			{/* Status Lookup */}
			<PermitStatus />

			{/* Help Section */}
			<div className="grid gap-6 md:grid-cols-2 mt-8">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<FileText className="h-5 w-5" />
							Permit Status Guide
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4 text-sm">
							<div>
								<div className="flex items-center gap-2 mb-1">
									<div className="w-3 h-3 rounded-full bg-yellow-500" />
									<span className="font-medium">Pending</span>
								</div>
								<p className="text-muted-foreground text-xs ml-5">
									Your application is being reviewed by city staff
								</p>
							</div>
							<div>
								<div className="flex items-center gap-2 mb-1">
									<div className="w-3 h-3 rounded-full bg-green-500" />
									<span className="font-medium">Approved</span>
								</div>
								<p className="text-muted-foreground text-xs ml-5">
									Your permit has been approved and is ready for use
								</p>
							</div>
							<div>
								<div className="flex items-center gap-2 mb-1">
									<div className="w-3 h-3 rounded-full bg-red-500" />
									<span className="font-medium">Denied</span>
								</div>
								<p className="text-muted-foreground text-xs ml-5">
									Your application has been denied. Check the notes for details
								</p>
							</div>
							<div>
								<div className="flex items-center gap-2 mb-1">
									<div className="w-3 h-3 rounded-full bg-[#7A756C]" />
									<span className="font-medium">Expired</span>
								</div>
								<p className="text-muted-foreground text-xs ml-5">
									This permit has expired and is no longer valid
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Having Trouble?</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<h4 className="font-medium text-sm">Can't find your permit number?</h4>
							<p className="text-sm text-muted-foreground">
								Your permit number was provided in the confirmation email when you submitted your
								application. It follows the format PERM-YYYY-XXXXXX.
							</p>
						</div>

						<div className="space-y-2">
							<h4 className="font-medium text-sm">Need to update your application?</h4>
							<p className="text-sm text-muted-foreground">
								Contact our permits office to make changes to your application or submit additional
								documents.
							</p>
						</div>

						<div className="pt-4 border-t">
							<h4 className="font-medium text-sm mb-2">Contact Information</h4>
							<div className="space-y-1 text-sm text-muted-foreground">
								<p>📞 (123) 456-7890</p>
								<p>✉️ permits@townofharmony.gov</p>
								<p>🕒 Mon-Fri 8AM-5PM, Sat 9AM-1PM</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Quick Actions */}
			<div className="flex gap-4 mt-8 justify-center">
				<Button asChild variant="outline">
					<Link href="/permits">View All Permit Types</Link>
				</Button>
				<Button asChild>
					<Link href="/permits/apply">Apply for New Permit</Link>
				</Button>
			</div>
		</div>
	);
}
