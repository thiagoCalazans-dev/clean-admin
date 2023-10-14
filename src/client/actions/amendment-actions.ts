import { env } from "../helpers/env";
import {
  CreateAmendment,
  AmendmentByIdParams,
  AmendmentByIdParamsSchema,
  fetchAmendmentByIdReponse,
  fetchAmendmentByIdReponseSchema,
} from "../schema/amendment";

export class AmendmentActions {
  static async REMOVE(params: AmendmentByIdParams) {
    const parsedParams = AmendmentByIdParamsSchema.safeParse(params);

    if (!parsedParams.success) {
      throw new Error(parsedParams.error.message);
    }

    const { amendmentId, contractId } = parsedParams.data;

    const URL = `${env.API_BASE_URL}/api/contracts/${contractId}/amendments/${amendmentId}`;

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

  static async FETCH(params: AmendmentByIdParams) {
    const parsedParams = AmendmentByIdParamsSchema.safeParse(params);

    if (!parsedParams.success) {
      throw new Error(parsedParams.error.message);
    }

    const { amendmentId, contractId } = parsedParams.data;

    const response = await fetch(
      `${env.API_BASE_URL}/api/contracts/${contractId}/amendments/${amendmentId}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const json: fetchAmendmentByIdReponse = await response.json();



    const parsedReponse = fetchAmendmentByIdReponseSchema.safeParse(json);

    if (!parsedReponse.success) {
      throw new Error(parsedReponse.error.message);
    }

        console.log(parsedReponse.data);

    return parsedReponse.data;
  }
}
