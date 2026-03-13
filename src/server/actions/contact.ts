"use server";

import { siteConfig } from "@/config/site-config";
import { resend } from "@/lib/resend";
import { contactFormSchema } from "@/types/contact";

export async function submitContactForm(formData: FormData) {
	try {
		// Get form data
		const data = {
			name: formData.get("name"),
			contactInfo: formData.get("contactInfo"),
			message: formData.get("message"),

		};

		// Validate form data
		const validatedData = contactFormSchema.parse(data);

		if (!resend) {
			console.warn("Resend client not initialized - RESEND_API_KEY not set");
			return { success: false, error: "Email service not configured" };
		}

		// Send email
		const result = await resend.emails.send({
			from: `Contact Form <${siteConfig.email.noreply}>`,
			to: [siteConfig.email.support],
			subject: "New Contact Form Submission",
			replyTo: validatedData.contactInfo,
			html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>From:</strong> ${validatedData.name}</p>
                ${validatedData.contactInfo ? `<p><strong>Contact:</strong> ${validatedData.contactInfo}</p>` : ""}
                <p><strong>Message:</strong></p>
                <p>${validatedData.message.replace(/\n/g, "<br>")}</p>
            `,
		});

		return {
			success: true,
			data: result,
		};
	} catch (error) {
		console.error("Error submitting contact form:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Failed to send message",
		};
	}
}
