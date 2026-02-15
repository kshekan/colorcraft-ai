export function buildColoringPrompt(description: string): string {
  return `Generate a black and white coloring book page. Clean bold outlines on white background. Line art only, no shading, no gray, no color. Professional children's coloring book style. Large areas for coloring. Portrait 3:4 ratio. Scene: ${description}`;
}

export const GEMINI_MODEL = "gemini-2.5-flash-image";
