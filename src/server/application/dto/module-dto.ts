import { Module } from "@/server/enterprise/entities/module";

export interface CreateModuleDTO {
  data: Module;
}

export interface GetModulesOutputDTO {
  data: Module[];
}
