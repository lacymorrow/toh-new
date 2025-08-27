"use client";

import { Calendar, ChevronDown, Menu, Phone, Search, X } from "lucide-react";
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
		name: "Government",
		href: "/government",
		children: [
			{ name: "Town Council", href: "/government/council" },
			{ name: "Departments", href: "/government/departments" },
			{ name: "Elections", href: "/government/elections" },
			{ name: "Town Meetings", href: "/government/meetings" },
			{ name: "Ordinances", href: "/government/ordinances" },
		],
	},
	{
		name: "Services",
		href: "/services",
		children: [
			{ name: "Permits & Applications", href: "/services/permits" },
			{ name: "Utility Services", href: "/services/utilities" },
			{ name: "Public Works", href: "/services/public-works" },
			{ name: "Parks & Recreation", href: "/services/parks" },
			{ name: "Emergency Services", href: "/emergency" },
		],
	},
	{
		name: "Community",
		href: "/community",
		children: [
			{ name: "News & Announcements", href: "/news" },
			{ name: "Events Calendar", href: "/events" },
			{ name: "Business Directory", href: "/business" },
			{ name: "History", href: "/history" },
			{ name: "Education", href: "/education" },
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
		<header className="bg-white shadow-sm border-b">
			{/* Top bar */}
			<div className="bg-blue-900 text-white">
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between py-2 text-sm">
						<div className="flex items-center gap-4">
							<a href="tel:304-555-0100" className="flex items-center gap-1 hover:underline">
								<Phone className="h-3 w-3" />
								(304) 555-0100
							</a>
							<span className="hidden md:inline">Mon-Fri 8:00 AM - 5:00 PM</span>
						</div>
						<div className="flex items-center gap-4">
							<Link href="/events" className="flex items-center gap-1 hover:underline">
								<Calendar className="h-3 w-3" />
								Events
							</Link>
							<Link href="/services/pay-bill" className="hover:underline">
								Pay Bill
							</Link>
							<Link href="/resident-portal" className="hover:underline">
								Resident Portal
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Main header */}
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between py-4">
					{/* Logo */}
					<Link href="/" className="flex items-center gap-3">
						<div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">
							TH
						</div>
						<div>
							<h1 className="text-xl font-bold text-gray-900">Town of Harmony</h1>
							<p className="text-xs text-gray-600">West Virginia</p>
						</div>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden lg:flex items-center gap-6">
						<NavigationMenu>
							<NavigationMenuList>
								{navigation.map((item) => {
									if (item.children) {
										return (
											<NavigationMenuItem key={item.name}>
												<NavigationMenuTrigger className="bg-transparent">
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
																			"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
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
													className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
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
						<Button variant="ghost" size="icon" className="hidden md:flex">
							<Search className="h-5 w-5" />
						</Button>

						{/* Mobile menu button */}
						<Button
							variant="ghost"
							size="icon"
							className="lg:hidden"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						>
							{mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
						</Button>
					</div>
				</div>
			</div>

			{/* Mobile Navigation */}
			{mobileMenuOpen && (
				<div className="lg:hidden border-t">
					<div className="container mx-auto px-4 py-2">
						{navigation.map((item) => (
							<div key={item.name}>
								<Link
									href={item.href}
									className="block py-2 text-gray-900 hover:text-blue-600"
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
												className="block py-1 text-sm text-gray-600 hover:text-blue-600"
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
