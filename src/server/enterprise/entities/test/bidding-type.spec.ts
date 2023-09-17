import { expect, it, describe } from "bun:test";
import { BiddingType } from "../bidding-type";

describe("test bidding type entity rules", () => {
  it("should instance bidding type", () => {
    const biddingType = BiddingType.create({ name: "teste" });

    expect(biddingType.name).toBeDefined();
  });

  it("should throw an error if name does not exists", async () => {
    await expect(() => {
      BiddingType.create({ name: "" });
    }).toThrow();
  });
});
