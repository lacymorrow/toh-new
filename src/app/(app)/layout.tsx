import type { Metadata } from "next";
import { EmergencyBanner } from "@/components/town/emergency-banner";
import { TownFooter } from "@/components/town/town-footer";
import { TownHeader } from "@/components/town/town-header";

export const metadata: Metadata = {
	title: {
		template: "%s | Town of Harmony",
		default: "Town of Harmony - Your Community, Your Home",
	},
	description:
		"Welcome to the Town of Harmony official website. Find local news, events, services, and community information.",
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen flex flex-col">
			<EmergencyBanner />
			<TownHeader />
			<main className="flex-grow">{children}</main>
			<TownFooter />
		</div>
	);
}
