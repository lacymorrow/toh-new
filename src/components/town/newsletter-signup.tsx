"use client";

import { Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { subscribeToNewsletter } from "@/server/actions/newsletter-actions";

export function NewsletterSignup() {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const result = await subscribeToNewsletter(email);

			if (result.success) {
				toast({
					title: "Success!",
					description: result.message || "You've been subscribed to our newsletter.",
				});
				setEmail("");
			} else {
				toast({
					title: "Error",
					description: result.error || "Failed to subscribe. Please try again.",
					variant: "destructive",
				});
			}
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to subscribe. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section className="py-12 bg-blue-900 text-white">
			<div className="container mx-auto px-4">
				<div className="max-w-2xl mx-auto text-center">
					<div className="flex justify-center mb-4">
						<div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
							<Mail className="h-8 w-8" />
						</div>
					</div>
					<h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
					<p className="text-lg mb-8 text-blue-100">
						Subscribe to our newsletter for the latest news, events, and updates from the Town of
						Harmony.
					</p>

					<form
						onSubmit={handleSubmit}
						className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
					>
						<Input
							type="email"
							placeholder="Enter your email address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="flex-1 bg-white text-gray-900"
							disabled={isLoading}
						/>
						<Button
							type="submit"
							size="lg"
							className="bg-white text-blue-900 hover:bg-gray-100"
							disabled={isLoading}
						>
							{isLoading ? "Subscribing..." : "Subscribe"}
						</Button>
					</form>

					<p className="text-sm text-blue-200 mt-4">
						We respect your privacy. Unsubscribe at any time.
					</p>
				</div>
			</div>
		</section>
	);
}
