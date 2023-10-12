import { AmendmentModule } from "@/server/enterprise/entities/amendment-module";

export interface CreateAmendmentDTO {
  data: AmendmentModule;
}

export interface GetAmendmentsOutputDTO {
  data: AmendmentModule[];
}
