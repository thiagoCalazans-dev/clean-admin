import { CreateSupplierDTO } from "@/server/application/dto/supplier-dto";
import { makeCreateSupplierUseCase } from "@/server/application/factories/makeCreateSupplierUseCase";
import { makeGetSuppliersUseCase } from "@/server/application/factories/makeGetSuppliersUseCase";
import { makeRemoveSuppliersUseCase } from "@/server/application/factories/makeRemoveSupplierUseCase";

import { ResourceAlreadyExistError } from "@/server/errors/ResourceAlreadyExistsError";
import { ResourceNotFoundError } from "@/server/errors/ResourceNotFoundError";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export class SupplierController {
  constructor() {}
  static async POST(request: Request) {
    const body: CreateSupplierDTO = await request.json();

    try {
      const supplierUseCase = makeCreateSupplierUseCase();
    

      await supplierUseCase.execute(body);

      revalidateTag("suppliers");

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
      const supplierUseCase = makeGetSuppliersUseCase();

      const response = await supplierUseCase.execute();

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
      supplierId: string;
    }
  ) {
    const id = params.supplierId;

    try {
      const supplierUseCase = makeRemoveSuppliersUseCase();
      await supplierUseCase.execute(id);
      revalidateTag("suppliers");
      return NextResponse.json(null, {
        status: 200,
        statusText: "Supplier removed",
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return NextResponse.json(null, {
          status: error.status,
          statusText: error.message,
        });
      }
      if (error instanceof ResourceAlreadyExistError) {
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
