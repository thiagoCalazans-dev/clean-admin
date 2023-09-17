import { Amendment } from "./amendment-data-model";
import { BiddingType } from "./bidding-type-data-model";
import { Supplier } from "./supplier-data-model";

export interface Contract {
  id: string;
  number: string;
  processNumber: string;
  biddingTypeId: string;
  supplierId: string;
  biddingType?: BiddingType;
  supplier?: Supplier;
  value: number;
  fixture: string;
  dueDate: Date;
  subscriptionDate: Date;
  billingDeadline: string;
  endContract: boolean;
  amendment?: Amendment[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContractCreate {
  number: string;
  processNumber: string;
  biddingTypeId: string;
  supplierId: string;
  value: number;
  fixture: string;
  dueDate: Date;
  subscriptionDate: Date;
  billingDeadline: string;
  endContract: boolean;
}
