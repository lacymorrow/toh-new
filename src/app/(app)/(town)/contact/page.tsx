import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";
import { getSettings } from "@/lib/town-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
	title: "Contact Us | Town of Harmony, NC",
	description:
		"Get in touch with the Town of Harmony, North Carolina. Find our address, phone number, email, and office hours.",
};

export default async function ContactPage() {
	const settings = await getSettings();

	const mapsQuery = encodeURIComponent(settings.contactInfo.address);
	const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

	return (
		<div className="container mx-auto max-w-4xl px-4 py-12">
			<div className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Contact Us</h1>
				<p className="mt-2 text-lg text-muted-foreground">
					Get in touch with the Town of Harmony. We are here to help.
				</p>
			</div>

			<div className="grid gap-8 md:grid-cols-2">
				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Town Hall</CardTitle>
						</CardHeader>
						<CardContent className="grid gap-4">
							<div className="flex items-start gap-3">
								<MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
								<div>
									<p className="text-sm font-medium">Address</p>
									<p className="text-sm text-muted-foreground">
										{settings.contactInfo.address}
									</p>
									<a
										href={mapsUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="mt-1 inline-flex items-center gap-1 text-sm text-primary hover:underline"
									>
										Get Directions <ExternalLink className="h-3 w-3" />
									</a>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<Phone className="mt-0.5 h-5 w-5 text-muted-foreground" />
								<div>
									<p className="text-sm font-medium">Phone</p>
									<a
										href={`tel:${settings.contactInfo.phone.replace(/[^0-9+]/g, "")}`}
										className="text-sm text-muted-foreground hover:text-foreground"
									>
										{settings.contactInfo.phone}
									</a>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<Mail className="mt-0.5 h-5 w-5 text-muted-foreground" />
								<div>
									<p className="text-sm font-medium">Email</p>
									<a
										href={`mailto:${settings.contactInfo.email}`}
										className="text-sm text-muted-foreground hover:text-foreground"
									>
										{settings.contactInfo.email}
									</a>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
								<div>
									<p className="text-sm font-medium">Office Hours</p>
									<p className="text-sm text-muted-foreground">
										{settings.officeHours.weekday}
									</p>
									<p className="text-sm text-muted-foreground">
										{settings.officeHours.weekend}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div>
					<Card>
						<CardHeader>
							<CardTitle>Send a Message</CardTitle>
						</CardHeader>
						<CardContent>
							<ContactForm />
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
