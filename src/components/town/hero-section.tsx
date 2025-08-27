"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const slides = [
	{
		id: 1,
		title: "Welcome to Harmony",
		subtitle: "A Community Where Tradition Meets Progress",
		description: "Discover what makes our town special - from historic charm to modern amenities.",
		image: "/images/hero-1.jpg",
		cta: {
			text: "Explore Our Town",
			href: "/about",
		},
	},
	{
		id: 2,
		title: "Community Events",
		subtitle: "Join Us for Year-Round Activities",
		description:
			"From summer festivals to winter celebrations, there's always something happening in Harmony.",
		image: "/images/hero-2.jpg",
		cta: {
			text: "View Events Calendar",
			href: "/events",
		},
	},
	{
		id: 3,
		title: "Town Services",
		subtitle: "We're Here to Serve You",
		description: "Access permits, pay bills, and find the resources you need - all in one place.",
		image: "/images/hero-3.jpg",
		cta: {
			text: "Browse Services",
			href: "/services",
		},
	},
];

export function HeroSection() {
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % slides.length);
		}, 5000);

		return () => clearInterval(timer);
	}, []);

	const goToSlide = (index: number) => {
		setCurrentSlide(index);
	};

	const goToPrevious = () => {
		setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
	};

	const goToNext = () => {
		setCurrentSlide((prev) => (prev + 1) % slides.length);
	};

	return (
		<div className="relative h-[500px] bg-gray-900">
			{/* Slides */}
			{slides.map((slide, index) => (
				<div
					key={slide.id}
					className={`absolute inset-0 transition-opacity duration-1000 ${
						index === currentSlide ? "opacity-100" : "opacity-0"
					}`}
				>
					{/* Background Image with Overlay */}
					<div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30">
						<div
							className="absolute inset-0 bg-cover bg-center"
							style={{
								backgroundImage: "url(/images/placeholder-hero.jpg)",
							}}
						/>
					</div>

					{/* Content */}
					<div className="relative h-full container mx-auto px-4">
						<div className="flex items-center h-full">
							<div className="max-w-2xl text-white">
								<h1 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h1>
								<p className="text-xl md:text-2xl mb-2 text-blue-300">{slide.subtitle}</p>
								<p className="text-lg mb-8 text-gray-200">{slide.description}</p>
								<Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
									<Link href={slide.cta.href}>{slide.cta.text}</Link>
								</Button>
							</div>
						</div>
					</div>
				</div>
			))}

			{/* Navigation */}
			<button
				onClick={goToPrevious}
				className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
				aria-label="Previous slide"
			>
				<ChevronLeft className="h-6 w-6" />
			</button>
			<button
				onClick={goToNext}
				className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
				aria-label="Next slide"
			>
				<ChevronRight className="h-6 w-6" />
			</button>

			{/* Dots */}
			<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
				{slides.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className={`w-3 h-3 rounded-full transition-colors ${
							index === currentSlide ? "bg-white" : "bg-white/50"
						}`}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
}
