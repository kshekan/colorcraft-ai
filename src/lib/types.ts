export interface ColoringPage {
  id: string;
  description: string;
  imageData: string;
  createdAt: number;
  favorite: boolean;
}

export interface GenerateRequest {
  description: string;
}

export interface GenerateResponse {
  imageData: string;
  generatedPrompt?: string;
  error?: string;
}
