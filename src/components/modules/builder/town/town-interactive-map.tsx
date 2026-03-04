"use client";

import { InteractiveMap } from "@/app/(app)/(town)/map/interactive-map";

export const TownInteractiveMap = () => {
	return (
		<div style={{ height: "calc(100vh - 200px)", minHeight: "500px" }}>
			<InteractiveMap />
		</div>
	);
};
