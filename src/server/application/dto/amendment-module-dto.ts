import { AmendmentModule } from "@/server/enterprise/entities/amendment-module";

export interface CreateAmendmentModuleDTO {
  data: AmendmentModule;
}

export interface GetAmendmentsOutputDTO {
  data: AmendmentModule[];
}
