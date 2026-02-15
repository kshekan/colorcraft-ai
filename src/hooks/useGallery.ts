"use client";

import { useState, useEffect, useCallback } from "react";
import { nanoid } from "nanoid";
import type { ColoringPage } from "@/lib/types";
import {
  getAllPages,
  savePage,
  deletePage as deletePageFromDb,
  toggleFavorite as toggleFavoriteInDb,
} from "@/lib/storage";

export function useGallery() {
  const [pages, setPages] = useState<ColoringPage[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const allPages = await getAllPages();
    setPages(allPages);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addPage = useCallback(
    async (description: string, imageData: string) => {
      const page: ColoringPage = {
        id: nanoid(),
        description,
        imageData,
        createdAt: Date.now(),
        favorite: false,
      };
      await savePage(page);
      await refresh();
      return page;
    },
    [refresh]
  );

  const removePage = useCallback(
    async (id: string) => {
      await deletePageFromDb(id);
      await refresh();
    },
    [refresh]
  );

  const toggleFavorite = useCallback(
    async (id: string) => {
      await toggleFavoriteInDb(id);
      await refresh();
    },
    [refresh]
  );

  return { pages, loading, addPage, removePage, toggleFavorite, refresh };
}
