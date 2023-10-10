import { ModuleCreate, Module } from "./data-model/module-data-model";

export interface ModuleRepository {
  findMany(): Promise<Module[]>;
  findByName(name: string): Promise<Module | null>;
  findById(id: string): Promise<Module | null>;
  create(data: ModuleCreate): Promise<void>;
  remove(id: string): Promise<void>;
}
