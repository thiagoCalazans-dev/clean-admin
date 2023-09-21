import { CreateContractDTO } from "@/server/application/dto/contract-dto";
import { makeCreateContractUseCase } from "@/server/application/factories/makeCreateContractUseCase";
import { makeFetchContractsUseCase } from "@/server/application/factories/makeFetchContractUseCase";
import { makeGetContractsUseCase } from "@/server/application/factories/makeGetContractsUseCase";
import { makeRemoveContractsUseCase } from "@/server/application/factories/makeRemoveContractUseCase";

import { ResourceAlreadyExistError } from "@/server/errors/ResourceAlreadyExistsError";
import { ResourceNotFoundError } from "@/server/errors/ResourceNotFoundError";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export class ContractController {
  constructor() {}
  static async POST(request: Request) {
    const body: CreateContractDTO = await request.json();

    try {
      const contractUseCase = makeCreateContractUseCase();

      await contractUseCase.execute(body);

      revalidateTag("contracts");

      return NextResponse.json({ status: 201 });
    } catch (error) {
      if (error instanceof ResourceAlreadyExistError)
        return NextResponse.json(null, {
          status: error.status,
          statusText: error.message,
        });

      if (error instanceof ResourceNotFoundError)
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
      const contractUseCase = makeGetContractsUseCase();

      const response = await contractUseCase.execute();

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json(null, {
        status: 500,
        statusText: "Something went wrong!",
      });
    }
  }

  static async FETCH(
    request: Request,
    params: {
      contractId: string;
    }
  ) {
    const id = params.contractId;

    try {
      const contractUseCase = makeFetchContractsUseCase();

      const response = await contractUseCase.execute(id);

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
      contractId: string;
    }
  ) {
    const id = params.contractId;

    try {
      const contractUseCase = makeRemoveContractsUseCase();
      await contractUseCase.execute(id);
      revalidateTag("contracts");
      return NextResponse.json(null, {
        status: 200,
        statusText: "Contract removed",
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return NextResponse.json(null, {
          status: error.status,
          statusText: error.message,
        });
      }

      console.error(error);
      return NextResponse.json(null, {
        status: 500,
        statusText: "Something went wrong!",
      });
    }
  }
}
