import * as z from "zod";

// Define the validation schema using Zod
export const formSchema = z.object({
    prompt: z.string().min(1, {
        message: "Image Prompt is required",
    }),
    amount: z.string().min(1, {
        message: "Amount selection is required", // Add a more descriptive error message
    }),
    resolution: z.string().min(1, {
        message: "Resolution selection is required", // Add a more descriptive error message
    }),
});

// Define the options for amount selection
export const amountOptions = [
    { value: "1", label: "1 photo" }, 
    { value: "2", label: "2 photos" },
    { value: "3", label: "3 photos" },
    { value: "4", label: "4 photos" },
    { value: "5", label: "5 photos" },
];

// Define the options for resolution selection
export const resolutionOptions = [
    { value: "256x256", label: "256x256" },
    { value: "512x512", label: "512x512" },
    { value: "1024x1024", label: "1024x1024" },
];
