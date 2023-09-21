import { ContractController } from "@/server/adapters/controller/contract-controller";

export async function DELETE(
  request: Request,
  { params }: { params: { contractId: string } }
) {
  return await ContractController.DELETE(request, params);
}

export async function GET(
  request: Request,
  { params }: { params: { contractId: string } }
) {
  return await ContractController.FETCH(request, params);
}
