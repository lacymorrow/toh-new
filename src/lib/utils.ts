import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
	return date.toLocaleDateString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export function formatTime(time: string): string {
	const [hours, minutes] = time.split(":");
	const date = new Date();
	date.setHours(Number.parseInt(hours), Number.parseInt(minutes));
	return date.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	});
}

export function formatShortDate(date: Date): string {
	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
}

export function isUpcomingMeeting(meetingDate: string): boolean {
	const meeting = new Date(meetingDate);
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	return meeting >= today;
}
