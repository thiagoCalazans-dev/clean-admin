import { ModuleController } from "@/server/adapters/controller/module-controller";


export async function GET() {
  return await ModuleController.GET();
}

export async function POST(request: Request) {
  return await ModuleController.POST(request);
}
