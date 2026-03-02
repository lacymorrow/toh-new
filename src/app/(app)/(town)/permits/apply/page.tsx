import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";
import { PermitApplicationForm } from "@/components/town/permits/permit-application-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
	title: "Apply for Permit | Town of Harmony",
	description: "Submit an online permit application for the Town of Harmony",
};

export default function PermitApplicationPage({
	searchParams,
}: {
	searchParams: {
		type?: string;
	};
}) {
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
					<FileText className="h-8 w-8 text-sage" />
					<h1 className="text-4xl font-bold">Apply for Permit</h1>
				</div>
				<p className="text-lg text-muted-foreground">
					Complete the form below to submit your permit application
				</p>
			</div>

			{/* Instructions */}
			<Card className="mb-8">
				<CardHeader>
					<CardTitle className="text-lg">Before You Start</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-3 text-sm">
						<p>Please have the following information ready:</p>
						<ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
							<li>Complete property address where work will be performed</li>
							<li>Detailed description of the proposed work or project</li>
							<li>Your contact information (name, phone, email)</li>
							<li>Supporting documents (plans, drawings, specifications) if applicable</li>
						</ul>
						<div className="bg-cream p-4 rounded-lg border border-sage/20 mt-4">
							<p className="text-sage-dark text-sm">
								<strong>Note:</strong> Applications are reviewed in the order they are received.
								Processing times vary by permit type. You will receive an email confirmation with
								your permit number once submitted.
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Application Form */}
			<PermitApplicationForm defaultType={searchParams.type} />

			{/* Additional Information */}
			<div className="grid gap-6 md:grid-cols-2 mt-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Required Documents</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-2 text-sm">
							<p className="font-medium">Common requirements may include:</p>
							<ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
								<li>Site plans or property surveys</li>
								<li>Construction drawings or blueprints</li>
								<li>Engineering reports (if applicable)</li>
								<li>Contractor license information</li>
								<li>Proof of insurance</li>
								<li>Material specifications</li>
							</ul>
							<p className="text-xs text-muted-foreground mt-3">
								Specific requirements vary by permit type. You can upload documents during the
								application process or submit them later if needed.
							</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Processing Times</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-3 text-sm">
							<div className="flex justify-between">
								<span>Simple permits:</span>
								<span className="text-muted-foreground">3-5 business days</span>
							</div>
							<div className="flex justify-between">
								<span>Standard permits:</span>
								<span className="text-muted-foreground">1-2 weeks</span>
							</div>
							<div className="flex justify-between">
								<span>Complex permits:</span>
								<span className="text-muted-foreground">2-4 weeks</span>
							</div>
							<div className="flex justify-between">
								<span>Major construction:</span>
								<span className="text-muted-foreground">4-8 weeks</span>
							</div>
							<p className="text-xs text-muted-foreground mt-3">
								Processing times are estimates and may vary based on application completeness and
								current workload.
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
