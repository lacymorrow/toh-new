"use client";

import { Calendar, Menu, Phone, Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const navigation = [
	{
		name: "Home",
		href: "/",
	},
	{
		name: "Agenda & Minutes",
		href: "/meetings",
		children: [
			{ name: "Town Meetings", href: "/meetings" },
			{ name: "Meeting Archives", href: "/meetings/archives" },
		],
	},
	{
		name: "Explore",
		href: "/explore",
		children: [
			{ name: "Points of Interest", href: "/points-of-interest" },
			{ name: "Events", href: "/events" },
			{ name: "News", href: "/news" },
		],
	},
	{
		name: "Town",
		href: "/town",
		children: [
			{ name: "Our Team", href: "/our-team" },
			{ name: "History", href: "/history" },
			{ name: "Resources", href: "/resources" },
		],
	},
	{
		name: "Contact",
		href: "/contact",
	},
];

export function TownHeader() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header>
			{/* Top bar - sage deep */}
			<div className="bg-sage-deep text-white/80">
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between py-2 text-[13px]">
						<div className="flex items-center gap-6">
							<a
								href="tel:704-546-2339"
								className="flex items-center gap-1 hover:text-white transition-colors"
							>
								<Phone className="h-3 w-3" />
								(704) 546-2339
							</a>
							<span className="hidden md:inline">3389 Harmony Hwy, Harmony, NC 28634</span>
						</div>
						<div className="flex items-center gap-4">
							<Link
								href="/events"
								className="flex items-center gap-1 hover:text-white transition-colors"
							>
								<Calendar className="h-3 w-3" />
								Events
							</Link>
							<Link href="/emergency" className="hover:text-white transition-colors">
								Emergency Info
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Main header */}
			<div className="bg-warm-white border-b border-[#DDD7CC] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between py-4">
						{/* Logo with shield */}
						<Link href="/" className="flex items-center gap-4">
							<div
								className="w-14 h-16 bg-sage-dark flex items-center justify-center text-wheat font-serif text-lg font-bold flex-shrink-0"
								style={{
									clipPath: "polygon(50% 0%, 100% 15%, 100% 85%, 50% 100%, 0% 85%, 0% 15%)",
								}}
							>
								TH
							</div>
							<div>
								<h1 className="text-2xl font-serif font-bold text-sage-dark">Town of Harmony</h1>
								<p className="text-xs text-[#7A756C] uppercase tracking-[1.5px] font-semibold">
									Iredell County, North Carolina
								</p>
							</div>
						</Link>

						{/* Desktop Navigation */}
						<nav className="hidden lg:flex items-center gap-1">
							<NavigationMenu>
								<NavigationMenuList>
									{navigation.map((item) => {
										if (item.children) {
											return (
												<NavigationMenuItem key={item.name}>
													<NavigationMenuTrigger className="bg-transparent text-[15px] font-medium text-[#4A4640] hover:text-sage-dark hover:bg-stone transition-colors rounded-md px-4 py-2">
														{item.name}
													</NavigationMenuTrigger>
													<NavigationMenuContent>
														<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
															{item.children.map((child) => (
																<li key={child.name}>
																	<NavigationMenuLink asChild>
																		<Link
																			href={child.href}
																			className={cn(
																				"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-stone hover:text-sage-dark focus:bg-stone focus:text-sage-dark"
																			)}
																		>
																			<div className="text-sm font-medium leading-none">
																				{child.name}
																			</div>
																		</Link>
																	</NavigationMenuLink>
																</li>
															))}
														</ul>
													</NavigationMenuContent>
												</NavigationMenuItem>
											);
										}
										return (
											<NavigationMenuItem key={item.name}>
												<NavigationMenuLink asChild>
													<Link
														href={item.href}
														className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-[15px] font-medium text-[#4A4640] transition-colors hover:bg-stone hover:text-sage-dark focus:bg-stone focus:text-sage-dark focus:outline-none"
													>
														{item.name}
													</Link>
												</NavigationMenuLink>
											</NavigationMenuItem>
										);
									})}
								</NavigationMenuList>
							</NavigationMenu>
						</nav>

						{/* Search and Mobile Menu */}
						<div className="flex items-center gap-2">
							<Button
								variant="ghost"
								size="icon"
								className="hidden md:flex hover:bg-stone hover:text-sage-dark"
							>
								<Search className="h-5 w-5" />
							</Button>

							<Button
								variant="ghost"
								size="icon"
								className="lg:hidden hover:bg-stone"
								onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							>
								{mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile Navigation */}
			{mobileMenuOpen && (
				<div className="lg:hidden border-t border-[#DDD7CC] bg-warm-white">
					<div className="container mx-auto px-4 py-2">
						{navigation.map((item) => (
							<div key={item.name}>
								<Link
									href={item.href}
									className="block py-2 text-[#2D2A24] hover:text-sage-dark transition-colors"
									onClick={() => setMobileMenuOpen(false)}
								>
									{item.name}
								</Link>
								{item.children && (
									<div className="ml-4">
										{item.children.map((child) => (
											<Link
												key={child.name}
												href={child.href}
												className="block py-1 text-sm text-[#7A756C] hover:text-sage-dark transition-colors"
												onClick={() => setMobileMenuOpen(false)}
											>
												{child.name}
											</Link>
										))}
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			)}
		</header>
	);
}
