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
	faq: "/faq",
	pricing: "/pricing",
	blog: "/blog",
	docs: "/docs",
	features: "/features",
	download: "/download",
	launch: "/launch",
	checkoutSuccess: "/checkout/success",

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
		map: "/map",
		meetings: "/meetings",
		news: "/news",
		ourTeam: "/our-team",
		pointsOfInterest: "/points-of-interest",
		resources: "/resources",
		sewer: "/sewer",
		sewerPayment: "/pay/sewer",
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

	// App routes (authenticated)
	app: {
		dashboard: "/",
		settings: "/settings",
		billing: "/settings/account",
		apiKeys: "/settings/api-keys",
		deployments: "/deployments",
		projects: "/projects",
		teams: "/teams",
		tools: "/tools",
	},

	// Demo routes (Shipkit feature demos — unused on TOH, stubs kept for build compatibility)
	demo: {
		payloadCms: "/cms",
		builderio: "/builder",
		trpc: "/trpc",
		network: "/network",
	},

	// Examples routes (used by search/demo components)
	examples: {
		dashboard: "/",
		index: "/",
		authentication: "/sign-in",
		forms: "/",
	},

	// CMS routes
	cms: {
		index: "/cms",
	},

	// Pages routes (Pages Router demos — unused on TOH)
	pages: {
		index: "/",
		dynamic: "/",
		markdown: "/",
	},

	// AI routes (Shipkit AI demo stubs — unused on TOH)
	ai: {
		index: "/",
		codeCompletion: "/",
		crossEncoder: "/",
		deepseekWeb: "/",
		florence: "/",
		gemma: "/",
		janusProWebgpu: "/",
		janusWebgpu: "/",
		llama: "/",
		moonshineWeb: "/",
		musicgenWeb: "/",
		phi: "/",
		removeBackground: "/",
		removeBackgroundWeb: "/",
		reportGen: "/",
		semanticImageSearchWeb: "/",
		semanticSearch: "/",
		smollmWeb: "/",
		smolvmWeb: "/",
		spam: "/",
		speecht: "/",
		textToSpeechWebgpu: "/",
		typeAhead: "/",
		videoBackgroundRemoval: "/",
		videoObjectDetection: "/",
		webgpuClip: "/",
		webgpuEmbeddingBenchmark: "/",
		webgpuNomicEmbed: "/",
		whisper: "/",
		whisperTimestamped: "/",
		zeroShotClassification: "/",
	},

	// API routes
	api: {
		docsSearch: "/api/docs/search",
		github: "/api/github",
		payments: "/api/payments",
		projects: "/api/projects",
		teams: "/api/teams",
	},

	// External links
	external: {
		email: `mailto:${siteConfig.creator.email}`,
		github: siteConfig.repo.url,
		bones: "https://github.com/shipkit-io/bones",
		buy: "https://shipkit.io/buy",
		discord: "https://discord.gg/shipkit",
		shipkit: "https://shipkit.io",
		x: "https://x.com/shipkit_io",
		x_follow: "https://x.com/shipkit_io",
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
