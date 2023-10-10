import { expect, it, describe, beforeEach } from "bun:test";
import { ModuleRepository } from "../../repository/module";
import { InMemoryModuleRepository } from "../../repository/in-memory/module-in-memory-repository";
import { GetModulesUseCase } from "../get-modules-use-case";

let moduleRepository: ModuleRepository;
let sut: GetModulesUseCase;

describe("get bidding types use case suit", () => {
  beforeEach(() => {
    moduleRepository = new InMemoryModuleRepository();
    sut = new GetModulesUseCase(moduleRepository);
  });
  it("should to get all modules", async () => {
    const data = await moduleRepository.create({
      name: "John Doe",
    });

    const data2 = await moduleRepository.create({
      name: "John Doe2",
    });

    const allCreatedModules = await sut.execute();



    expect(allCreatedModules.data).toHaveLength(2);
  });
});
