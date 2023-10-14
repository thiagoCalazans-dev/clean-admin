import { expect, it, describe, beforeEach, beforeAll } from "bun:test";
import { InMemoryModuleRepository } from "../../repository/in-memory/module-in-memory-repository";

import { CreateAmendmentModuleUseCase } from "../create-amendment-module-use-case";

import { AmendmentModule } from "@/server/enterprise/entities/amendment-module";
import { InMemoryAmendmentModuleRepository } from "../../repository/in-memory/amendment-module-in-memory-repository";
import { InMemoryAmendmentRepository } from "../../repository/in-memory/amendment-in-memory-repository";

let amendmentRepository: InMemoryAmendmentRepository;
let moduleRepository: InMemoryModuleRepository;
let amendmentModuleRepository: InMemoryAmendmentModuleRepository;
let sut: CreateAmendmentModuleUseCase;

describe("Amendment Module use case", () => {
  beforeEach(() => {
    amendmentRepository = new InMemoryAmendmentRepository();
    moduleRepository = new InMemoryModuleRepository();
    amendmentModuleRepository = new InMemoryAmendmentModuleRepository();

    sut = new CreateAmendmentModuleUseCase(
      amendmentRepository,
      moduleRepository,
      amendmentModuleRepository
    );
  });
  it("should create a amendmentModule", async () => {
    await amendmentRepository.amendments.push({
      id: "randomId",
      number: 1,
      contractId: "contradId",
      dueDate: new Date(),
      subscriptionDate: new Date(),
      value: 20,
    });

    await moduleRepository.modules.push({
      id: "randomId",
      name: "modulo",
    });

    const amendmentModule: AmendmentModule = {
      amendmentId: "randomId",
      moduleId: "randomId",
      value: 3000,
    };

    await sut.execute({
      data: amendmentModule,
    });

    const data = await amendmentModuleRepository.findByAmendmentIdAndModuleId(
      "randomId",
      "randomId"
    );

    expect(data!.id).toEqual(expect.any(String));
  });

  //   it("should not create a amendment with inexistent amendmentId", async () => {
  //    const amendmentModule: AmendmentModule = {
  //      amendmentId: "",
  //      moduleId: "moduleId",
  //      value: 3000.98,
  //    };

  //     const dto = { data: amendmentModule };
  // amendmentModule;
  //     await expect(() => sut.execute(dto)).toThrow(
  //       new ResourceNotFoundError("amendmentId")
  //     );
  //   });

  //   it("should not create a amendment with amendmentID and ModuleId equals", async () => {
  //      const amendmentModule: AmendmentModule = {
  //        amendmentId: "",
  //        moduleId: "moduleId",
  //        value: 3000.98,
  //      };

  //     const dto = { data: amendmentModule };

  //     await sut.execute(dto);

  //     await expect(() => sut.execute(dto)).toThrow(
  //       new ResourceAlreadyExistError("AmendmentModule")
  //     );
  //   });
});
