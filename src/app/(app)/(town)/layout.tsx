import { EmergencyBanner } from "@/components/town/emergency-banner";
import { TownFooter } from "@/components/town/town-footer";
import { TownHeader } from "@/components/town/town-header";
import { fetchBuilderEntry } from "@/lib/builder-data-server";
import { settings as staticSettings, toTownSettings, type BuilderSettingsFlat } from "@/data/town/settings";

export default async function TownLayout({ children }: { children: React.ReactNode }) {
	const builderSettings = await fetchBuilderEntry<BuilderSettingsFlat>(
		"town-settings",
		{},
	);
	const settings = builderSettings ? toTownSettings(builderSettings) : staticSettings;

	return (
		<div className="min-h-screen flex flex-col">
			<TownHeader settings={settings} />
			<EmergencyBanner />
			<main id="main-content" className="flex-grow">{children}</main>
			<TownFooter settings={settings} />
		</div>
	);
}
