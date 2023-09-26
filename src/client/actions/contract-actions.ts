import { env } from "../helpers/env";
import {
  CreateContract,
  GetContractsActionOutput,
  GetContractsSchemaActionOutput,
  fetchContractByIdParamsSchema,
  fetchContractByIdReponse,
  fetchContractByIdReponseSchema,
} from "../schema/contract";

export class ContractActions {
  static async GET() {
    const response = await fetch(`${env.API_BASE_URL}/contracts`, {
      next: {
        tags: ["contracts"],
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const json: GetContractsActionOutput = await response.json();

    const contracts = GetContractsSchemaActionOutput.safeParse(json);

    if (!contracts.success) {
      throw new Error(contracts.error.message);
    }

    return json;
  }

  static async REMOVE(contractId: string) {
    const response = await fetch(
      `${env.API_BASE_URL}/contracts/${contractId}`,
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

  static async CREATE(contract: CreateContract) {
    const body = { data: contract };

    const response = await fetch(`${env.API_BASE_URL}/contracts`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const result = await response.json();
    return result;
  }

  static async FETCH(contractId: string) {
    const parsedParams = fetchContractByIdParamsSchema.safeParse(contractId);

    if (!parsedParams.success) {
      throw new Error(parsedParams.error.message);
    }

    const response = await fetch(`${env.API_BASE_URL}/contracts/${contractId}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const json: fetchContractByIdReponse = await response.json();

    const parsedReponse = fetchContractByIdReponseSchema.safeParse(json);

    if (!parsedReponse.success) {
      throw new Error(parsedReponse.error.message);
    }

    return parsedReponse.data;
  }
}
