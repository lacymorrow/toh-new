import type { Media } from "@/payload-types";

/**
 * Extracts a URL from a Payload CMS Media relation field.
 * Handles both populated Media objects and raw IDs.
 */
export const getMediaUrl = (media: number | Media | string | null | undefined): string | null => {
	if (!media) return null;
	if (typeof media === "string") return media;
	if (typeof media === "number") return null;
	return media.url ?? null;
};
