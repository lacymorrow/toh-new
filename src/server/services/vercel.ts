interface DeploymentInfo {
	teamId: string | undefined;
	projectId: string | undefined;
	deploymentId: string | undefined;
	deploymentDashboardUrl: string;
	deploymentUrl: string;
	productionDeployHookUrl: string;
	projectDashboardUrl: string;
	projectName: string;
	repositoryUrl: string;
}

/**
 * Saves Vercel deployment information.
 * Previously stored in Payload CMS database — now a no-op since Payload is removed.
 */
export async function saveVercelDeployment(_deploymentInfo: DeploymentInfo) {
	return null;
}
