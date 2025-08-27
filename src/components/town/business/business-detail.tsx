import {
	CheckCircle,
	Clock,
	ExternalLink,
	Globe,
	Mail,
	MapPin,
	Navigation,
	Phone,
	Share2,
	Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BusinessDetailProps {
	business: {
		id: number;
		name: string;
		slug: string;
		description: string | null;
		category: string;
		address: string | null;
		phone: string | null;
		email: string | null;
		website: string | null;
		socialMedia: any;
		hours: any;
		services: string[] | null;
		paymentMethods: string[] | null;
		logo: string | null;
		images: string[] | null;
		isVerified: boolean | null;
		isFeatured: boolean | null;
		tags: string[] | null;
		latitude: string | null;
		longitude: string | null;
		establishedYear: number | null;
		employees: string | null;
		createdAt: Date;
		updatedAt: Date;
	};
}

const categoryLabels: Record<string, string> = {
	restaurant: "Restaurant",
	retail: "Retail",
	service: "Professional Service",
	healthcare: "Healthcare",
	education: "Education",
	finance: "Finance",
	realestate: "Real Estate",
	other: "Other",
};

const dayOrder = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const dayLabels: Record<string, string> = {
	monday: "Monday",
	tuesday: "Tuesday",
	wednesday: "Wednesday",
	thursday: "Thursday",
	friday: "Friday",
	saturday: "Saturday",
	sunday: "Sunday",
};

export function BusinessDetail({ business }: BusinessDetailProps) {
	const hasLocation = business.latitude && business.longitude;

	return (
		<article>
			<header className="mb-8">
				<div className="flex items-start justify-between gap-4 mb-4">
					<div>
						<h1 className="text-4xl font-bold mb-2">{business.name}</h1>
						<div className="flex items-center gap-2">
							<Badge variant="secondary">
								{categoryLabels[business.category] || business.category}
							</Badge>
							{business.isVerified && (
								<Badge variant="default" className="flex items-center gap-1">
									<CheckCircle className="h-3 w-3" />
									Verified Business
								</Badge>
							)}
							{business.isFeatured && (
								<Badge variant="default" className="flex items-center gap-1 bg-yellow-500">
									<Star className="h-3 w-3" />
									Featured
								</Badge>
							)}
						</div>
					</div>
					{business.logo && (
						<img
							src={business.logo}
							alt={`${business.name} logo`}
							className="w-24 h-24 object-contain rounded-lg border"
						/>
					)}
				</div>

				{business.description && (
					<p className="text-lg text-muted-foreground">{business.description}</p>
				)}
			</header>

			{business.images && business.images.length > 0 && (
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
					{business.images.map((image, index) => (
						<img
							key={index}
							src={image}
							alt={`${business.name} image ${index + 1}`}
							className="w-full h-48 object-cover rounded-lg"
						/>
					))}
				</div>
			)}

			<div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
				<div className="space-y-6">
					{business.services && business.services.length > 0 && (
						<Card>
							<CardHeader>
								<CardTitle>Services Offered</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="grid md:grid-cols-2 gap-2">
									{business.services.map((service, index) => (
										<li key={index} className="flex items-center gap-2">
											<span className="h-1.5 w-1.5 bg-blue-600 rounded-full" />
											{service}
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
					)}

					{business.hours && (
						<Card>
							<CardHeader>
								<CardTitle>Business Hours</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-2">
									{dayOrder.map((day) => {
										const hours = business.hours[day];
										if (!hours) return null;

										const today = new Date()
											.toLocaleDateString("en-US", { weekday: "long" })
											.toLowerCase();
										const isToday = day === today;

										return (
											<div
												key={day}
												className={`flex justify-between py-2 ${isToday ? "font-semibold text-blue-600" : ""}`}
											>
												<span>{dayLabels[day]}</span>
												<span>{hours === "Closed" ? "Closed" : hours}</span>
											</div>
										);
									})}
								</div>
							</CardContent>
						</Card>
					)}

					{business.paymentMethods && business.paymentMethods.length > 0 && (
						<Card>
							<CardHeader>
								<CardTitle>Payment Methods</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex flex-wrap gap-2">
									{business.paymentMethods.map((method) => (
										<Badge key={method} variant="outline">
											{method}
										</Badge>
									))}
								</div>
							</CardContent>
						</Card>
					)}
				</div>

				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Contact Information</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{business.address && (
								<div className="flex items-start gap-3">
									<MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
									<div>
										<p>{business.address}</p>
										{hasLocation && (
											<Button variant="link" className="p-0 h-auto mt-1" asChild>
												<a
													href={`https://maps.google.com/?q=${business.latitude},${business.longitude}`}
													target="_blank"
													rel="noopener noreferrer"
												>
													Get directions
													<Navigation className="ml-1 h-3 w-3" />
												</a>
											</Button>
										)}
									</div>
								</div>
							)}

							{business.phone && (
								<div className="flex items-center gap-3">
									<Phone className="h-5 w-5 text-muted-foreground" />
									<a
										href={`tel:${business.phone}`}
										className="hover:text-blue-600 transition-colors"
									>
										{business.phone}
									</a>
								</div>
							)}

							{business.email && (
								<div className="flex items-center gap-3">
									<Mail className="h-5 w-5 text-muted-foreground" />
									<a
										href={`mailto:${business.email}`}
										className="hover:text-blue-600 transition-colors"
									>
										{business.email}
									</a>
								</div>
							)}

							{business.website && (
								<div className="flex items-center gap-3">
									<Globe className="h-5 w-5 text-muted-foreground" />
									<a
										href={business.website}
										target="_blank"
										rel="noopener noreferrer"
										className="hover:text-blue-600 transition-colors"
									>
										Visit website
										<ExternalLink className="inline ml-1 h-3 w-3" />
									</a>
								</div>
							)}
						</CardContent>
					</Card>

					<Button variant="outline" className="w-full">
						<Share2 className="h-4 w-4 mr-2" />
						Share Business
					</Button>

					{business.establishedYear && (
						<Card>
							<CardContent className="pt-6">
								<div className="text-center">
									<p className="text-sm text-muted-foreground">Established</p>
									<p className="text-2xl font-bold">{business.establishedYear}</p>
								</div>
							</CardContent>
						</Card>
					)}

					{business.tags && business.tags.length > 0 && (
						<Card>
							<CardHeader>
								<CardTitle>Tags</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex flex-wrap gap-2">
									{business.tags.map((tag) => (
										<Badge key={tag} variant="secondary">
											{tag}
										</Badge>
									))}
								</div>
							</CardContent>
						</Card>
					)}
				</div>
			</div>
		</article>
	);
}
