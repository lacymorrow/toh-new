import { and, eq } from "drizzle-orm";
import { db } from "@/server/db";
import type { NewPermit, Permit } from "@/server/db/schema-town";
import { permits } from "@/server/db/schema-town";

export interface CreatePermitApplicationInput {
	type: string;
	applicantName: string;
	applicantEmail: string;
	applicantPhone: string;
	propertyAddress: string;
	description: string;
	documents?: string[];
}

export interface PermitResult {
	success: boolean;
	error?: string;
	permit?: Permit;
	permitNumber?: string;
}

// Generate a unique permit number
const generatePermitNumber = (): string => {
	const year = new Date().getFullYear();
	const timestamp = Date.now().toString().slice(-6);
	const random = Math.random().toString(36).substring(2, 5).toUpperCase();
	return `PERM-${year}-${timestamp}${random}`;
};

// Determine permit fee based on type (in cents)
const getPermitFee = (type: string): number => {
	const feeMap: Record<string, number> = {
		building: 10000, // $100.00
		"residential-renovation": 5000, // $50.00
		electrical: 7500, // $75.00
		plumbing: 6000, // $60.00
		driveway: 2500, // $25.00
		"tree-removal": 1500, // $15.00
		fence: 3000, // $30.00
		demolition: 15000, // $150.00
	};

	return feeMap[type] || 5000; // Default $50.00 fee
};

export const createPermitApplication = async (
	input: CreatePermitApplicationInput
): Promise<PermitResult> => {
	try {
		if (!db) {
			return {
				success: false,
				error: "Database not available",
			};
		}

		// Validate input
		if (
			!input.type ||
			!input.applicantName ||
			!input.applicantEmail ||
			!input.applicantPhone ||
			!input.propertyAddress ||
			!input.description
		) {
			return {
				success: false,
				error: "All required fields must be provided",
			};
		}

		// Generate permit number
		const permitNumber = generatePermitNumber();

		// Determine fee
		const fee = getPermitFee(input.type);

		// Create permit application
		const newPermit: NewPermit = {
			permitNumber,
			type: input.type,
			applicantName: input.applicantName,
			applicantEmail: input.applicantEmail,
			applicantPhone: input.applicantPhone,
			propertyAddress: input.propertyAddress,
			description: input.description,
			documents: input.documents || [],
			status: "pending",
			fee,
			isPaid: false,
		};

		const [createdPermit] = await db.insert(permits).values(newPermit).returning();

		if (!createdPermit) {
			return {
				success: false,
				error: "Failed to create permit application",
			};
		}

		return {
			success: true,
			permit: createdPermit,
			permitNumber: createdPermit.permitNumber,
		};
	} catch (error) {
		console.error("Error creating permit application:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Failed to create permit application",
		};
	}
};

export const getPermitByPermitNumber = async (permitNumber: string): Promise<PermitResult> => {
	try {
		if (!db) {
			return {
				success: false,
				error: "Database not available",
			};
		}

		if (!permitNumber) {
			return {
				success: false,
				error: "Permit number is required",
			};
		}

		const permit = await db
			.select()
			.from(permits)
			.where(eq(permits.permitNumber, permitNumber))
			.limit(1);

		if (!permit || permit.length === 0) {
			return {
				success: false,
				error: `No permit found with number: ${permitNumber}`,
			};
		}

		return {
			success: true,
			permit: permit[0],
		};
	} catch (error) {
		console.error("Error getting permit by number:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Failed to get permit",
		};
	}
};

export const getAllPermits = async (options?: {
	limit?: number;
	offset?: number;
	status?: string;
	type?: string;
	applicantId?: string;
}) => {
	try {
		if (!db) {
			console.warn("Database not available, returning empty permits list");
			return [];
		}

		// Build query with filters
		const conditions = [];

		if (options?.status) {
			conditions.push(eq(permits.status, options.status as any));
		}

		if (options?.type) {
			conditions.push(eq(permits.type, options.type));
		}

		if (options?.applicantId) {
			conditions.push(eq(permits.applicantId, options.applicantId));
		}

		const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

		let query = db.select().from(permits).where(whereClause).$dynamic();

		// Add pagination
		if (options?.limit) {
			query = query.limit(options.limit);
		}

		if (options?.offset) {
			query = query.offset(options.offset);
		}

		const result = await query;
		return result;
	} catch (error) {
		console.error("Error getting permits:", error);
		throw new Error("Failed to get permits");
	}
};

export const updatePermitStatus = async (
	id: number,
	status: "pending" | "approved" | "denied" | "expired",
	options?: {
		reviewedBy?: string;
		notes?: string;
		approvedAt?: Date;
		expiresAt?: Date;
	}
): Promise<PermitResult> => {
	try {
		if (!db) {
			return {
				success: false,
				error: "Database not available",
			};
		}

		const updateData: Partial<NewPermit> = {
			status,
			reviewedAt: new Date(),
			reviewedBy: options?.reviewedBy,
			notes: options?.notes,
		};

		if (status === "approved" && !options?.approvedAt) {
			updateData.approvedAt = new Date();

			// Set expiration date to 1 year from approval for most permits
			if (!options?.expiresAt) {
				const expirationDate = new Date();
				expirationDate.setFullYear(expirationDate.getFullYear() + 1);
				updateData.expiresAt = expirationDate;
			}
		}

		if (options?.approvedAt) {
			updateData.approvedAt = options.approvedAt;
		}

		if (options?.expiresAt) {
			updateData.expiresAt = options.expiresAt;
		}

		const [updatedPermit] = await db
			.update(permits)
			.set(updateData)
			.where(eq(permits.id, id))
			.returning();

		if (!updatedPermit) {
			return {
				success: false,
				error: "Failed to update permit status",
			};
		}

		return {
			success: true,
			permit: updatedPermit,
		};
	} catch (error) {
		console.error("Error updating permit status:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Failed to update permit status",
		};
	}
};
