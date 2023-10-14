import { CreateAmendmentModuleDTO } from "@/server/application/dto/amendment-module-dto";
import { CreateModuleDTO } from "@/server/application/dto/module-dto";
import { makeCreateAmendmentModuleUseCase } from "@/server/application/factories/makeCreateAmendmentModuleUseCase";
import { makeCreateModuleUseCase } from "@/server/application/factories/makeCreateModuleUseCase";
import { makeGetModulesUseCase } from "@/server/application/factories/makeGetModulesUseCase";
import { makeRemoveAmendmentModuleUseCase } from "@/server/application/factories/makeRemoveAmendmentModuleUseCase";
import { makeRemoveModulesUseCase } from "@/server/application/factories/makeRemoveModuleUseCase";
import { RequiredError } from "@/server/errors/RequiredError";
import { ResourceAlreadyExistError } from "@/server/errors/ResourceAlreadyExistsError";
import { ResourceNotFoundError } from "@/server/errors/ResourceNotFoundError";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export class AmendmentModuleController {
  constructor() {}
  static async POST(request: Request) {
    const body: CreateAmendmentModuleDTO = await request.json();

    console.log("=====>", body)

    try {
      const amendmentModuleUseCase = makeCreateAmendmentModuleUseCase();

      await amendmentModuleUseCase.execute(body);

      revalidateTag("amendment");

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

  static async DELETE(
    request: Request,
    params: {
      amendmentModuleId: string;
    }
  ) {
    const id = params.amendmentModuleId;

    try {
      const amendmentModuleUseCase = makeRemoveAmendmentModuleUseCase();
      await amendmentModuleUseCase.execute(id);
      revalidateTag("modules");
      return NextResponse.json(null, {
        status: 200,
        statusText: "Módulo removido do aditivo",
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
