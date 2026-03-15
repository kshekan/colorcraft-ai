"use client";

import { useState } from "react";
import { Sparkles, Loader2, Lightbulb, Pencil, PenTool } from "lucide-react";
import type { PageMode } from "@/lib/types";

const EXAMPLE_PROMPTS = [
  "A friendly dragon reading a book in a cozy cave",
  "An underwater scene with a sea turtle and coral reef",
  "A magical treehouse with a winding staircase",
  "A cat astronaut floating in space near a planet",
  "A garden full of giant mushrooms and tiny fairies",
];

const MODE_OPTIONS: { value: PageMode; label: string; description: string }[] =
  [
    {
      value: "coloring",
      label: "Coloring",
      description: "Bold solid outlines to fill in with color",
    },
    {
      value: "tracing-simple",
      label: "Simple Tracing",
      description: "Dotted outlines for young learners to trace",
    },
    {
      value: "tracing-detailed",
      label: "Detailed Tracing",
      description: "Intricate dotted outlines for a challenge",
    },
  ];

interface GeneratorFormProps {
  onGenerate: (description: string, mode: PageMode) => void;
  loading: boolean;
  initialDescription?: string;
  initialMode?: PageMode;
}

export default function GeneratorForm({
  onGenerate,
  loading,
  initialDescription = "",
  initialMode = "coloring",
}: GeneratorFormProps) {
  const [description, setDescription] = useState(initialDescription);
  const [mode, setMode] = useState<PageMode>(initialMode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim() && !loading) {
      onGenerate(description.trim(), mode);
    }
  };

  const useExample = (prompt: string) => {
    setDescription(prompt);
  };

  const isTracing = mode.startsWith("tracing");

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Page type
        </label>
        <div className="grid grid-cols-3 gap-2">
          {MODE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setMode(opt.value)}
              disabled={loading}
              className={`relative flex flex-col items-center gap-1 px-3 py-3 rounded-xl border-2 text-center transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                mode === opt.value
                  ? "border-violet-500 bg-violet-50 text-violet-700"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {opt.value === "coloring" ? (
                <PenTool className="w-5 h-5" />
              ) : (
                <Pencil className="w-5 h-5" />
              )}
              <span className="text-sm font-medium leading-tight">
                {opt.label}
              </span>
              <span className="text-[10px] leading-tight text-gray-400 hidden sm:block">
                {opt.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Describe your {isTracing ? "tracing" : "coloring"} page
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={
            isTracing
              ? "e.g., The letters A B C with a friendly animal next to each..."
              : "e.g., A friendly dragon reading a book in a cozy cave..."
          }
          rows={4}
          maxLength={500}
          disabled={loading}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-gray-400">
            {isTracing
              ? 'Pro tip: Try "letters" or "numbers" for handwriting practice'
              : 'Pro tip: Add "simple" for kids or "intricate" for adults'}
          </span>
          <span className="text-xs text-gray-400">
            {description.length}/500
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={!description.trim() || loading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 text-white font-semibold rounded-xl hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Creating your {isTracing ? "tracing" : "coloring"} page...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generate {isTracing ? "Tracing" : "Coloring"} Page
          </>
        )}
      </button>

      <div className="bg-violet-50 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-violet-600" />
          <span className="text-sm font-medium text-violet-800">
            Need inspiration? Try one of these:
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => useExample(prompt)}
              disabled={loading}
              className="text-xs px-3 py-1.5 bg-white text-violet-700 rounded-full border border-violet-200 hover:bg-violet-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}
