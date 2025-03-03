import { AutocompleteOption } from "../types/autocomplete";
import mockData from "../data/search-mock.json";

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
