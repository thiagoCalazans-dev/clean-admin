import { Contract } from "./contract-data-model";

export interface Amendment {
  id: string;
  number: number;
  contractId: string;
  contract?: Contract;
  value: number;
  dueDate: Date;
  subscriptionDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AmendmentCreate {
  number: number;
  contractId: string;
  value: number;
  dueDate: Date;
  subscriptionDate: Date;
}
