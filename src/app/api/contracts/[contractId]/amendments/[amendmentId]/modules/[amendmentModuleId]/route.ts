import { AmendmentModuleController } from "@/server/adapters/controller/amendment-module-controller";

export async function DELETE(
  request: Request,
  { params }: { params: { amendmentModuleId: string } }
) {
  return await AmendmentModuleController.DELETE(request, params);
}
