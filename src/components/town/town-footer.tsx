import { Facebook, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
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
		{ name: "Emergency Services", href: "/emergency" },
	],
};

export function TownFooter() {
	return (
		<footer className="bg-gray-900 text-gray-300">
			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
					{/* Town Info */}
					<div className="lg:col-span-2">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
								TH
							</div>
							<div>
								<h3 className="text-xl font-bold text-white">Town of Harmony</h3>
								<p className="text-sm">North Carolina</p>
							</div>
						</div>
						<p className="text-sm mb-4">
							Where Harmony LIVES and SINGS! Serving our community with pride since 1927.
						</p>

						{/* Contact Info */}
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<MapPin className="h-4 w-4" />
								<span className="text-sm">3389 Harmony Hwy, Harmony, NC 28634</span>
							</div>
							<div className="flex items-center gap-2">
								<Phone className="h-4 w-4" />
								<a href="tel:704-546-2339" className="text-sm hover:text-white">
									(704) 546-2339
								</a>
							</div>
							<div className="flex items-center gap-2">
								<Mail className="h-4 w-4" />
								<a href="mailto:info@townofharmony.org" className="text-sm hover:text-white">
									info@townofharmony.org
								</a>
							</div>
						</div>

						{/* Social Media */}
						<div className="flex gap-3 mt-4">
							<a
								href="https://facebook.com/townofharmony"
								target="_blank"
								rel="noopener noreferrer"
								className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
							>
								<Facebook className="h-4 w-4" />
							</a>
							<a
								href="https://twitter.com/harmonytown"
								target="_blank"
								rel="noopener noreferrer"
								className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors"
							>
								<Twitter className="h-4 w-4" />
							</a>
							<a
								href="https://youtube.com/townofharmony"
								target="_blank"
								rel="noopener noreferrer"
								className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
							>
								<Youtube className="h-4 w-4" />
							</a>
						</div>
					</div>

					{/* Footer Links */}
					{Object.entries(footerLinks).map(([category, links]) => (
						<div key={category}>
							<h4 className="text-white font-semibold mb-3">{category}</h4>
							<ul className="space-y-2">
								{links.map((link) => (
									<li key={link.name}>
										<Link href={link.href} className="text-sm hover:text-white transition-colors">
											{link.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-gray-800 mt-8 pt-8">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<p className="text-sm text-center md:text-left">
							© {new Date().getFullYear()} Town of Harmony. All rights reserved.
						</p>
						<div className="flex gap-4 text-sm">
							<Link href="/privacy-policy" className="hover:text-white transition-colors">
								Privacy Policy
							</Link>
							<Link href="/terms-of-service" className="hover:text-white transition-colors">
								Terms of Service
							</Link>
							<Link href="/accessibility" className="hover:text-white transition-colors">
								Accessibility
							</Link>
							<Link href="/sitemap" className="hover:text-white transition-colors">
								Sitemap
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
