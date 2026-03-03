import type { Route } from "next";
import { siteConfig } from "./site-config";

type ParamValue = string | number | null;
export type RouteParams = Record<string, ParamValue>;

export interface RouteObject {
	path: Route;
	params?: RouteParams;
}

export const createRoute = (path: Route, params: RouteParams = {}): RouteObject => ({
	path,
	params,
});

// Flattened routes structure for better type safety and easier access
export const routes = {
	// Public routes
	home: "/",
	contact: "/contact",

	// Legal routes
	terms: "/terms-of-service",
	privacy: "/privacy-policy",
	eula: "/eula",
	legal: "/legal",

	// Town routes
	town: {
		agendaMinutes: "/agenda-minutes",
		business: "/business",
		elections: "/elections",
		emergency: "/emergency",
		events: "/events",
		history: "/history",
		meetings: "/meetings",
		news: "/news",
		ourTeam: "/our-team",
		permits: "/permits",
		pointsOfInterest: "/points-of-interest",
		resources: "/resources",
	},

	// Auth routes
	auth: {
		signIn: "/sign-in",
		signUp: "/sign-up",
		signOut: "/sign-out",
		forgotPassword: "/forgot-password",
		resetPassword: "/reset-password",
		signInPage: "/api/auth/signin",
		signOutPage: "/api/auth/signout",
		error: "/error",
	},

	// Admin routes
	admin: {
		index: "/admin",
		users: "/admin/users",
		github: "/admin/github",
		integrations: "/admin/integrations",
		feedback: "/admin/feedback",
		payments: "/admin/payments",
	},

	settings: {
		index: "/settings",
		account: "/settings/account",
		profile: "/settings/profile",
		appearance: "/settings/appearance",
		security: "/settings/security",
	},

	// External links
	external: {
		email: `mailto:${siteConfig.creator.email}`,
		github: siteConfig.repo.url,
	},
};

interface Redirect {
	source: Route;
	destination: Route;
	permanent: boolean;
}

/* eslint-disable-next-line @typescript-eslint/require-await */
export const redirects = async (): Promise<Redirect[]> => {
	return [
		...createRedirects(["/join", "/signup", "/sign-up"], routes.auth.signUp),
		...createRedirects(["/login", "/log-in", "/signin", "/sign-in"], routes.auth.signIn),
		...createRedirects(["/logout", "/log-out", "/signout", "/sign-out"], routes.auth.signOut),
	];
};

export const createRedirects = (
	sources: Route[],
	destination: Route,
	permanent = false
): Redirect[] => {
	if (!sources.length) return [];

	return sources
		.map((source) => {
			if (source === destination) return null;
			return { source, destination, permanent };
		})
		.filter((redirect): redirect is Redirect => redirect !== null);
};
