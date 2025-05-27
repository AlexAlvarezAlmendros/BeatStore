
import { Genre } from './types';

export const APP_NAME = "Beat Bazaar";
export const GEMINI_API_MODEL_TEXT = "gemini-2.5-flash-preview-04-17";

export const GENRE_OPTIONS = Object.values(Genre).map(genre => ({
  value: genre,
  label: genre,
}));

export const MOCK_PRODUCER_NAME = "AI Producer"; // Default producer for AI generated content

export const INITIAL_PRODUCTS_COUNT = 6;
