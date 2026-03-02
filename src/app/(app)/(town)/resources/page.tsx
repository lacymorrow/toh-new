import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	FileText,
	Download,
	Phone,
	Mail,
	Globe,
	MapPin,
} from "lucide-react";
import { getResources, getSettings } from "@/lib/payload/town-data";
import { resolveIcon } from "@/lib/utils/icon-resolver";

export const metadata: Metadata = {
	title: "Resources | Town of Harmony",
	description: "Access important resources, documents, and services for Town of Harmony residents and visitors.",
};

export default async function ResourcesPage() {
	const [allResources, settings] = await Promise.all([
		getResources(),
		getSettings(),
	]);

	const contactPhone = (settings as any)?.contactInfo?.phone ?? "(704) 546-2339";
	const contactAddress = (settings as any)?.contactInfo?.address ?? "3389 Harmony Hwy, Harmony, NC 28634";
	const contactEmail = (settings as any)?.contactInfo?.email ?? "info@townofharmony.org";

	// Group resources by type
	const documents = allResources.filter((r: any) => r.type === "document");
	const services = allResources.filter((r: any) => r.type === "service");
	const links = allResources.filter((r: any) => r.type === "link");
	const forms = allResources.filter((r: any) => r.type === "form");

	// Group forms by category
	const formsByCategory = forms.reduce((acc: Record<string, any[]>, form: any) => {
		const cat = form.category || "General";
		if (!acc[cat]) acc[cat] = [];
		acc[cat].push(form);
		return acc;
	}, {});

	return (
		<div className="min-h-screen bg-cream">
			{/* Hero Section */}
			<section className="bg-gradient-to-b from-sage-dark to-sage text-white py-16">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl md:text-5xl font-bold mb-4">Town Resources</h1>
					<p className="text-xl max-w-3xl">
						Access important information, documents, and services for residents and visitors of the Town of Harmony.
					</p>
				</div>
			</section>

			{/* Quick Contact Section */}
			<section className="bg-white border-b py-6">
				<div className="container mx-auto px-4">
					<div className="flex flex-wrap gap-6 justify-center">
						<div className="flex items-center gap-2">
							<Phone className="h-5 w-5 text-sage" />
							<span className="font-medium">Town Hall:</span>
							<a href={`tel:${contactPhone.replace(/[^0-9]/g, '')}`} className="text-sage hover:underline">
								{contactPhone}
							</a>
						</div>
						<div className="flex items-center gap-2">
							<MapPin className="h-5 w-5 text-sage" />
							<span className="font-medium">Address:</span>
							<span>{contactAddress}</span>
						</div>
						<div className="flex items-center gap-2">
							<Mail className="h-5 w-5 text-sage" />
							<a href={`mailto:${contactEmail}`} className="text-sage hover:underline">
								{contactEmail}
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* Document Resources */}
			{documents.length > 0 && (
				<section className="py-12">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl font-bold mb-8">Official Documents</h2>
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
							{documents.map((doc: any) => {
								const Icon = resolveIcon(doc.icon);
								const href = doc.file && typeof doc.file === "object" ? doc.file.url : doc.externalUrl || "#";
								return (
									<Card key={doc.id} className="hover:shadow-lg transition-shadow">
										<CardHeader>
											<Icon className="h-8 w-8 text-sage mb-2" />
											<CardTitle className="text-lg">{doc.title}</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-sm text-[#4A4640] mb-4">{doc.description}</p>
											<Button variant="outline" className="w-full" asChild>
												<Link href={href}>
													<Download className="mr-2 h-4 w-4" />
													View Document
												</Link>
											</Button>
										</CardContent>
									</Card>
								);
							})}
						</div>
					</div>
				</section>
			)}

			{/* Community Services */}
			{services.length > 0 && (
				<section className="py-12 bg-white">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl font-bold mb-8">Community Services</h2>
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
							{services.map((service: any) => {
								const Icon = resolveIcon(service.icon);
								return (
									<Card key={service.id}>
										<CardHeader>
											<Icon className="h-8 w-8 text-sage mb-2" />
											<CardTitle className="text-lg">{service.title}</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-sm text-[#4A4640] mb-3">{service.description}</p>
											<div className="space-y-1 text-sm">
												{service.contactPhone && (
													<div>
														<span className="font-medium">Phone: </span>
														<a href={`tel:${service.contactPhone.replace(/[^0-9]/g, '')}`} className="text-sage hover:underline">
															{service.contactPhone}
														</a>
													</div>
												)}
												{service.contactEmail && (
													<div>
														<span className="font-medium">Email: </span>
														<a href={`mailto:${service.contactEmail}`} className="text-sage hover:underline text-xs">
															{service.contactEmail}
														</a>
													</div>
												)}
											</div>
										</CardContent>
									</Card>
								);
							})}
						</div>
					</div>
				</section>
			)}

			{/* Downloadable Forms */}
			{Object.keys(formsByCategory).length > 0 && (
				<section className="py-12 bg-stone">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl font-bold mb-8">Downloadable Forms</h2>
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
							{Object.entries(formsByCategory).map(([category, categoryForms]) => (
								<Card key={category}>
									<CardHeader>
										<CardTitle className="text-lg">{category}</CardTitle>
									</CardHeader>
									<CardContent>
										<ul className="space-y-2">
											{(categoryForms as any[]).map((form: any) => {
												const href = form.file && typeof form.file === "object" ? form.file.url : form.externalUrl || "#";
												return (
													<li key={form.id}>
														<a
															href={href}
															className="text-sm text-sage hover:underline flex items-center gap-1"
															download
														>
															<Download className="h-3 w-3" />
															{form.title}
														</a>
													</li>
												);
											})}
										</ul>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>
			)}

			{/* External Links */}
			{links.length > 0 && (
				<section className="py-12 bg-white">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl font-bold mb-8">External Resources</h2>
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
							{links.map((link: any) => {
								const Icon = resolveIcon(link.icon);
								return (
									<Card key={link.id}>
										<CardHeader>
											<Icon className="h-8 w-8 text-sage mb-2" />
											<CardTitle className="text-lg">{link.title}</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-sm text-[#4A4640] mb-4">{link.description}</p>
											{link.externalUrl && (
												<Button variant="outline" className="w-full" asChild>
													<a href={link.externalUrl} target="_blank" rel="noopener noreferrer">
														Visit Website
														<Globe className="ml-2 h-4 w-4" />
													</a>
												</Button>
											)}
										</CardContent>
									</Card>
								);
							})}
						</div>
					</div>
				</section>
			)}

			{/* Help Section */}
			<section className="py-12 bg-sage-dark text-white">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-4">Need Additional Help?</h2>
					<p className="text-lg mb-6 max-w-2xl mx-auto">
						Can't find what you're looking for? Our staff is here to help you with any questions or concerns.
					</p>
					<div className="flex flex-wrap gap-4 justify-center">
						<Button size="lg" variant="secondary" asChild>
							<Link href="/contact">
								<Mail className="mr-2 h-5 w-5" />
								Contact Us
							</Link>
						</Button>
						<Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-sage-dark" asChild>
							<a href={`tel:${contactPhone.replace(/[^0-9]/g, '')}`}>
								<Phone className="mr-2 h-5 w-5" />
								Call Town Hall
							</a>
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
