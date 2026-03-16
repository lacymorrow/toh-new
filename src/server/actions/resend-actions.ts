"use server";

import { sendFeedbackEmail } from "@/server/services/resend-service";

export const sendFeedback = async (content: string): Promise<void> => {
	try {
		await sendFeedbackEmail(content);
	} catch (error) {
		console.error("Error in sendFeedback action:", error);
		throw error;
	}
};
