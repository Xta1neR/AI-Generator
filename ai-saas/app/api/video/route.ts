import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    let body;

    try {
      body = await req.json();
    } catch {
      return new NextResponse("Invalid JSON body", { status: 400 });
    }

    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("No prompt provided", { status: 400 });
    }

    // The API expects an `input` object with a `prompt` field.
    const input = {
      fps: 24,
      width: 1024,
      height: 576,
      prompt,
      guidance_scale: 17.5,
      negative_prompt: "very blue, dust, noisy, washed out, ugly, distorted, broken"
  };
  
  const response = await replicate.run("anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351", { input });
  

    console.log(response);

    return NextResponse.json(response);
  } catch (error) {
    console.log("[VIDEO_ERROR]", error);

    return new NextResponse("Internal error", { status: 500 });
  }
}

