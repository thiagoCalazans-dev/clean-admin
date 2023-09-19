import { Supplier } from "@/server/enterprise/entities/supplier";


export interface CreateSupplierDTO {
  data: Supplier;
}

export interface GetSupplierOutputDTO {
  data: Supplier[];
}
