const SPECIAL_CHARS_MAP: Record<string, string> = {
  "'": "%27",
  '"': "%22",
  "`": "%60",
  ";": "%3B",
  "--": "%2D%2D",
  "/*": "%2F%2A",
  "*/": "%2A%2F",

  "=": "%3D",
  ">": "%3E",
  "<": "%3C",
  ">=": "%3E%3D",
  "<=": "%3C%3D",
  "!=": "%21%3D",
  "<>": "%3C%3E",

  "#": "%23",
  "%": "%25",
  "&": "%26",
  "+": "%2B",
  "-": "%2D",
  " ": "%20",
  "?": "%3F",
  "/": "%2F",
  "\\": "%5C",

  "*": "%2A",
  "(": "%28",
  ")": "%29",
  "[": "%5B",
  "]": "%5D",
  "{": "%7B",
  "}": "%7D",
  "|": "%7C",
  "^": "%5E",
  $: "%24",

  "\n": "%0A",
  "\r": "%0D",
  "\t": "%09",

  "\\n": "%5Cn",
  "\\r": "%5Cr",
  "\\t": "%5Ct",
};

export const encodeQueryParam = (value: string): string => {
  if (!value) return value;

  let encoded = String(value);

  // Replace each special character with its encoded equivalent
  Object.entries(SPECIAL_CHARS_MAP).forEach(([char, code]) => {
    encoded = encoded.split(char).join(code);
  });

  return encoded;
};

export const decodeQueryParam = (value: string): string => {
  if (!value) return value;

  let decoded = String(value);

  // Replace encoded characters back to their original form
  Object.entries(SPECIAL_CHARS_MAP).forEach(([char, code]) => {
    decoded = decoded.split(code).join(char);
  });

  try {
    // Attempt to decode using decodeURIComponent
    decoded = decodeURIComponent(decoded);
  } catch {
    console.warn("Failed to decode URL parameter:", value);
  }

  return decoded;
};

export const validateQueryParam = (value: string): boolean => {
  if (value.length > 1000) return false; // Reject if the input is too long

  const disallowedPatterns = [
    /\/\*/, // Start of SQL block comment
    /\*\//, // End of SQL block comment
    /;\s*$/, // SQL statement terminator
    /Union\s+All/i, // SQL UNION ALL
    /Exec\s*\(/i, // SQL EXEC function
    /WAITFOR\s+DELAY/i, // SQL WAITFOR DELAY
    /SELECT\s+.*\s+FROM/i, // SQL SELECT statement
    /INSERT\s+INTO/i, // SQL INSERT INTO statement
    /UPDATE\s+.*\s+SET/i, // SQL UPDATE statement
    /DELETE\s+FROM/i, // SQL DELETE statement
  ];

  // Check if any disallowed pattern is present
  return !disallowedPatterns.some((pattern) => pattern.test(value));
};

export const isUrlActive = (href: string, path: string, mainNav = false): boolean => {
  if (!path) return false;

  const cleanHref = href.split("?")[0];
  const cleanPath = path.split("?")[0];

  if (cleanHref === cleanPath) return true;

  if (mainNav) {
    const hrefFirstSegment = cleanHref.split("/")[1];
    const pathFirstSegment = cleanPath.split("/")[1];
    return hrefFirstSegment !== "" && hrefFirstSegment === pathFirstSegment;
  }

  return false;
};
