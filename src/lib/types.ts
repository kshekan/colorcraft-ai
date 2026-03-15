export type PageMode = "coloring" | "tracing-simple" | "tracing-detailed";

export interface ColoringPage {
  id: string;
  description: string;
  imageData: string;
  createdAt: number;
  favorite: boolean;
  mode?: PageMode;
}

export interface GenerateRequest {
  description: string;
  mode?: PageMode;
}

export interface GenerateResponse {
  imageData: string;
  generatedPrompt?: string;
  error?: string;
}
