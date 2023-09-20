import { SupplierController } from "@/server/adapters/controller/supplier-controller";

export async function DELETE(
  request: Request,
  { params }: { params: { supplierId: string } }
) {
  return await SupplierController.DELETE(request, params);
}
