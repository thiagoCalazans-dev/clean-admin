import { CreateBiddingTypeDTO } from "@/server/application/dto/bidding-type-dto";
import { makeCreateBiddingTypeUseCase } from "@/server/application/factories/makeCreateBiddingTypeUseCase";
import { makeGetBiddingTypesUseCase } from "@/server/application/factories/makeGetBiddingTypesUseCase";
import { makeRemoveBiddingTypesUseCase } from "@/server/application/factories/makeRemoveBiddingTypeUseCase";

import { ResourceAlreadyExistError } from "@/server/errors/ResourceAlreadyExistsError";
import { ResourceNotFoundError } from "@/server/errors/ResourceNotFoundError";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export class BiddingTypeController {
  constructor() {}
  static async POST(request: Request) {
    const body: CreateBiddingTypeDTO = await request.json();

    try {
      const biddingTypeUseCase = makeCreateBiddingTypeUseCase();

      await biddingTypeUseCase.execute(body);

      revalidateTag("biddingTypes");

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
      const biddingTypeUseCase = makeGetBiddingTypesUseCase();

      const response = await biddingTypeUseCase.execute();

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
      biddingTypeId: string;
    }
  ) {
    const id = params.biddingTypeId;

    try {
      const biddingTypeUseCase = makeRemoveBiddingTypesUseCase();
      await biddingTypeUseCase.execute(id);
      revalidateTag("biddingTypes");
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

      console.error(error);
      return NextResponse.json(null, {
        status: 500,
        statusText: "Something went wrong!",
      });
    }
  }
}
