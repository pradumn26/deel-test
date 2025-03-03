import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  AutocompleteOption,
  AutocompleteProps,
} from "../../types/autocomplete";
import { searchOptions } from "../../services/search";

export const Autocomplete: React.FC<AutocompleteProps> = ({
  placeholder = "Search...",
  minChars = 2,
  debounceMs = 300,
  onSelect,
}) => {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<AutocompleteOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showOptions, setShowOptions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<number>(0);

  // Memoized search function to prevent unnecessary re-renders
  const searchData = useCallback(
    async (searchQuery: string) => {
      if (searchQuery.length < minChars) {
        setOptions([]);
        return;
      }

      setLoading(true);
      try {
        const results = await searchOptions(searchQuery);
        setOptions(results);
      } catch (error) {
        console.error("Search failed:", error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    },
    [minChars]
  );

  // Handle input changes with debouncing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowOptions(true);

    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer
    debounceTimer.current = setTimeout(() => {
      searchData(value);
    }, debounceMs);
  };

  // Highlight matching text in options
  const highlightMatch = (text: string) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <span>
        {parts.map((part) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={part}>{part}</mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < options.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        if (selectedIndex >= 0 && options[selectedIndex]) {
          handleSelect(options[selectedIndex]);
        }
        break;
      case "Escape":
        setShowOptions(false);
        break;
    }
  };

  const handleSelect = (option: AutocompleteOption) => {
    setQuery(option.label);
    setShowOptions(false);
    setSelectedIndex(-1);
    onSelect?.(option);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-md" ref={inputRef}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowOptions(true)}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        aria-label="Search"
        aria-expanded={showOptions}
        aria-controls="autocomplete-list"
        aria-activedescendant={
          selectedIndex >= 0 ? `option-${selectedIndex}` : undefined
        }
      />

      {loading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          Loading...
        </div>
      )}

      {showOptions && options.length > 0 && (
        <ul
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
          id="autocomplete-list"
          role="listbox"
        >
          {options.map((option, index) => (
            <li
              key={option.id}
              id={`option-${index}`}
              role="option"
              aria-selected={index === selectedIndex}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                index === selectedIndex ? "bg-gray-100" : ""
              }`}
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              {highlightMatch(option.label)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
