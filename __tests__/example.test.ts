// Example test case
function add(a: number, b: number): number {
  return a + b;
}

describe("add function", () => {
  it("should return correct sum for positive numbers", () => {
    const result = add(2, 3);
    expect(result).toBe(5);
  });

  it("should return correct sum when one number is negative", () => {
    const result = add(-2, 3);
    expect(result).toBe(1);
  });

  it("should return correct sum when one number is zero", () => {
    const result = add(0, 3);
    expect(result).toBe(3);
  });

  it("should return correct sum for negative numbers", () => {
    const result = add(-2, -3);
    expect(result).toBe(-5);
  });
});
