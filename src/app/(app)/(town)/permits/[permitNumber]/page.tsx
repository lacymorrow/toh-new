import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PermitDetail } from "@/components/town/permits/permit-detail";
import { Button } from "@/components/ui/button";
import { getPermitByPermitNumber } from "@/server/services/permit-service";

export async function generateMetadata({ params }: { params: { permitNumber: string } }) {
	const result = await getPermitByPermitNumber(params.permitNumber);

	if (!result.success || !result.permit) {
		return {
			title: "Permit Not Found | Town of Harmony",
			description: "The requested permit could not be found",
		};
	}

	return {
		title: `${result.permit.type} - Permit #${result.permit.permitNumber} | Town of Harmony`,
		description: `View details for permit ${result.permit.permitNumber} - ${result.permit.type} application`,
	};
}

export default async function PermitDetailPage({ params }: { params: { permitNumber: string } }) {
	const result = await getPermitByPermitNumber(params.permitNumber);

	if (!result.success || !result.permit) {
		notFound();
	}

	return (
		<div className="container py-8">
			<div className="mb-6">
				<Button variant="ghost" size="sm" asChild className="mb-4">
					<Link href="/permits/status">
						<ArrowLeft className="h-4 w-4 mr-2" />
						Back to Status Search
					</Link>
				</Button>
			</div>

			<PermitDetail permit={result.permit} />
		</div>
	);
}
