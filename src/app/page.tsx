"use client";

import { useCallback, useRef } from "react";
import { AlertCircle } from "lucide-react";
import GeneratorForm from "@/components/GeneratorForm";
import ColoringPagePreview from "@/components/ColoringPagePreview";
import { useGenerate } from "@/hooks/useGenerate";
import { useGallery } from "@/hooks/useGallery";

export default function HomePage() {
  const { imageData, generatedPrompt, loading, error, generate, reset } =
    useGenerate();
  const { addPage } = useGallery();
  const descriptionRef = useRef("");

  const handleGenerate = useCallback(
    async (description: string) => {
      descriptionRef.current = description;
      const result = await generate(description);
      if (result) {
        await addPage(description, result);
      }
    },
    [generate, addPage]
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create Your Own Coloring Page
        </h1>
        <p className="text-gray-500">
          Describe what you&apos;d like to color, and AI will generate a
          printable coloring page just for you.
        </p>
      </div>

      {!imageData && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <GeneratorForm onGenerate={handleGenerate} loading={loading} />
        </div>
      )}

      {error && (
        <div className="mt-4 flex items-center gap-2 bg-red-50 text-red-700 px-4 py-3 rounded-xl border border-red-200">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {loading && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-2xl border border-gray-200 shadow-sm">
            <div className="w-8 h-8 border-3 border-violet-200 border-t-violet-600 rounded-full animate-spin" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">
                Generating your coloring page...
              </p>
              <p className="text-xs text-gray-500">
                This usually takes 10-30 seconds
              </p>
            </div>
          </div>
        </div>
      )}

      {imageData && (
        <div className="mt-6">
          <ColoringPagePreview
            imageData={imageData}
            generatedPrompt={generatedPrompt}
            description={descriptionRef.current}
            onReset={reset}
          />
        </div>
      )}
    </div>
  );
}
