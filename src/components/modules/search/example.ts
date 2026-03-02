import { navigation } from "@/data/town/navigation";

export const docsConfig = {
	mainNav: navigation.mainNav.map((item) => ({
		title: item.name,
		href: item.href,
		external: false,
	})),
};
