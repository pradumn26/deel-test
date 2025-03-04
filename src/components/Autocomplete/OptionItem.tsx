import { useMemo } from "react";
import dompurify from "dompurify";

import { getMatchingParts } from "../../utils/helpers";
import { OptionItemProps } from "../../types/autocomplete";

export const OptionItem: React.FC<OptionItemProps> = ({ query, option }) => {
  // Highlight matching text in options
  const label = useMemo(() => {
    const text = option.label;

    if (!query) return text;

    const parts = getMatchingParts(text, query);

    return (
      <span>
        {parts.map((part) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={part}>{dompurify.sanitize(part)}</mark>
          ) : (
            part
          )
        )}
      </span>
    );
  }, [option.label, query]);

  return <span>{label}</span>;
};
