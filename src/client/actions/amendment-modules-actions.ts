import { env } from "../helpers/env";
import {
  AmendmentModuleByIdParams,
  AmendmentModuleByIdParamsSchema,
  CreateAmendmentModule,
  CreateAmendmentModuleParams,
  CreateAmendmentModuleParamsSchema,
} from "../schema/amendment-module";

export class AmendmentModuleActions {
  static async REMOVE(params: AmendmentModuleByIdParams) {
    const parsedParams = AmendmentModuleByIdParamsSchema.safeParse(params);

    if (!parsedParams.success) {
      throw new Error(parsedParams.error.message);
    }

    const { amendmentId, contractId, amendmentModuleId } = parsedParams.data;

    const URL = `${env.API_BASE_URL}/api/contracts/${contractId}/amendments/${amendmentId}/modules/${amendmentModuleId}`;

    const response = await fetch(URL, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const json = await response.json();
    return json || null;
  }

  static async CREATE(
    params: CreateAmendmentModuleParams,
    amendmentModule: CreateAmendmentModule
  ) {
    const body = {
      data: amendmentModule,
    };

    const parsedParams = CreateAmendmentModuleParamsSchema.safeParse(params);

    if (!parsedParams.success) {
      throw new Error(parsedParams.error.message);
    }

    const { amendmentId, contractId } = parsedParams.data;

    const URL = `${env.API_BASE_URL}/api/contracts/${contractId}/amendments/${amendmentId}/modules`;

    const response = await fetch(URL, {
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
