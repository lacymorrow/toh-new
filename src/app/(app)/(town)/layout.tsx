import { EmergencyBanner } from "@/components/town/emergency-banner";
import { TownFooter } from "@/components/town/town-footer";
import { TownHeader } from "@/components/town/town-header";

export default function TownLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen flex flex-col">
			<EmergencyBanner />
			<TownHeader />
			<main className="flex-grow">{children}</main>
			<TownFooter />
		</div>
	);
}
