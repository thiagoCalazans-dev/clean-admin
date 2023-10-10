import { expect, it, describe } from "bun:test";
import { Module } from "../module";

describe("test module entity rules", () => {
  it("should instance module", () => {
    const systemModule = Module.create({ name: "teste" });

    expect(systemModule.name).toBeDefined();
  });

  it("should throw an error if name does not exists", async () => {
    await expect(() => {
      Module.create({ name: "" });
    }).toThrow();
  });
});
