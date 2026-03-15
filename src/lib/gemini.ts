import type { PageMode } from "./types";

export function buildColoringPrompt(
  description: string,
  mode: PageMode = "coloring"
): string {
  if (mode === "tracing-simple") {
    return `Generate a black and white tracing worksheet page for young children. Use DOTTED lines (small evenly-spaced dots forming the outlines) instead of solid lines — the child will trace over the dots with a pencil. Simple shapes with minimal detail. Large, chunky outlines made of dots. Very few elements, big and easy to trace. White background. Portrait 3:4 ratio. Scene: ${description}`;
  }

  if (mode === "tracing-detailed") {
    return `Generate a black and white tracing worksheet page. Use DOTTED lines (small evenly-spaced dots forming the outlines) instead of solid lines — the user will trace over the dots with a pencil. Detailed and intricate design with many elements. Fine dotted outlines with moderate complexity. White background. Portrait 3:4 ratio. Scene: ${description}`;
  }

  return `Generate a black and white coloring book page. Clean bold outlines on white background. Line art only, no shading, no gray, no color. Professional children's coloring book style. Large areas for coloring. Portrait 3:4 ratio. Scene: ${description}`;
}

export const GEMINI_MODEL = "gemini-2.5-flash-image";
