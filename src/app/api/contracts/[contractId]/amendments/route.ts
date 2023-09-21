import { AmendmentController } from "@/server/adapters/controller/amendment-controller";



export async function POST(request: Request) {
  return await AmendmentController.POST(request);
}
