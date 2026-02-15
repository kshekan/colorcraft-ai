import { get, set, del, keys } from "idb-keyval";
import type { ColoringPage } from "./types";

const KEY_PREFIX = "colorcraft:page:";

function pageKey(id: string) {
  return `${KEY_PREFIX}${id}`;
}

export async function savePage(page: ColoringPage): Promise<void> {
  await set(pageKey(page.id), page);
}

export async function getPage(id: string): Promise<ColoringPage | undefined> {
  return get<ColoringPage>(pageKey(id));
}

export async function deletePage(id: string): Promise<void> {
  await del(pageKey(id));
}

export async function getAllPages(): Promise<ColoringPage[]> {
  const allKeys = await keys();
  const pageKeys = allKeys.filter(
    (k) => typeof k === "string" && k.startsWith(KEY_PREFIX)
  );

  const pages: ColoringPage[] = [];
  for (const key of pageKeys) {
    const page = await get<ColoringPage>(key);
    if (page) pages.push(page);
  }

  // Sort newest first
  pages.sort((a, b) => b.createdAt - a.createdAt);
  return pages;
}

export async function toggleFavorite(id: string): Promise<ColoringPage | undefined> {
  const page = await getPage(id);
  if (!page) return undefined;
  page.favorite = !page.favorite;
  await savePage(page);
  return page;
}
