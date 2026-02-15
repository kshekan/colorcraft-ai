import Link from "next/link";
import { Palette, ArrowRight } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Palette className="w-8 h-8 text-violet-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No coloring pages yet
      </h3>
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">
        Your generated coloring pages will appear here automatically. Start
        creating to build your collection!
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white font-medium rounded-xl hover:bg-violet-700 transition-colors"
      >
        Create Your First Page
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
