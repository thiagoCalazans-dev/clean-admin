import { env } from "../helpers/env";
import {
  CreateBiddingType,
  GetBiddingTypeActionOutput,
} from "../schema/bidding-type";

export class BiddingTypeActions {
  static async GET() {
    const response = await fetch(`${env.API_BASE_URL}/biddingTypes`, {
      next: {
        tags: ["biddingTypes"],
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const json: GetBiddingTypeActionOutput = await response.json();
    return json;
  }

  static async REMOVE(biddingTypeId: string) {

    const response = await fetch(
      `${env.API_BASE_URL}/biddingTypes/${biddingTypeId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const json = await response.json();
    return json || null;
  }

  static async CREATE(biddingType: CreateBiddingType) {
    const body = {
      data: biddingType,
    };

    const response = await fetch(`${env.API_BASE_URL}/biddingTypes`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const result = await response.json();
    return result;
  }
}
