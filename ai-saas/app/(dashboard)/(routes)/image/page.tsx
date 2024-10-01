"use client";

import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading } from "@/components/heading";
import { ImageIcon } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const formSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
});

const ImagePage = () => {
  const [imageUrl, setImageUrl] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImageUrl(undefined);

      const response = await axios.post("/api/image", {
        prompt: values.prompt,
      });

      setImageUrl(response.data[0]);

      form.reset();
    } catch (error) {
      console.error("Error fetching image:", error);
      // setImageUrl(null);
    }
  };

  return (
    <div>
      <Heading
        title="Image Generation"
        description="Enter the prompt for the image."
        icon={ImageIcon}
        iconColor="text-rose-500"
        bgColor="bg-rose-500/10"
      />

      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-md grid grid-cols-12 gap-2"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Enter your image prompt"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
              Generate
            </Button>
          </form>
        </Form>

        <div className="space-y-4 mt-4">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="Generated image"
              width={768}
              height={768}
              className="w-full mt-8 rounded-lg border bg-black"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
