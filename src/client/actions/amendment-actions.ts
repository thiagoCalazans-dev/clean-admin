import { env } from "../helpers/env";
import { CreateAmendment, CreateAmendmentParams } from "../schema/amendment";

export class AmendmentActions {
  static async REMOVE(params: CreateAmendmentParams) {
    const URL = `${env.API_BASE_URL}/api/contracts/${params.contractId}/amendments/${params.amendmentId}`;

    const response = await fetch(URL, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const json = await response.json();
    return json || null;
  }

  static async CREATE(amendment: CreateAmendment) {
    const body = {
      data: amendment,
    };
    const response = await fetch(
      `${env.API_BASE_URL}/api/contracts/${amendment.contractId}/amendments`,
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const result = await response.json();
    return result;
  }
}
