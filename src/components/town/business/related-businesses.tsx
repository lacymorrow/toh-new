import { and, eq, ne } from "drizzle-orm";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/server/db";
import { businesses } from "@/server/db/schema-town";

interface RelatedBusinessesProps {
	currentBusinessId: number;
	category: string;
}

async function getRelatedBusinesses(currentId: number, category: string) {
	if (!db) return [];

	const related = await db
		.select()
		.from(businesses)
		.where(and(eq(businesses.category, category), ne(businesses.id, currentId)))
		.orderBy(businesses.name)
		.limit(5);

	return related;
}

export async function RelatedBusinesses({ currentBusinessId, category }: RelatedBusinessesProps) {
	const related = await getRelatedBusinesses(currentBusinessId, category);

	if (related.length === 0) {
		return null;
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Similar Businesses</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{related.map((business) => (
						<div key={business.id} className="pb-4 border-b last:border-0">
							<Link
								href={`/business/${business.slug}`}
								className="block hover:text-blue-600 transition-colors"
							>
								<h4 className="font-medium mb-1">{business.name}</h4>
								{business.description && (
									<p className="text-sm text-muted-foreground line-clamp-2 mb-2">
										{business.description}
									</p>
								)}
								{business.isVerified && (
									<Badge variant="outline" className="text-xs">
										Verified
									</Badge>
								)}
							</Link>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
