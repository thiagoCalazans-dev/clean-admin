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
    const response = await fetch(`${env.API_BASE_URL}/api/contracts`, {
      next: {
        tags: ["contracts"],
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const json: GetContractsActionOutput = await response.json();

    const contracts = GetContractsSchemaActionOutput.safeParse(json);

    if (!contracts.success) {
      throw new Error(contracts.error.message);
    }

    return contracts.data;
  }

  static async REMOVE(contractId: string) {
    const response = await fetch(
      `${env.API_BASE_URL}/api/contracts/${contractId}`,
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

    const response = await fetch(`${env.API_BASE_URL}/api/contracts`, {
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

    const response = await fetch(
      `${env.API_BASE_URL}/api/contracts/${contractId}`,
      {
        cache: "no-store",
      }
    );

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
