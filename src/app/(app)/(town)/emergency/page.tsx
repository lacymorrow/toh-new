import type { Metadata } from "next";
import { emergencyServices } from "@/data/town/emergency-services";

export const metadata: Metadata = {
	title: "Emergency Services | Town of Harmony",
	description:
		"Emergency contact numbers and preparedness information for the Town of Harmony, NC.",
};

export default function EmergencyPage() {
	const services = [...emergencyServices].sort(
		(a, b) => a.sortOrder - b.sortOrder,
	);

	return (
		<section className="py-12 bg-cream">
			<div className="container mx-auto px-4">
				<header className="mb-8">
					<h1 className="text-3xl md:text-4xl font-serif font-bold text-sage-dark">
						Emergency Services
					</h1>
					<p className="text-[#4A4640] mt-2">
						For life-threatening emergencies dial <strong>911</strong>.
					</p>
				</header>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{services.map((s) => (
						<div
							key={s.id}
							className="bg-white rounded-lg border border-stone p-5"
						>
							<h2 className="text-lg font-semibold text-[#2D2A24]">
								{s.title}
							</h2>
							<a
								href={`tel:${s.phone.replace(/[^0-9+]/g, "")}`}
								className="block text-2xl font-bold text-sage-dark mt-1"
							>
								{s.phone}
							</a>
							<p className="text-sm text-[#4A4640] mt-2">{s.description}</p>
							{s.preparedness.length > 0 && (
								<ul className="mt-3 space-y-1 list-disc list-inside text-sm text-[#4A4640]">
									{s.preparedness.map((p) => (
										<li key={p}>{p}</li>
									))}
								</ul>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
