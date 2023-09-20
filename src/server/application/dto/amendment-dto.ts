import { Amendment } from "@/server/enterprise/entities/amendment";

export interface CreateAmendmentDTO {
  data: Amendment;
}

export interface GetAmendmentsOutputDTO {
  data: Amendment[];
}
