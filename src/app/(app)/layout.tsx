import type { Metadata } from "next";
import React from "react";

import { AppRouterLayout } from "@/components/layouts/app-router-layout";
import { Body } from "@/components/primitives/body";
import { initializePaymentProviders } from "@/server/providers";

export const metadata: Metadata = {
	metadataBase: new URL("https://www.townofharmony.org"),
	title: {
		template: "%s | Town of Harmony",
		default: "Town of Harmony - Your Community, Your Home",
	},
	description:
		"Welcome to the Town of Harmony official website. Find local news, events, services, and community information.",
	alternates: {
		canonical: "./",
	},
};

export const fetchCache = "default-cache";

await initializePaymentProviders();

export default async function Layout({
	children,
	...slots
}: {
	children: React.ReactNode;
	[key: string]: React.ReactNode;
}) {
	// Intercepting routes
	const resolvedSlots = (
		await Promise.all(
			Object.entries(slots).map(async ([key, slot]) => {
				const resolvedSlot = slot instanceof Promise ? await slot : slot;
				if (
					!resolvedSlot ||
					(typeof resolvedSlot === "object" && Object.keys(resolvedSlot).length === 0)
				) {
					return null;
				}
				return [key, resolvedSlot] as [string, React.ReactNode];
			})
		)
	).filter((item): item is [string, React.ReactNode] => item !== null);

	return (
		<html lang="en" suppressHydrationWarning>
			<Body>
				<AppRouterLayout>
					{children}

					{/* Dynamically render all available slots */}
					{resolvedSlots.map(([key, slot]) => (
						<React.Fragment key={`slot-${key}`}>{slot}</React.Fragment>
					))}
				</AppRouterLayout>
			</Body>
		</html>
	);
}
