import { env } from "../helpers/env";
import {
  CreateBiddingType,
  GetBiddingTypeActionOutput,
} from "../schema/bidding-type";

export class BiddingTypeActions {
  static async GET() {
    const response = await fetch(`${env.API_BASE_URL}/api/biddingTypes`, {
      next: {
        tags: ["biddingTypes"],
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const json: GetBiddingTypeActionOutput = await response.json();
    return json;
  }

  static async REMOVE(biddingTypeId: string) {

    const response = await fetch(
      `${env.API_BASE_URL}/api/biddingTypes/${biddingTypeId}`,
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

    const url = `${env.API_BASE_URL}/api/biddingTypes`;

    console.log(url)

    const response = await fetch(url, {
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
