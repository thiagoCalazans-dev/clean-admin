import { BASE_URL } from "@/client/lib/utils";
import { CreateContract, GetContractsActionOutput } from "../schema/contract";

export class ContractsActions {
  static async GET() {
    const response = await fetch(`${BASE_URL}/contracts`, {
      next: {
        tags: ["contractss"],
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const json: GetContractsActionOutput = await response.json();
    return json;
  }

  static async REMOVE(contractsId: string) {
    const response = await fetch(`${BASE_URL}/contracts/${contractsId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const json = await response.json();
    return json || null;
  }

  static async CREATE(contracts: CreateContract) {
    const body = {
      data: {
        contracts,
      },
    };

    const response = await fetch(`${BASE_URL}/contracts`, {
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
