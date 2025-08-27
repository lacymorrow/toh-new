"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle, FileUp, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { submitPermitApplication } from "@/server/actions/permit-actions";

const permitApplicationSchema = z.object({
	type: z.string().min(1, "Permit type is required"),
	applicantName: z.string().min(2, "Applicant name must be at least 2 characters"),
	applicantEmail: z.string().email("Please enter a valid email address"),
	applicantPhone: z.string().min(10, "Please enter a valid phone number"),
	propertyAddress: z.string().min(5, "Property address is required"),
	description: z.string().min(10, "Please provide a detailed description (at least 10 characters)"),
	documents: z.array(z.string()).optional(),
});

type PermitApplicationForm = z.infer<typeof permitApplicationSchema>;

const permitTypeOptions = [
	{ value: "building", label: "Building Permit" },
	{ value: "residential-renovation", label: "Residential Renovation" },
	{ value: "electrical", label: "Electrical Permit" },
	{ value: "plumbing", label: "Plumbing Permit" },
	{ value: "driveway", label: "Driveway Permit" },
	{ value: "tree-removal", label: "Tree Removal Permit" },
	{ value: "fence", label: "Fence Permit" },
	{ value: "demolition", label: "Demolition Permit" },
];

interface PermitApplicationFormProps {
	defaultType?: string;
}

export function PermitApplicationForm({ defaultType }: PermitApplicationFormProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitResult, setSubmitResult] = useState<{
		success: boolean;
		message: string;
		permitNumber?: string;
	} | null>(null);
	const router = useRouter();

	const form = useForm<PermitApplicationForm>({
		resolver: zodResolver(permitApplicationSchema),
		defaultValues: {
			type: defaultType || "",
			applicantName: "",
			applicantEmail: "",
			applicantPhone: "",
			propertyAddress: "",
			description: "",
			documents: [],
		},
	});

	const onSubmit = async (data: PermitApplicationForm) => {
		setIsSubmitting(true);
		setSubmitResult(null);

		try {
			const result = await submitPermitApplication(data);

			if (result.success) {
				setSubmitResult({
					success: true,
					message: "Your permit application has been submitted successfully!",
					permitNumber: result.permitNumber,
				});

				// Redirect to status page after a short delay
				setTimeout(() => {
					if (result.permitNumber) {
						router.push(`/permits/${result.permitNumber}`);
					} else {
						router.push("/permits/status");
					}
				}, 2000);
			} else {
				setSubmitResult({
					success: false,
					message: result.error || "Failed to submit application. Please try again.",
				});
			}
		} catch (error) {
			console.error("Error submitting permit application:", error);
			setSubmitResult({
				success: false,
				message: "An unexpected error occurred. Please try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Card className="max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle>Permit Application</CardTitle>
			</CardHeader>
			<CardContent>
				{submitResult && (
					<Alert
						className={`mb-6 ${submitResult.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
					>
						{submitResult.success ? (
							<CheckCircle className="h-4 w-4 text-green-600" />
						) : (
							<AlertCircle className="h-4 w-4 text-red-600" />
						)}
						<AlertDescription className={submitResult.success ? "text-green-800" : "text-red-800"}>
							{submitResult.message}
							{submitResult.permitNumber && (
								<div className="mt-2 font-medium">Permit Number: #{submitResult.permitNumber}</div>
							)}
						</AlertDescription>
					</Alert>
				)}

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Permit Type</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select permit type" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{permitTypeOptions.map((option) => (
												<SelectItem key={option.value} value={option.value}>
													{option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid gap-4 md:grid-cols-2">
							<FormField
								control={form.control}
								name="applicantName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Full Name</FormLabel>
										<FormControl>
											<Input placeholder="Enter your full name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="applicantEmail"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email Address</FormLabel>
										<FormControl>
											<Input type="email" placeholder="Enter your email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="applicantPhone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone Number</FormLabel>
									<FormControl>
										<Input type="tel" placeholder="(123) 456-7890" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="propertyAddress"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Property Address</FormLabel>
									<FormControl>
										<Input placeholder="Enter the full property address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Project Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Provide a detailed description of your project, including scope of work, materials, and timeline"
											className="min-h-[100px]"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="space-y-3">
							<Label>Supporting Documents (Optional)</Label>
							<div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
								<FileUp className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
								<p className="text-sm text-muted-foreground">
									Upload plans, drawings, or other supporting documents
								</p>
								<p className="text-xs text-muted-foreground mt-2">
									PDF, JPG, PNG files up to 10MB each
								</p>
								{/* File upload functionality would be implemented here */}
							</div>
						</div>

						<div className="bg-muted/50 p-4 rounded-lg">
							<h4 className="font-medium text-sm mb-2">Important Notes:</h4>
							<ul className="text-sm text-muted-foreground space-y-1">
								<li>• All information must be accurate and complete</li>
								<li>• Processing time varies by permit type</li>
								<li>• You will receive email updates on your application status</li>
								<li>• Payment will be required before permit approval</li>
							</ul>
						</div>

						<Button
							type="submit"
							className="w-full"
							disabled={isSubmitting || submitResult?.success}
						>
							{isSubmitting ? (
								<>
									<Loader2 className="h-4 w-4 mr-2 animate-spin" />
									Submitting Application...
								</>
							) : (
								"Submit Application"
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
