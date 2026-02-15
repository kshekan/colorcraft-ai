"use client";

import { Download, Printer, RotateCcw } from "lucide-react";
import { downloadPng, printImage } from "@/lib/image-utils";

interface ColoringPagePreviewProps {
  imageData: string;
  generatedPrompt?: string | null;
  description: string;
  onReset: () => void;
}

export default function ColoringPagePreview({
  imageData,
  generatedPrompt,
  description,
  onReset,
}: ColoringPagePreviewProps) {
  const slugifiedName = description
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);

  const handleDownloadPng = () => {
    downloadPng(imageData, `colorcraft-${slugifiedName}.png`);
  };

  const handlePrint = () => {
    printImage(imageData, description);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
        <div className="w-full aspect-[3/4] bg-white rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={`data:image/png;base64,${imageData}`}
            alt={description}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        {generatedPrompt && (
          <p className="mt-3 text-xs text-gray-400 text-center italic">
            {generatedPrompt}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleDownloadPng}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-violet-600 text-white font-medium rounded-xl hover:bg-violet-700 transition-colors text-sm"
        >
          <Download className="w-4 h-4" />
          Download PNG
        </button>
        <button
          onClick={handlePrint}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-violet-600 text-white font-medium rounded-xl hover:bg-violet-700 transition-colors text-sm"
        >
          <Printer className="w-4 h-4" />
          Print
        </button>
      </div>

      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm"
      >
        <RotateCcw className="w-4 h-4" />
        Create Another
      </button>
    </div>
  );
}
