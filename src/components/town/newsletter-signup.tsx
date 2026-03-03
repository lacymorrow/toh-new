"use client";

import { useState } from "react";
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
		<section className="py-16 bg-sage-deep text-white text-center">
			<div className="container mx-auto px-4">
				<h2 className="text-[28px] font-serif font-bold mb-3">Stay Connected with Harmony</h2>
				<p className="text-base text-white/85 mb-7">
					Get the latest news, events, and town updates delivered to your inbox.
				</p>

				<form
					onSubmit={handleSubmit}
					className="flex flex-col sm:flex-row gap-2 max-w-[460px] mx-auto"
				>
					<input
						type="email"
						placeholder="Enter your email address"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						disabled={isLoading}
						className="flex-1 px-4 py-3.5 border border-white/20 bg-white/[0.08] text-white text-[15px] rounded-lg outline-none placeholder:text-white/60 focus:border-wheat transition-colors"
					/>
					<button
						type="submit"
						disabled={isLoading}
						className="px-6 py-3.5 bg-wheat text-sage-deep border-none font-bold text-[15px] rounded-lg cursor-pointer hover:bg-wheat-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isLoading ? "Subscribing..." : "Subscribe"}
					</button>
				</form>

				<p className="text-sm text-white/60 mt-4">
					We respect your privacy. Unsubscribe at any time.
				</p>
			</div>
		</section>
	);
}
