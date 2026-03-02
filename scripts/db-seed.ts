async function main() {
	console.log("Payload CMS has been removed. Content is now served from static data files.");
	console.log("No database seeding needed.");
}

export { main as seed };

main()
	.catch(console.error)
	.then(() => process.exit(0));
