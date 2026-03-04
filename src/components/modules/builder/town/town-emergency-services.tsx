"use client";

import {
	AlertCircle,
	AlertTriangle,
	Flame,
	Heart,
	Phone,
	Shield,
	ShieldAlert,
	Stethoscope,
	Wrench,
	Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useBuilderData } from "@/lib/builder-data";
import { emergencyServices } from "@/data/town/emergency-services";
import type { TownEmergencyService } from "@/data/town/types";

const iconMap: Record<string, LucideIcon> = {
	Phone,
	Flame,
	Shield,
	Zap,
	Wrench,
	AlertTriangle,
	AlertCircle,
	Stethoscope,
	ShieldAlert,
	Heart,
};

const categoryMeta: Record<
	string,
	{ label: string; color: string; bg: string; border: string }
> = {
	immediate: {
		label: "Immediate Emergency",
		color: "text-red-700",
		bg: "bg-red-50",
		border: "border-red-200",
	},
	"public-safety": {
		label: "Public Safety",
		color: "text-blue-700",
		bg: "bg-blue-50",
		border: "border-blue-200",
	},
	utility: {
		label: "Utility Emergency",
		color: "text-amber-700",
		bg: "bg-amber-50",
		border: "border-amber-200",
	},
	health: {
		label: "Health Services",
		color: "text-emerald-700",
		bg: "bg-emerald-50",
		border: "border-emerald-200",
	},
};

export const TownEmergencyServices = () => {
	const fallback = [...emergencyServices].sort((a, b) => a.sortOrder - b.sortOrder);
	const { data: services, loading } = useBuilderData<TownEmergencyService>(
		"town-emergency-service",
		{ sort: { "data.sortOrder": 1 }, limit: 50, fallback },
	);

	if (loading) {
		return (
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="text-center mb-10">
						<div className="h-8 w-64 bg-stone/50 rounded mx-auto mb-2 animate-pulse" />
						<div className="h-4 w-96 bg-stone/30 rounded mx-auto animate-pulse" />
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{Array.from({ length: 4 }).map((_, i) => (
							<div key={i} className="bg-warm-white rounded-xl border border-stone/30 p-6 animate-pulse">
								<div className="flex items-start gap-4">
									<div className="w-11 h-11 bg-stone/30 rounded-lg" />
									<div className="flex-1">
										<div className="h-5 w-40 bg-stone/40 rounded mb-2" />
										<div className="h-3 w-full bg-stone/20 rounded mb-1" />
										<div className="h-3 w-3/4 bg-stone/20 rounded" />
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		);
	}

	const grouped: Record<string, typeof services> = {};
	for (const service of services) {
		if (!grouped[service.category]) {
			grouped[service.category] = [];
		}
		grouped[service.category].push(service);
	}

	const categoryOrder = ["immediate", "public-safety", "utility", "health"];

	return (
		<section className="py-16">
			<div className="container mx-auto px-4">
				<div className="text-center mb-10">
					<h2 className="text-[32px] font-serif font-bold text-sage-dark mb-2">
						Emergency Services
					</h2>
					<p className="text-[#4A4640] text-base">
						Important contacts and preparedness information
					</p>
				</div>

				<div className="space-y-10">
					{categoryOrder.map((cat) => {
						const items = grouped[cat];
						if (!items || items.length === 0) return null;

						const meta = categoryMeta[cat] ?? {
							label: cat,
							color: "text-gray-700",
							bg: "bg-gray-50",
							border: "border-gray-200",
						};

						return (
							<div key={cat}>
								<div
									className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${meta.bg} ${meta.color} ${meta.border} border`}
								>
									{meta.label}
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{items.map((service) => {
										const Icon =
											iconMap[service.icon] ?? Phone;

										return (
											<div
												key={service.title}
												className={`bg-warm-white rounded-xl border ${meta.border} p-6 hover:shadow-md transition-shadow`}
											>
												<div className="flex items-start gap-4">
													<div
														className={`w-11 h-11 ${meta.bg} rounded-lg flex items-center justify-center flex-shrink-0`}
													>
														<Icon
															className={`h-5 w-5 ${meta.color}`}
														/>
													</div>

													<div className="flex-1 min-w-0">
														<h3 className="font-semibold text-[17px] text-[#2D2A24] mb-1">
															{service.title}
														</h3>
														<p className="text-sm text-[#4A4640] leading-relaxed mb-3">
															{
																service.description
															}
														</p>

														<a
															href={`tel:${service.phone.replace(/[^0-9+]/g, "")}`}
															className="inline-flex items-center gap-2 bg-sage-dark text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-sage-deep transition-colors"
														>
															<Phone className="h-3.5 w-3.5" />
															{service.phone}
														</a>

														{service.preparedness
															.length > 0 && (
															<div className="mt-4 pt-3 border-t border-[#DDD7CC]">
																<p className="text-xs font-semibold text-[#4A4640] uppercase tracking-wider mb-2">
																	Preparedness
																	Tips
																</p>
																<ul className="space-y-1">
																	{service.preparedness.map(
																		(
																			tip,
																		) => (
																			<li
																				key={
																					tip
																				}
																				className="text-sm text-[#4A4640] flex items-start gap-2"
																			>
																				<span className="text-sage mt-1 flex-shrink-0">
																					&bull;
																				</span>
																				{
																					tip
																				}
																			</li>
																		),
																	)}
																</ul>
															</div>
														)}
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};
