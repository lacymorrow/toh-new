import { Facebook, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

const footerLinks = {
	"Agenda & Minutes": [
		{ name: "Town Meetings", href: "/meetings" },
		{ name: "Meeting Archives", href: "/meetings/archives" },
		{ name: "Public Records", href: "/meetings/records" },
	],
	Explore: [
		{ name: "Points of Interest", href: "/points-of-interest" },
		{ name: "Events", href: "/events" },
		{ name: "News", href: "/news" },
		{ name: "Photo Gallery", href: "/gallery" },
	],
	Town: [
		{ name: "Our Team", href: "/our-team" },
		{ name: "History", href: "/history" },
		{ name: "Resources", href: "/resources" },
		{ name: "Contact Us", href: "/contact" },
	],
};

export function TownFooter() {
	return (
		<footer className="bg-[#1E2118] text-white/60">
			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-10">
					{/* Town Info */}
					<div>
						<h3 className="text-xl font-serif font-bold text-white mb-2">Town of Harmony</h3>
						<p className="text-sm leading-relaxed mb-2">
							Where Harmony LIVES and SINGS! Serving our community since 1927.
						</p>
						<p className="text-sm leading-relaxed">
							3389 Harmony Hwy, Harmony, NC 28634
							<br />
							(704) 546-2339 &middot; info@townofharmony.org
						</p>

						{/* Social Media */}
						<div className="flex gap-3 mt-4">
							<a
								href="https://facebook.com/townofharmony"
								target="_blank"
								rel="noopener noreferrer"
								className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-sage transition-colors"
								aria-label="Facebook"
							>
								<Facebook className="h-4 w-4" />
							</a>
							<a
								href="https://twitter.com/harmonytown"
								target="_blank"
								rel="noopener noreferrer"
								className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-sage transition-colors"
								aria-label="Twitter"
							>
								<Twitter className="h-4 w-4" />
							</a>
							<a
								href="https://youtube.com/townofharmony"
								target="_blank"
								rel="noopener noreferrer"
								className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-sage transition-colors"
								aria-label="YouTube"
							>
								<Youtube className="h-4 w-4" />
							</a>
						</div>
					</div>

					{/* Footer Links */}
					{Object.entries(footerLinks).map(([category, links]) => (
						<div key={category}>
							<h4 className="text-[13px] text-white/85 uppercase tracking-[1.5px] font-bold mb-4">
								{category}
							</h4>
							<ul className="space-y-2">
								{links.map((link) => (
									<li key={link.name}>
										<Link
											href={link.href}
											className="text-sm text-white/60 hover:text-wheat transition-colors"
										>
											{link.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-white/[0.08] pt-6">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[13px]">
						<span>&copy; {new Date().getFullYear()} Town of Harmony. All rights reserved.</span>
						<div className="flex gap-5">
							<Link href="/privacy-policy" className="text-white/50 hover:text-wheat transition-colors">
								Privacy
							</Link>
							<Link href="/accessibility" className="text-white/50 hover:text-wheat transition-colors">
								Accessibility
							</Link>
							<Link href="/sitemap" className="text-white/50 hover:text-wheat transition-colors">
								Sitemap
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
