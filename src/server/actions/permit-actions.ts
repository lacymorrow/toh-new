"use server";

import { z } from "zod";
import { createPermitApplication, getPermitByPermitNumber } from "@/server/services/permit-service";

const permitApplicationSchema = z.object({
	type: z.string().min(1, "Permit type is required"),
	applicantName: z.string().min(2, "Applicant name must be at least 2 characters"),
	applicantEmail: z.string().email("Please enter a valid email address"),
	applicantPhone: z.string().min(10, "Please enter a valid phone number"),
	propertyAddress: z.string().min(5, "Property address is required"),
	description: z.string().min(10, "Please provide a detailed description (at least 10 characters)"),
	documents: z.array(z.string()).optional(),
});

export const submitPermitApplication = async (input: z.infer<typeof permitApplicationSchema>) => {
	try {
		const validatedInput = permitApplicationSchema.parse(input);
		const result = await createPermitApplication(validatedInput);
		return result;
	} catch (error) {
		console.error("Error submitting permit application:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Failed to submit permit application",
		};
	}
};

export const getPermitByNumber = async (permitNumber: string) => {
	try {
		if (!permitNumber.trim()) {
			return {
				success: false,
				error: "Permit number is required",
			};
		}

		const result = await getPermitByPermitNumber(permitNumber.trim());
		return result;
	} catch (error) {
		console.error("Error getting permit by number:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Failed to get permit",
		};
	}
};
