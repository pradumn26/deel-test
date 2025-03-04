export const getMatchingParts = (text: string, query: string) => {
  // split the text into parts
  let parts = text.toLowerCase().split(query.toLowerCase());
  // insert the query into the parts
  for (let i = 1; i < parts.length; i = i + 2) {
    parts.splice(i, 0, query.toLowerCase());
  }
  // get the start index of the part
  let startIndex = 0;
  parts = parts.map((part, index) => {
    if (index > 0) {
      startIndex += parts[index - 1].length;
    }

    return text.substring(startIndex, startIndex + part.length);
  });
  return parts;
};
