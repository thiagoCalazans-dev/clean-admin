import { env } from "../helpers/env";
import { CreateModule, GetModuleActionOutput } from "../schema/module";

export class ModuleActions {
  static async GET() {
    const response = await fetch(`${env.API_BASE_URL}/api/modules`, {
      next: {
        tags: ["modules"],
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const json: GetModuleActionOutput = await response.json();
    return json;
  }

  static async REMOVE(moduleId: string) {
    const response = await fetch(
      `${env.API_BASE_URL}/api/modules/${moduleId}`,
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

  static async CREATE(module: CreateModule) {
    const body = {
      data: module,
    };

    const url = `${env.API_BASE_URL}/api/modules`;

    console.log(url);

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
