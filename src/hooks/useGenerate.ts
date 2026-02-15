"use client";

import { useState, useCallback } from "react";
import type { GenerateResponse } from "@/lib/types";

export function useGenerate() {
  const [imageData, setImageData] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (description: string) => {
    setLoading(true);
    setError(null);
    setImageData(null);
    setGeneratedPrompt(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      const data: GenerateResponse = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Failed to generate coloring page");
        return null;
      }

      setImageData(data.imageData);
      setGeneratedPrompt(data.generatedPrompt ?? null);
      return data.imageData;
    } catch {
      setError("Network error. Please check your connection and try again.");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setImageData(null);
    setGeneratedPrompt(null);
    setError(null);
  }, []);

  return { imageData, generatedPrompt, loading, error, generate, reset };
}
