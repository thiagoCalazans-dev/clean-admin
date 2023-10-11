import { ModuleController } from "@/server/adapters/controller/module-controller";

export async function DELETE(
  request: Request,
  { params }: { params: { moduleId: string } }
) {
  return await ModuleController.DELETE(request, params);
}
