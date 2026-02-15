"use client";

import { Image, Loader2 } from "lucide-react";
import GalleryGrid from "@/components/GalleryGrid";
import { useGallery } from "@/hooks/useGallery";

export default function GalleryPage() {
  const { pages, loading, removePage, toggleFavorite } = useGallery();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-2">
          <Image className="w-6 h-6 text-violet-600" />
          <h1 className="text-3xl font-bold text-gray-900">My Gallery</h1>
        </div>
        <p className="text-gray-500">
          All your generated coloring pages, saved automatically.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 text-violet-600 animate-spin" />
        </div>
      ) : (
        <>
          {pages.length > 0 && (
            <p className="text-sm text-gray-400 mb-4">
              {pages.length} {pages.length === 1 ? "page" : "pages"}
            </p>
          )}
          <GalleryGrid
            pages={pages}
            onDelete={removePage}
            onToggleFavorite={toggleFavorite}
          />
        </>
      )}
    </div>
  );
}
