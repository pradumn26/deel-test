import dompurify from "dompurify";

import { AutocompleteOption } from "../types/autocomplete";
import mockData from "../data/search-mock.json";

const MAX_RESULTS = 10;

export const searchOptions = async (
  query: string
): Promise<AutocompleteOption[]> => {
  // Sanitize the query
  const sanitizedQuery = dompurify.sanitize(query);

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Case-insensitive search
  return mockData
    .filter((item) =>
      item.label.toLowerCase().includes(sanitizedQuery.toLowerCase())
    )
    .slice(0, MAX_RESULTS);
};
