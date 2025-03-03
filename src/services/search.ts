import { AutocompleteOption } from "../types/autocomplete";

// Mock data
const mockData: AutocompleteOption[] = [
  { id: 1, label: "Apple" },
  { id: 2, label: "Banana" },
  { id: 3, label: "Orange" },
  { id: 4, label: "Mango" },
  { id: 5, label: "Pineapple" },
];

export const searchOptions = async (
  query: string
): Promise<AutocompleteOption[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Case-insensitive search
  return mockData.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );
};

// Real API implementation example
export const searchOptionsAPI = async (
  query: string
): Promise<AutocompleteOption[]> => {
  try {
    const response = await fetch(
      `https://api.example.com/search?q=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error("Search failed");
    return await response.json();
  } catch (error) {
    console.error("API search failed:", error);
    return [];
  }
};
