// @vitest-environment nuxt
import { describe, expect, it } from "vitest";

describe("hello", () => {
  it("hello text", () => {
    const helloWorld = "Hello World";
    expect(helloWorld).toBe("Hello World");
  });
});
