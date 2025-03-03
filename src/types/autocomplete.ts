export interface AutocompleteOption {
  id: string | number;
  label: string;
}

export interface AutocompleteProps {
  onSelect: (option: AutocompleteOption) => void;
}
