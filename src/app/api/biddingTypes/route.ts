import { BiddingTypeController } from "@/server/adapters/controller/bidding-type-controller";

export async function GET() {
  return await BiddingTypeController.GET();
}

export async function POST(request: Request) {
  return await BiddingTypeController.POST(request);
}
