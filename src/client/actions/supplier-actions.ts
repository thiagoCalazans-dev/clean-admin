import {
  CreateSupplier,
  GetSupplierActionOutput,
  GetSupplierSchemaActionOutput,
} from "../schema/supplier";
import { env } from "../helpers/env";

export class SupplierActions {
  static async GET() {
    const response = await fetch(`${env.API_BASE_URL}/suppliers`, {
      next: {
        tags: ["suppliers"],
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const json: GetSupplierActionOutput = await response.json();

    const supplier = GetSupplierSchemaActionOutput.safeParse(json);

    if (!supplier.success) { 
      throw new Error(supplier.error.message);
    }

    return supplier.data;
  }

  static async REMOVE(supplierId: string) {
    const response = await fetch(
      `${env.API_BASE_URL}/suppliers/${supplierId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const json = await response.json();
    return json || null;
  }

  static async CREATE(supplier: CreateSupplier) {
    const body = {
      data: supplier,
    };

    const response = await fetch(`${env.API_BASE_URL}/suppliers`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const result = await response.json();
    return result;
  }
}
