import { Palette, Sparkles, Printer, Save, Shield } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Generation",
    description:
      "Describe any scene, character, or theme and watch it transform into a beautiful coloring page using Google Gemini.",
  },
  {
    icon: Printer,
    title: "Print-Ready Quality",
    description:
      "Every page is generated as a high-quality image, perfect for printing. Clean outlines ideal for crayons, markers, or colored pencils.",
  },
  {
    icon: Save,
    title: "Auto-Save Gallery",
    description:
      "Your creations are automatically saved to your browser. Build a collection and download anytime.",
  },
  {
    icon: Shield,
    title: "Safe & Private",
    description:
      "All pages are stored locally on your device. No account needed, no data shared with third parties.",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Palette className="w-8 h-8 text-violet-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          About ColorCraft AI
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          A free tool that turns your imagination into printable coloring pages.
          Powered by Google Gemini.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
          >
            <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center mb-3">
              <Icon className="w-5 h-5 text-violet-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        ))}
      </div>

      <div className="bg-violet-50 rounded-2xl p-6 text-center">
        <h2 className="text-lg font-semibold text-violet-900 mb-2">
          How It Works
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-violet-700">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 bg-violet-200 text-violet-800 rounded-full flex items-center justify-center font-bold text-xs">
              1
            </span>
            Describe your page
          </div>
          <span className="hidden sm:block text-violet-300">&rarr;</span>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 bg-violet-200 text-violet-800 rounded-full flex items-center justify-center font-bold text-xs">
              2
            </span>
            AI generates your page
          </div>
          <span className="hidden sm:block text-violet-300">&rarr;</span>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 bg-violet-200 text-violet-800 rounded-full flex items-center justify-center font-bold text-xs">
              3
            </span>
            Print & color!
          </div>
        </div>
      </div>
    </div>
  );
}
