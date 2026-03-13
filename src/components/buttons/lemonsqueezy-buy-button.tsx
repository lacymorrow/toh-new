"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Placeholder buy button component (LemonSqueezy integration removed).
 */
export function BuyButton({ className }: { className?: string }) {
	return (
		<span className={cn(buttonVariants({ variant: "default" }), className)}>
			Buy Now
		</span>
	);
}
