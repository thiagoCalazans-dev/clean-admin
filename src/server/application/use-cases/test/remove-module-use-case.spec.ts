import { expect, it, describe, beforeEach } from "bun:test";
import { ModuleRepository } from "../../repository/module";
import { InMemoryModuleRepository } from "../../repository/in-memory/module-in-memory-repository";
import { RemoveModulesUseCase } from "../remove-module-use-case";
import { ResourceNotFoundError } from "@/server/errors/ResourceNotFoundError";

let moduleRepository: ModuleRepository;
let sut: RemoveModulesUseCase;

describe("create bidding type use case suit", () => {
  beforeEach(() => {
    moduleRepository = new InMemoryModuleRepository();
    sut = new RemoveModulesUseCase(moduleRepository);
  });
  it("should remove module ", async () => {
    const name = "nome";
    await moduleRepository.create({
      name,
    });

    const data = await moduleRepository.findByName("nome");

    const deletedData = await sut.execute(data!.id);

    expect(deletedData).toBeUndefined();
  });

  it("should throw an error if module not found in remove method", async () => {
    const id = "inexistentId";

    await expect(() => sut.execute(id)).toThrow(
      new ResourceNotFoundError("Module")
    );
  });
});
