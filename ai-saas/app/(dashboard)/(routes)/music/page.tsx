"use client";

import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading } from "@/components/heading";
import { Music2Icon } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// Define the schema for form validation using Zod
const formSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
});

const MusicPage = () => {
  // State to manage the chat messages
  const [music, setMusic] = useState<string>();

  // Initialize the form using react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  // Check if the form is currently submitting
  const isLoading = form.formState.isSubmitting;

  // Function to handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Create a new message from the user input
      setMusic(undefined);


      // Send a request to the API route with the current conversation messages
      const response = await axios.post("/api/music",{prompt: values.prompt});

      // Update the messages state with the new assistant's message
      setMusic(response.data.audio)

      // Reset the form after submission
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Heading for the chat page */}
      <Heading
        title="Music Genreation"
        description="Enter the realme of Music from Prompts."
        icon={Music2Icon}
        iconColor="text-rose-500"
        bgColor="bg-rose-500/10"
      />

      {/* Form for inputting messages */}
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-md grid grid-cols-12 gap-2"
            >
              {/* Input field for user prompt */}
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Enter your musical Prompt"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              {/* Submit button */}
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>

        {/* Chat messages display */}
        <div className="space-y-4 mt-4">
          {music && (
            <audio controls className="w-full mt-8">
              <source src={music} />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
