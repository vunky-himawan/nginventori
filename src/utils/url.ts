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

/**
 * Encodes a query parameter by replacing special characters with their URL-encoded equivalents.
 *
 * @param {string} value - The input string to be encoded.
 * @returns {string} - The URL-encoded string.
 *
 * @example
 * ```typescript
 * const query = "name=John Doe&age=25";
 * const encoded = encodeQueryParam(query);
 * console.log(encoded); // Output: "name%3DJohn%20Doe%26age%3D25"
 * ```
 */
export const encodeQueryParam = (value: string): string => {
  if (!value) return value;

  let encoded = String(value);

  // Replace each special character with its encoded equivalent
  Object.entries(SPECIAL_CHARS_MAP).forEach(([char, code]) => {
    encoded = encoded.split(char).join(code);
  });

  return encoded;
};

/**
 * Decodes a URL-encoded query parameter back to its original form.
 *
 * @param {string} value - The URL-encoded string to decode.
 * @returns {string} - The decoded string.
 *
 * @example
 * ```typescript
 * const encoded = "name%3DJohn%20Doe%26age%3D25";
 * const decoded = decodeQueryParam(encoded);
 * console.log(decoded); // Output: "name=John Doe&age=25"
 * ```
 */
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

/**
 * Sanitizes a query parameter to prevent SQL injection or other malicious inputs.
 *
 * @param {string} value - The input string to be sanitized.
 * @returns {string} - The sanitized string.
 *
 * @example
 * ```typescript
 * const unsafeValue = "DROP TABLE users; --";
 * const safeValue = sanitizeQueryValue(unsafeValue);
 * console.log(safeValue); // Output: "DROP TABLE users\\; \\--"
 * ```
 */
export const sanitizeQueryValue = (value: string): string => {
  if (!value) return value;

  return value
    .replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
      switch (char) {
        case "\0":
          return "\\0";
        case "\x08":
          return "\\b";
        case "\x09":
          return "\\t";
        case "\x1a":
          return "\\z";
        case "\n":
          return "\\n";
        case "\r":
          return "\\r";
        case '"':
        case "'":
        case "\\":
        case "%":
          return "\\" + char;
      }
      return char;
    })
    .replace(/[^\x20-\x7E]/g, ""); // Remove non-ASCII printable characters
};

/**
 * Validates a query parameter by checking its length and ensuring it does not contain disallowed patterns.
 *
 * @param {string} value - The query parameter to validate.
 * @returns {boolean} - Returns `true` if the query parameter is valid, otherwise `false`.
 *
 * @example
 * ```typescript
 * const valid = validateQueryParam("SELECT * FROM users");
 * console.log(valid); // Output: false
 * ```
 */
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
