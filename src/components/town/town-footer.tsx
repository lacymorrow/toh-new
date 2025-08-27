import { Facebook, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

const footerLinks = {
	services: [
		{ name: "Pay Utility Bill", href: "/services/pay-bill" },
		{ name: "Report a Problem", href: "/services/report" },
		{ name: "Permits & Licenses", href: "/services/permits" },
		{ name: "Parks & Recreation", href: "/services/parks" },
		{ name: "Public Works", href: "/services/public-works" },
	],
	government: [
		{ name: "Town Council", href: "/government/council" },
		{ name: "Meeting Agendas", href: "/government/meetings" },
		{ name: "Town Code", href: "/government/code" },
		{ name: "Departments", href: "/government/departments" },
		{ name: "Employment", href: "/government/employment" },
	],
	community: [
		{ name: "News & Updates", href: "/news" },
		{ name: "Events Calendar", href: "/events" },
		{ name: "Business Directory", href: "/business" },
		{ name: "Town History", href: "/history" },
		{ name: "Photo Gallery", href: "/gallery" },
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
								<p className="text-sm">West Virginia</p>
							</div>
						</div>
						<p className="text-sm mb-4">
							Serving our community with pride since 1832. Your voice, your town, your future.
						</p>

						{/* Contact Info */}
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<MapPin className="h-4 w-4" />
								<span className="text-sm">123 Main Street, Harmony, WV 26394</span>
							</div>
							<div className="flex items-center gap-2">
								<Phone className="h-4 w-4" />
								<a href="tel:304-555-0100" className="text-sm hover:text-white">
									(304) 555-0100
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

					{/* Services Links */}
					<div>
						<h4 className="text-white font-semibold mb-3">Services</h4>
						<ul className="space-y-2">
							{footerLinks.services.map((link) => (
								<li key={link.name}>
									<Link href={link.href} className="text-sm hover:text-white transition-colors">
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Government Links */}
					<div>
						<h4 className="text-white font-semibold mb-3">Government</h4>
						<ul className="space-y-2">
							{footerLinks.government.map((link) => (
								<li key={link.name}>
									<Link href={link.href} className="text-sm hover:text-white transition-colors">
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Community Links */}
					<div>
						<h4 className="text-white font-semibold mb-3">Community</h4>
						<ul className="space-y-2">
							{footerLinks.community.map((link) => (
								<li key={link.name}>
									<Link href={link.href} className="text-sm hover:text-white transition-colors">
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
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
