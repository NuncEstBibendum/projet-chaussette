// Add this function to calculate similarity percentage between two strings
const calculateSimilarity = (str1: string, str2: string): number => {
  // Trim whitespace and convert to lowercase at the start
  const normalizedStr1 = str1.trim().toLowerCase();
  const normalizedStr2 = str2.trim().toLowerCase();

  const longer = normalizedStr1.length >= normalizedStr2.length ? normalizedStr1 : normalizedStr2;
  const shorter = normalizedStr1.length >= normalizedStr2.length ? normalizedStr2 : normalizedStr1;

  if (longer.length === 0) return 1.0;

  // Calculate Levenshtein distance
  const costs: number[] = [];
  for (let i = 0; i <= shorter.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= longer.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else {
        if (j > 0) {
          let newValue = costs[j - 1];
          if (shorter[i - 1] !== longer[j - 1]) {
            // Removed toLowerCase() since strings are already lowercase
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[costs.length - 1] = lastValue;
  }

  // Calculate similarity percentage
  return ((longer.length - costs[costs.length - 1]) / longer.length) * 100;
};

export default calculateSimilarity;
