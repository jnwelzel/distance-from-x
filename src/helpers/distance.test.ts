import { describe, expect, test } from "vitest";
import { calculateDistance } from "./distance";

describe("calculateDistance()", () => {
  test("Calculates the distance between two valid locations", () => {
    expect(
      calculateDistance(52.7579522, 13.2516223, 52.7612306, 13.2677626)
    ).toEqual(1.15);
  });

  test("Returns 0 when invalid coordinates are provided", () => {
    expect(calculateDistance(99, 99, 99, 99)).toEqual(0);
  });
});
