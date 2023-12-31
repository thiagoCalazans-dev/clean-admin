import { CreateAmendmentDTO } from "@/server/application/dto/amendment-dto";
import { makeCreateAmendmentUseCase } from "@/server/application/factories/makeCreateAmendmentUseCase";
import { makeFetchAmendmentsUseCase } from "@/server/application/factories/makeFetchAmendmentUseCase";
import { makeRemoveAmendmentsUseCase } from "@/server/application/factories/makeRemoveAmendmentUseCase";
import { InvalidContractPeriodError } from "@/server/errors/InvalidContractPeriodError";
import { RequiredError } from "@/server/errors/RequiredError";
import { ResourceAlreadyExistError } from "@/server/errors/ResourceAlreadyExistsError";
import { ResourceNotFoundError } from "@/server/errors/ResourceNotFoundError";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export class AmendmentController {
  constructor() {}
  static async POST(request: Request) {
    const body: CreateAmendmentDTO = await request.json();

    console.log("amendment_body", body);

    try {
      const amendmentUseCase = makeCreateAmendmentUseCase();

      await amendmentUseCase.execute(body);

      revalidateTag("amendments");

      return NextResponse.json({ status: 201 });
    } catch (error) {
      if (error instanceof ResourceAlreadyExistError)
        return NextResponse.json(null, {
          status: error.status,
          statusText: error.message,
        });
      if (error instanceof RequiredError)
        return NextResponse.json(null, {
          status: error.status,
          statusText: error.message,
        });

      if (error instanceof InvalidContractPeriodError)
        return NextResponse.json(null, {
          status: error.status,
          statusText: error.message,
        });

      console.error("amendmentoERROR", error);
      return NextResponse.json(null, {
        status: 500,
        statusText: "Something went wrong!",
      });
    }
  }

  static async FETCH(
    request: Request,
    params: {
      amendmentId: string;
    }
  ) {
    const id = params.amendmentId;

    try {
      const amendmentUseCase = makeFetchAmendmentsUseCase();

      const response = await amendmentUseCase.execute(id);

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
      amendmentId: string;
    }
  ) {
    const id = params.amendmentId;

    try {
      const amendmentUseCase = makeRemoveAmendmentsUseCase();
      await amendmentUseCase.execute(id);
      revalidateTag("amendments");
      return NextResponse.json(null, {
        status: 200,
        statusText: "Amendment removed",
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json(null, {
        status: 500,
        statusText: "Something went wrong!",
      });
    }
  }
}
