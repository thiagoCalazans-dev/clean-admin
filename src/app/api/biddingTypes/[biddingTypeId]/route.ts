import { BiddingTypeController } from "@/server/adapters/controller/bidding-type-controller";

export async function DELETE(
  request: Request,
  { params }: { params: { biddingTypeId: string } }
) {
  return await BiddingTypeController.DELETE(request, params);
}
