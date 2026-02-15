import { Palette } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 print:hidden">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Palette className="w-4 h-4 text-violet-600" />
          <span className="text-sm font-semibold text-gray-700">
            ColorCraft AI
          </span>
        </div>
        <p className="text-xs text-gray-500">
          AI-powered coloring pages for creative fun. Powered by Google Gemini.
        </p>
      </div>
    </footer>
  );
}
