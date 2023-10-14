import { AmendmentModuleController } from "@/server/adapters/controller/amendment-module-controller";

export async function POST(request: Request) {
  return await AmendmentModuleController.POST(request);
}
