"use server";

import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { newsletterSubscribers } from "@/server/db/schema-town";

export async function subscribeToNewsletter(email: string) {
	if (!db) {
		return { success: false, error: "Database not available" };
	}

	if (!email || !email.includes("@")) {
		return { success: false, error: "Please provide a valid email address" };
	}

	try {
		// Check if already subscribed
		const existing = await db
			.select()
			.from(newsletterSubscribers)
			.where(eq(newsletterSubscribers.email, email.toLowerCase()))
			.limit(1);

		if (existing.length > 0) {
			const subscriber = existing[0];
			if (subscriber.isActive) {
				return { success: false, error: "This email is already subscribed" };
			}

			// Re-activate subscription
			await db
				.update(newsletterSubscribers)
				.set({ isActive: true, unsubscribedAt: null })
				.where(eq(newsletterSubscribers.email, email.toLowerCase()));

			return { success: true, message: "Welcome back! Your subscription has been reactivated." };
		}

		// Create new subscription
		await db.insert(newsletterSubscribers).values({
			email: email.toLowerCase(),
		});

		return { success: true, message: "You've been subscribed to our newsletter." };
	} catch (error) {
		console.error("Newsletter subscription error:", error);
		return { success: false, error: "Failed to subscribe. Please try again." };
	}
}

export async function unsubscribeFromNewsletter(email: string) {
	if (!db) {
		return { success: false, error: "Database not available" };
	}

	try {
		await db
			.update(newsletterSubscribers)
			.set({ isActive: false, unsubscribedAt: new Date() })
			.where(eq(newsletterSubscribers.email, email.toLowerCase()));

		return { success: true };
	} catch (error) {
		console.error("Newsletter unsubscribe error:", error);
		return { success: false, error: "Failed to unsubscribe. Please try again." };
	}
}
