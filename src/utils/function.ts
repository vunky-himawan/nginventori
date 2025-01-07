/**
 * Checks if all elements in the first array are present in the second array.
 *
 * @template T - The type of elements in the arrays.
 * @param arr1 - The array whose elements need to be checked.
 * @param arr2 - The array in which the elements are searched.
 * @returns `true` if all elements of `arr1` are present in `arr2`, otherwise `false`.
 *
 * @example
 * **Example 1 (Positive result):**
 * ```typescript
 * hasAllElements([1, 2], [1, 2, 3, 4]);
 * // `true`, because all elements in arr1 are present in arr2
 * ```
 *
 * **Example 2 (Negative result):**
 * ```typescript
 * hasAllElements([1, 5], [1, 2, 3, 4]);
 * // `false`, because 5 is not present in arr2
 * ```
 */
export function hasAllElements<T>(arr1: T[], arr2: T[]): boolean {
  const set = new Set<T>(arr2);
  return arr1.every((element) => set.has(element));
}

/**
 * Checks if two arrays have any common elements.
 *
 * @template T - The type of elements in the arrays.
 * @param arr1 - The first array to compare.
 * @param arr2 - The second array to compare.
 * @returns `true` if there are common elements between the two arrays, otherwise `false`.
 *
 * @example
 * **Example 1 (Positive result):**
 * ```typescript
 * hasCommonElements([1, 2], [3, 4, 1]);
 * // `true`, because both arrays contain the element 1
 * ```
 *
 * **Example 2 (Negative result):**
 * ```typescript
 * hasCommonElements([1, 2], [3, 4]); //
 * // `false`, because there are no common elements
 * ```
 */
export function hasCommonElements<T>(arr1: T[], arr2: T[]): boolean {
  const [shorter, longer] = arr1?.length < arr2?.length ? [arr1, arr2] : [arr2, arr1];
  const set = new Set<T>(shorter);
  return longer?.some((element) => set.has(element));
}
