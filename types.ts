
export enum Genre {
  HIPHOP = "Hip Hop",
  TRAP = "Trap",
  RNB = "R&B",
  POP = "Pop",
  EDM = "EDM",
  LOFI = "Lo-Fi",
  AMBIENT = "Ambient",
  CINEMATIC = "Cinematic",
  OTHER = "Other",
}

export interface Product {
  id: string;
  title: string;
  producer: string; // For simplicity, producer name. In a real app, this would be a user ID.
  description: string;
  price: number;
  genre: Genre;
  tags: string[];
  coverImageUrl: string;
  audioFileUrl: string; // Placeholder, not used for playback
  durationMinutes?: number; // Optional duration
  bpm?: number; // Optional BPM
  key?: string; // Optional musical key
}

export interface GeminiSuggestionRequest {
  type: "title" | "description";
  productInfo: Partial<Product>;
  keywords?: string;
}
