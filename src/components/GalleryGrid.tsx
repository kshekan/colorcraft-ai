"use client";

import type { ColoringPage } from "@/lib/types";
import GalleryCard from "./GalleryCard";
import EmptyState from "./EmptyState";

interface GalleryGridProps {
  pages: ColoringPage[];
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export default function GalleryGrid({
  pages,
  onDelete,
  onToggleFavorite,
}: GalleryGridProps) {
  if (pages.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {pages.map((page) => (
        <GalleryCard
          key={page.id}
          page={page}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
