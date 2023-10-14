import { expect, it, describe, beforeEach } from "bun:test";
import { ModuleRepository } from "../../repository/module";
import { InMemoryModuleRepository } from "../../repository/in-memory/module-in-memory-repository";
import { RemoveModulesUseCase } from "../remove-module-use-case";
import { AmendmentModuleRepository } from "../../repository/amendment-module";
import { InMemoryAmendmentModuleRepository } from "../../repository/in-memory/amendment-module-in-memory-repository";
import { RemoveAmendmentModuleUseCase } from "../remove-amendment-module-use-case ";
import { ResourceNotFoundError } from "@/server/errors/ResourceNotFoundError";


let amedmentModuleRepository: AmendmentModuleRepository;
let sut: RemoveAmendmentModuleUseCase;

describe("remove amendment module type use case suit", () => {
  beforeEach(() => {
    amedmentModuleRepository = new InMemoryAmendmentModuleRepository();
    sut = new RemoveAmendmentModuleUseCase(amedmentModuleRepository);
  });
  it("should remove module ", async () => {
    const name = "nome";
    await amedmentModuleRepository.create({
      amendmentId: "aaaa",
      moduleId: "aaaa",
      value: 30 
    });

    const data = await amedmentModuleRepository.findByAmendmentIdAndModuleId(
      "aaaa", "aaaa"
    );

    const deletedData = await sut.execute(data!.id);

    expect(deletedData).toBeUndefined();
  });

  it("should throw an error if module not found in remove method", async () => {
    const id = "inexistentId";

    await expect(() => sut.execute(id)).toThrow(
      new ResourceNotFoundError("Amendment module")
    );
  });
});
