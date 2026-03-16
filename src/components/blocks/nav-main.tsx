"use client";

import { Building2, Calendar, FileText, Home, type LucideIcon, Newspaper, Users } from "lucide-react";
import { Link } from "@/components/primitives/link";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { routes } from "@/config/routes";

interface NavItem {
	title: string;
	href: string;
	icon: LucideIcon;
}

const items: NavItem[] = [
	{ title: "Home", href: routes.home, icon: Home },
	{ title: "News", href: routes.town.news, icon: Newspaper },
	{ title: "Events", href: routes.town.events, icon: Calendar },
	{ title: "Meetings", href: routes.town.meetings, icon: FileText },
	{ title: "Our Team", href: routes.town.ourTeam, icon: Users },
	{ title: "Business Directory", href: routes.town.business, icon: Building2 },
];

export function NavMain() {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Town</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<SidebarMenuItem key={item.title}>
						<SidebarMenuButton asChild>
							<Link href={item.href}>
								<item.icon className="h-4 w-4" />
								<span>{item.title}</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
