import { AmendmentController } from "@/server/adapters/controller/amendment-controller";

export async function DELETE(
  request: Request,
  { params }: { params: { amendmentId: string } }
) {
  return await AmendmentController.DELETE(request, params);
}
