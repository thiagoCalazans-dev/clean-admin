import { CreateModuleDTO } from "@/server/application/dto/module-dto";
import { makeCreateModuleUseCase } from "@/server/application/factories/makeCreateModuleUseCase";
import { makeGetModulesUseCase } from "@/server/application/factories/makeGetModulesUseCase";
import { makeRemoveModulesUseCase } from "@/server/application/factories/makeRemoveModuleUseCase";
import { RequiredError } from "@/server/errors/RequiredError"
import { ResourceAlreadyExistError } from "@/server/errors/ResourceAlreadyExistsError";
import { ResourceNotFoundError } from "@/server/errors/ResourceNotFoundError";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export class ModuleController {
  constructor() {}
  static async POST(request: Request) {
    const body: CreateModuleDTO = await request.json();

    try {
      const moduleUseCase = makeCreateModuleUseCase();

      await moduleUseCase.execute(body);

      revalidateTag("modules");

      return NextResponse.json({ status: 201 });
    } catch (error) {
      if (error instanceof ResourceAlreadyExistError)
        return NextResponse.json(null, {
          status: error.status,
          statusText: error.message,
        });

      console.error(error);
      return NextResponse.json(null, {
        status: 500,
        statusText: "Something went wrong!",
      });
    }
  }

  static async GET() {
    try {
      const moduleUseCase = makeGetModulesUseCase();

      const response = await moduleUseCase.execute();

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json(null, {
        status: 500,
        statusText: "Something went wrong!",
      });
    }
  }

  static async DELETE(
    request: Request,
    params: {
      moduleId: string;
    }
  ) {
    const id = params.moduleId;

    try {
      const moduleUseCase = makeRemoveModulesUseCase();
      await moduleUseCase.execute(id);
      revalidateTag("modules");
      return NextResponse.json(null, {
        status: 200,
        statusText: "Bidding type removed",
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return NextResponse.json(null, {
          status: error.status,
          statusText: error.message,
        });
      }

      if (error instanceof RequiredError)
        return NextResponse.json(null, {
          status: error.status,
          statusText: error.message,
        });

      console.error(error);
      return NextResponse.json(null, {
        status: 500,
        statusText: "Something went wrong!",
      });
    }
  }
}
