import { ContractController } from "@/server/adapters/controller/contract-controller";

export async function GET() {
  return await ContractController.GET();
}

export async function POST(request: Request) {
  return await ContractController.POST(request);
}
