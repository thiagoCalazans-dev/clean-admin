import { SupplierController } from "@/server/adapters/controller/supplier-controller";

export async function GET() {
  return await SupplierController.GET();
}

export async function POST(request: Request) {
  return await SupplierController.POST(request);
}
