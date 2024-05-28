import { describe, expect, test } from "vitest";
import {
  calculateDistance,
  isValidLatitude,
  isValidLongitude,
} from "./coordinates";

describe("calculateDistance()", () => {
  test("Calculates the distance between two valid locations", () => {
    expect(
      calculateDistance(52.7579522, 13.2516223, 52.7612306, 13.2677626)
    ).toEqual(1.15);
  });

  test("Returns 0 when invalid coordinates are provided", () => {
    expect(calculateDistance(99, 99, 99, 99)).toEqual(0);
  });

  test("Returns 0 when both coordinates are the same", () => {
    expect(
      calculateDistance(52.7579522, 13.2516223, 52.7579522, 13.2516223)
    ).toEqual(0);
  });
});

describe("isValidLatitude()", () => {
  test("Returns true when value is valid", () => {
    expect(isValidLatitude("52.7579522")).toBeTruthy();
  });
  test("Returns false when value is invalid", () => {
    expect(isValidLatitude("99")).toBeFalsy();
  });
});

describe("isValidLongitude()", () => {
  test("Returns true when value is valid", () => {
    expect(isValidLongitude("13.2516223")).toBeTruthy();
  });
  test("Returns false when value is invalid", () => {
    expect(isValidLongitude("99")).toBeFalsy();
  });
});
