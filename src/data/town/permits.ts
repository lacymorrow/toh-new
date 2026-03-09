export interface TownPermitType {
	id: string;
	name: string;
	description: string;
	fee: number; // in cents
	processingTime: string;
	requirements: string[];
	category: string;
	icon: string;
}

// Permit types — to be configured based on actual town permit requirements
export const permitTypes: TownPermitType[] = [];
