import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { buildColoringPrompt, GEMINI_MODEL } from "@/lib/gemini";

function getClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }
  return new GoogleGenAI({ apiKey });
}

export async function POST(request: NextRequest) {
  try {
    const { description } = await request.json();

    if (!description || typeof description !== "string") {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      );
    }

    if (description.length > 500) {
      return NextResponse.json(
        { error: "Description must be 500 characters or less" },
        { status: 400 }
      );
    }

    const prompt = buildColoringPrompt(description);
    const ai = getClient();

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        responseModalities: ["TEXT", "IMAGE"],
      },
    });

    const parts = response.candidates?.[0]?.content?.parts;
    if (!parts || parts.length === 0) {
      return NextResponse.json(
        { error: "No response from Gemini" },
        { status: 500 }
      );
    }

    let imageData: string | null = null;
    let generatedPrompt: string | undefined;

    for (const part of parts) {
      if (part.inlineData?.data) {
        imageData = part.inlineData.data;
      }
      if (part.text) {
        generatedPrompt = part.text;
      }
    }

    if (!imageData) {
      return NextResponse.json(
        { error: "No image was generated. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ imageData, generatedPrompt });
  } catch (error: unknown) {
    console.error("Generation error:", error);

    const message =
      error instanceof Error ? error.message : String(error);
    const status =
      error instanceof Error && "status" in error
        ? (error as { status: number }).status
        : undefined;

    if (status === 429) {
      return NextResponse.json(
        { error: "Rate limited. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    if (message.includes("API key")) {
      return NextResponse.json(
        { error: "Invalid API key. Please check your GEMINI_API_KEY." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: `Generation failed: ${message}` },
      { status: 500 }
    );
  }
}
