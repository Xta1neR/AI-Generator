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

    const input = {
      width: 768,
      height: 768,
      prompt,
      refine: "expert_ensemble_refiner",
      apply_watermark: false,
      num_inference_steps: 25,
    };

    const response = await replicate.run(
      "stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
      { input }
    );

    console.log(response);

    return NextResponse.json(response);
  } catch (error) {
    console.log("[IMAGE_ERROR]", error);

    return new NextResponse("Internal error", { status: 500 });
  }
}

