import { ArrowRight, CheckCircle, Clock, DollarSign, FileText, Plus, Search } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { PermitTypes } from "@/components/town/permits/permit-types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
	title: "Permits & Applications | Town of Harmony",
	description:
		"Apply for building permits, business licenses, and other permits in the Town of Harmony",
};

export default function PermitsPage({
	searchParams,
}: {
	searchParams: {
		category?: string;
	};
}) {
	return (
		<div className="container py-8">
			<div className="mb-8">
				<div className="flex items-center gap-3 mb-4">
					<FileText className="h-8 w-8 text-blue-600" />
					<h1 className="text-4xl font-bold">Permits & Applications</h1>
				</div>
				<p className="text-lg text-muted-foreground">
					Apply for permits online and track your application status
				</p>
			</div>

			{/* Quick Actions */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
				<Card className="hover:shadow-lg transition-shadow">
					<CardContent className="flex items-center gap-3 p-4">
						<div className="p-2 rounded-lg bg-blue-50 text-blue-600">
							<Plus className="h-5 w-5" />
						</div>
						<div className="flex-1">
							<h3 className="font-semibold text-sm">Apply for Permit</h3>
							<Button variant="link" className="p-0 h-auto text-xs" asChild>
								<Link href="/permits/apply">
									Start Application
									<ArrowRight className="h-3 w-3 ml-1" />
								</Link>
							</Button>
						</div>
					</CardContent>
				</Card>

				<Card className="hover:shadow-lg transition-shadow">
					<CardContent className="flex items-center gap-3 p-4">
						<div className="p-2 rounded-lg bg-green-50 text-green-600">
							<Search className="h-5 w-5" />
						</div>
						<div className="flex-1">
							<h3 className="font-semibold text-sm">Check Status</h3>
							<Button variant="link" className="p-0 h-auto text-xs" asChild>
								<Link href="/permits/status">
									Track Application
									<ArrowRight className="h-3 w-3 ml-1" />
								</Link>
							</Button>
						</div>
					</CardContent>
				</Card>

				<Card className="hover:shadow-lg transition-shadow">
					<CardContent className="flex items-center gap-3 p-4">
						<div className="p-2 rounded-lg bg-orange-50 text-orange-600">
							<FileText className="h-5 w-5" />
						</div>
						<div className="flex-1">
							<h3 className="font-semibold text-sm">Forms & Documents</h3>
							<Button variant="link" className="p-0 h-auto text-xs" asChild>
								<a href="/documents/permits" target="_blank" rel="noopener">
									Download Forms
									<ArrowRight className="h-3 w-3 ml-1" />
								</a>
							</Button>
						</div>
					</CardContent>
				</Card>

				<Card className="hover:shadow-lg transition-shadow">
					<CardContent className="flex items-center gap-3 p-4">
						<div className="p-2 rounded-lg bg-purple-50 text-purple-600">
							<Clock className="h-5 w-5" />
						</div>
						<div className="flex-1">
							<h3 className="font-semibold text-sm">Office Hours</h3>
							<p className="text-xs text-muted-foreground">Mon-Fri 8AM-5PM</p>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Process Overview */}
			<Card className="mb-8">
				<CardContent className="p-6">
					<h2 className="text-xl font-semibold mb-4">How It Works</h2>
					<div className="grid gap-6 md:grid-cols-4">
						<div className="flex items-start gap-3">
							<div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold">
								1
							</div>
							<div>
								<h3 className="font-medium text-sm mb-1">Choose Permit Type</h3>
								<p className="text-xs text-muted-foreground">
									Select the type of permit you need from the options below
								</p>
							</div>
						</div>
						<div className="flex items-start gap-3">
							<div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-semibold">
								2
							</div>
							<div>
								<h3 className="font-medium text-sm mb-1">Submit Application</h3>
								<p className="text-xs text-muted-foreground">
									Complete the online form and upload required documents
								</p>
							</div>
						</div>
						<div className="flex items-start gap-3">
							<div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-semibold">
								3
							</div>
							<div>
								<h3 className="font-medium text-sm mb-1">Review & Payment</h3>
								<p className="text-xs text-muted-foreground">
									We'll review your application and request payment if approved
								</p>
							</div>
						</div>
						<div className="flex items-start gap-3">
							<div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-semibold">
								4
							</div>
							<div>
								<h3 className="font-medium text-sm mb-1">Get Your Permit</h3>
								<p className="text-xs text-muted-foreground">
									Once approved and paid, your permit will be issued
								</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Filter Tabs */}
			<div className="flex gap-2 mb-6 border-b">
				<Button
					variant={!searchParams.category || searchParams.category === "all" ? "default" : "ghost"}
					size="sm"
					asChild
				>
					<Link href="/permits">All Permits</Link>
				</Button>
				<Button
					variant={searchParams.category === "construction" ? "default" : "ghost"}
					size="sm"
					asChild
				>
					<Link href="/permits?category=construction">Construction</Link>
				</Button>
				<Button
					variant={searchParams.category === "utilities" ? "default" : "ghost"}
					size="sm"
					asChild
				>
					<Link href="/permits?category=utilities">Utilities</Link>
				</Button>
				<Button
					variant={searchParams.category === "property" ? "default" : "ghost"}
					size="sm"
					asChild
				>
					<Link href="/permits?category=property">Property</Link>
				</Button>
			</div>

			{/* Permit Types */}
			<Suspense fallback={<div>Loading permit types...</div>}>
				<PermitTypes category={searchParams.category} />
			</Suspense>

			{/* Contact Information */}
			<Card className="mt-8">
				<CardContent className="p-6">
					<h2 className="text-xl font-semibold mb-4">Need Help?</h2>
					<div className="grid gap-6 md:grid-cols-2">
						<div>
							<h3 className="font-medium mb-2">Contact the Permits Office</h3>
							<div className="space-y-1 text-sm text-muted-foreground">
								<p>📞 (123) 456-7890</p>
								<p>✉️ permits@townofharmony.gov</p>
								<p>🏢 123 Main Street, Harmony, WV 12345</p>
							</div>
						</div>
						<div>
							<h3 className="font-medium mb-2">Office Hours</h3>
							<div className="space-y-1 text-sm text-muted-foreground">
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
