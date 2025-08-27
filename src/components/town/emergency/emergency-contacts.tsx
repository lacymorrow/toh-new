import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EmergencyContact {
	name: string;
	phone: string;
	email?: string;
	address?: string;
	hours?: string;
	description?: string;
}

const emergencyContacts: EmergencyContact[] = [
	{
		name: "Police Department",
		phone: "911",
		email: "police@harmonytown.gov",
		address: "123 Main Street, Harmony, WV 25425",
		hours: "24/7",
		description: "Emergency police services, crime reporting, and public safety",
	},
	{
		name: "Fire Department",
		phone: "911",
		email: "fire@harmonytown.gov",
		address: "456 Fire Station Road, Harmony, WV 25425",
		hours: "24/7",
		description: "Fire suppression, emergency medical services, and rescue operations",
	},
	{
		name: "Emergency Medical Services",
		phone: "911",
		email: "ems@harmonytown.gov",
		address: "789 Hospital Drive, Harmony, WV 25425",
		hours: "24/7",
		description: "Emergency medical response and ambulance services",
	},
	{
		name: "Emergency Management Office",
		phone: "(304) 555-0100",
		email: "emergency@harmonytown.gov",
		address: "100 Town Hall Plaza, Harmony, WV 25425",
		hours: "Monday-Friday: 8:00 AM - 5:00 PM",
		description: "Emergency planning, coordination, and disaster response",
	},
	{
		name: "Public Works Department",
		phone: "(304) 555-0200",
		email: "publicworks@harmonytown.gov",
		address: "200 Municipal Building, Harmony, WV 25425",
		hours: "Monday-Friday: 7:00 AM - 4:00 PM",
		description: "Road maintenance, water/sewer emergencies, and infrastructure issues",
	},
	{
		name: "Animal Control",
		phone: "(304) 555-0300",
		email: "animalcontrol@harmonytown.gov",
		hours: "Monday-Friday: 8:00 AM - 5:00 PM",
		description: "Stray animals, wildlife issues, and animal emergencies",
	},
	{
		name: "Utility Emergency Hotline",
		phone: "(304) 555-0400",
		email: "utilities@harmonytown.gov",
		hours: "24/7",
		description: "Power outages, gas leaks, and utility emergencies",
	},
	{
		name: "Poison Control Center",
		phone: "1-800-222-1222",
		hours: "24/7",
		description: "National poison control hotline for poisoning emergencies",
	},
];

export const EmergencyContacts = () => {
	return (
		<div className="space-y-6">
			<div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
				<h2 className="text-xl font-bold text-red-800 mb-2">
					🚨 Life-Threatening Emergency: Call 911
				</h2>
				<p className="text-red-700">
					For immediate emergency assistance requiring police, fire, or medical response, always
					dial 911 first.
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				{emergencyContacts.map((contact, index) => (
					<Card key={index} className="hover:shadow-lg transition-shadow">
						<CardHeader className="pb-3">
							<CardTitle className="text-lg text-gray-900">{contact.name}</CardTitle>
						</CardHeader>

						<CardContent className="space-y-3">
							<div className="flex items-center gap-2 text-gray-700">
								<Phone className="h-4 w-4 text-green-600" />
								<a
									href={`tel:${contact.phone}`}
									className="font-semibold text-green-600 hover:underline"
								>
									{contact.phone}
								</a>
							</div>

							{contact.email && (
								<div className="flex items-center gap-2 text-gray-700">
									<Mail className="h-4 w-4 text-blue-600" />
									<a
										href={`mailto:${contact.email}`}
										className="text-blue-600 hover:underline text-sm"
									>
										{contact.email}
									</a>
								</div>
							)}

							{contact.address && (
								<div className="flex items-start gap-2 text-gray-700">
									<MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
									<span className="text-sm">{contact.address}</span>
								</div>
							)}

							{contact.hours && (
								<div className="flex items-center gap-2 text-gray-700">
									<Clock className="h-4 w-4 text-orange-500" />
									<span className="text-sm font-medium">{contact.hours}</span>
								</div>
							)}

							{contact.description && (
								<p className="text-sm text-gray-600 pt-2 border-t">{contact.description}</p>
							)}
						</CardContent>
					</Card>
				))}
			</div>

			<Card className="bg-blue-50 border-blue-200">
				<CardContent className="p-6">
					<h3 className="font-semibold text-blue-800 mb-3">Additional Resources</h3>
					<div className="space-y-2 text-sm text-blue-700">
						<p>
							<strong>West Virginia State Police:</strong>{" "}
							<a href="tel:304-558-1400" className="underline">
								(304) 558-1400
							</a>
						</p>
						<p>
							<strong>Jefferson County Emergency Services:</strong>{" "}
							<a href="tel:304-728-3290" className="underline">
								(304) 728-3290
							</a>
						</p>
						<p>
							<strong>Red Cross Disaster Relief:</strong>{" "}
							<a href="tel:1-800-733-2767" className="underline">
								1-800-RED-CROSS
							</a>
						</p>
						<p>
							<strong>Crisis Text Line:</strong> Text HOME to{" "}
							<a href="sms:741741" className="underline">
								741741
							</a>
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
