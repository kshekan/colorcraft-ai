"use client";

import { Heart, Trash2, Download } from "lucide-react";
import type { ColoringPage } from "@/lib/types";
import { downloadPng } from "@/lib/image-utils";

interface GalleryCardProps {
  page: ColoringPage;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export default function GalleryCard({
  page,
  onDelete,
  onToggleFavorite,
}: GalleryCardProps) {
  const handleDownload = () => {
    const slug = page.description
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40);
    downloadPng(page.imageData, `colorcraft-${slug}.png`);
  };

  const formattedDate = new Date(page.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
      <div className="w-full aspect-[3/4] bg-gray-50 overflow-hidden p-3 flex items-center justify-center">
        <img
          src={`data:image/png;base64,${page.imageData}`}
          alt={page.description}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      <div className="p-3">
        <p className="text-sm text-gray-900 font-medium line-clamp-2 mb-1">
          {page.description}
        </p>
        <p className="text-xs text-gray-400 mb-3">{formattedDate}</p>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onToggleFavorite(page.id)}
            className={`p-2 rounded-lg transition-colors ${
              page.favorite
                ? "text-red-500 bg-red-50 hover:bg-red-100"
                : "text-gray-400 hover:text-red-500 hover:bg-red-50"
            }`}
            title={page.favorite ? "Unfavorite" : "Favorite"}
          >
            <Heart
              className="w-4 h-4"
              fill={page.favorite ? "currentColor" : "none"}
            />
          </button>
          <button
            onClick={handleDownload}
            className="p-2 rounded-lg text-gray-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"
            title="Download PNG"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(page.id)}
            className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors ml-auto"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
