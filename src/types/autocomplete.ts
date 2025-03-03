export interface AutocompleteOption {
  id: string | number;
  label: string;
}

export interface AutocompleteProps {
  placeholder?: string;
  minChars?: number;
  debounceMs?: number;
  onSelect: (option: AutocompleteOption) => void;
}
