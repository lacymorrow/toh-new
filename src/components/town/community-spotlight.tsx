import Link from "next/link";

export function CommunitySpotlight() {
	return (
		<section className="py-16 bg-cream">
			<div className="container mx-auto px-4">
				<div className="bg-warm-white rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-[#DDD7CC]">
					{/* Image area */}
					<div className="bg-gradient-to-br from-sage-dark to-sage min-h-[320px] flex items-center justify-center">
						<span className="font-serif text-[56px] text-wheat italic opacity-50">&ldquo;H&rdquo;</span>
					</div>

					{/* Content */}
					<div className="p-12 flex flex-col justify-center">
						<div className="bg-sage/10 text-sage-dark px-3 py-1 rounded text-xs font-bold uppercase tracking-wider w-fit mb-4">
							Community Spotlight
						</div>
						<h3 className="text-2xl font-serif font-bold text-sage-dark mb-3">
							Harmony Heritage Trail
						</h3>
						<p className="text-base text-[#4A4640] leading-relaxed mb-5">
							Walk through history along our newly restored Heritage Trail, connecting nine landmarks that tell the story of Harmony from its founding in 1927 to today.
						</p>
						<Link
							href="/history"
							className="text-sage font-semibold text-[15px] hover:text-sage-dark hover:underline transition-colors cursor-pointer"
						>
							Learn More &rarr;
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
