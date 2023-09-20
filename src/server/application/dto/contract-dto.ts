import { Contract } from "@/server/enterprise/entities/contract";

export interface CreateContractDTO {
  data: Contract;
}


export interface GetContractsOutputDTO {
  data: Contract[];
}
