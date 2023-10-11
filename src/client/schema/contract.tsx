import { SupplierSchema } from "./supplier";
import { BiddingTypeSchema } from "./bidding-type";

import { schema } from "../lib/zod";
import { AmendmentSchema } from "./amendment";

export const ContractSchema = schema.object({
  id: schema.string().uuid(),
  number: schema.string(),
  processNumber: schema.string(),
  biddingTypeId: schema.string(),
  biddingType: BiddingTypeSchema,
  supplierId: schema.coerce.string(),
  supplier: SupplierSchema,
  fixture: schema.string(),
  billingDeadline: schema.string(),
  createdAt: schema.coerce.date().optional(),
  updatedAt: schema.coerce.date().optional(),
  endContract: schema.boolean().default(false),
  amendment: AmendmentSchema.array().optional(),
});

export type Contract = schema.infer<typeof ContractSchema>;

export const GetContractsSchemaActionOutput = schema.object({
  data: ContractSchema.array(),
});
export type GetContractsActionOutput = schema.infer<
  typeof GetContractsSchemaActionOutput
>;

export const getContractByIdReponseSchema = schema.object({
  data: schema.array(ContractSchema),
});

export type getContractByIdReponse = schema.infer<
  typeof getContractByIdReponseSchema
>;

export const FormContractSchema = schema.object({
  number: schema.string(), //Regex para aceita somente no formato 0000-0000 em que 0 pode ser qualquer numero.
  processNumber: schema.string(),
  biddingTypeId: schema.string(),
  supplierId: schema.coerce.string(),
  fixture: schema.string(),
  billingDeadline: schema.string(),
  endContract: schema.boolean().default(false),
});

export type FormContract = schema.infer<typeof FormContractSchema>;

export const CreateContractSchema = schema.object({
  number: schema.string(), //Regex para aceita somente no formato 0000-0000 em que 0 pode ser qualquer numero.
  processNumber: schema.string(),
  biddingTypeId: schema.string(),
  supplierId: schema.coerce.string(),
  fixture: schema.string(),
  billingDeadline: schema.string(),
  endContract: schema.boolean().default(false),
});

export type CreateContract = schema.infer<typeof CreateContractSchema>;

export const fetchContractByIdReponseSchema = schema.object({
  data: ContractSchema,
});
export type fetchContractByIdReponse = schema.infer<
  typeof fetchContractByIdReponseSchema
>;

export const fetchContractByIdParamsSchema = schema.string().uuid();

export type fetchContractByIdParams = schema.infer<
  typeof fetchContractByIdParamsSchema
>;
