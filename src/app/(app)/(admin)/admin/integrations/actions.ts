"use server";

import { auth } from "@/server/auth";
import { isAdmin } from "@/server/services/admin-service";

/**
 * Server action to seed the CMS with initial data.
 * Payload CMS has been removed — this now returns an error.
 */
export async function seedCMSAction() {
	const session = await auth({ protect: true });

	if (!isAdmin({ email: session?.user?.email })) {
		throw new Error("Unauthorized");
	}

	return {
		success: false,
		message: "CMS seeding is no longer available. Content is now served from static data.",
	};
}

/**
 * Server action to check the configuration status of the CMS.
 * Payload CMS has been removed — returns not configured.
 */
export async function getCMSStatusAction() {
	const session = await auth({ protect: true });

	if (!isAdmin({ email: session?.user?.email })) {
		return { configured: false, message: "Unauthorized to check status." };
	}

	return {
		configured: false,
		message: "Payload CMS has been removed. Content is served from static data files.",
	};
}
