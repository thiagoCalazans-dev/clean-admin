import {
  AmendmentModuleCreate,
  AmendmentModule,
} from "./data-model/amendment-module-data-model";

export interface AmendmentModuleRepository {
  create(data: AmendmentModuleCreate): Promise<void>;
  findById(id: string): Promise<AmendmentModule | null>;
  remove(id: string): Promise<void>;
}
