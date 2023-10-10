import { expect, it, describe, beforeEach } from "bun:test";
import { ModuleRepository } from "../../repository/module";
import { CreateModule } from "../create-module-use-case";
import { InMemoryModuleRepository } from "../../repository/in-memory/module-in-memory-repository";
import { CreateModuleDTO } from "../../dto/module-dto";
import { ResourceAlreadyExistError } from "@/server/errors/ResourceAlreadyExistsError";

let moduleRepository: ModuleRepository;
let sut: CreateModule;

describe("create module use case suit", () => {
  beforeEach(() => {
    moduleRepository = new InMemoryModuleRepository();
    sut = new CreateModule(moduleRepository);
  });
  it("should create a module", async () => {
    const dto: CreateModuleDTO = {
      data: {
        name: "nome",
      },
    };

    await sut.execute(dto);

    const data = await moduleRepository.findByName("nome");

    expect(data!.id).toEqual(expect.any(String));
  });

  it("should throw ResourceAlreadyExistError when a module with the same name exists", async () => {
    const dto: CreateModuleDTO = {
      data: {
        name: "nome",
      },
    };

    await moduleRepository.create({ name: "nome" });

    await expect(() => sut.execute(dto)).toThrow(
      new ResourceAlreadyExistError("module")
    );
  });
});
