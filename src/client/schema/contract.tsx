
import { SupplierSchema } from "./supplier";
import { BiddingTypeSchema } from "./bidding-type";

import { schema } from "../lib/zod";
import { formatBrDateToNewDateFormat } from "../helpers/validators";

export const ContractSchema = schema.object({
  id: schema.string().uuid(),
  number: schema.string().regex(/\d{4}-\d{4}/), //Regex para aceita somente no formato 0000-0000 em que 0 pode ser qualquer numero.
  processNumber: schema.string().regex(/\d{4}-\d{4}/),
  biddingTypeId: schema.string(),
  biddingType: BiddingTypeSchema,
  supplierId: schema.coerce.string(),
  supplier: SupplierSchema,
  value: schema.coerce.string(),
  fixture: schema.string(),
  billingDeadline: schema.string(),
  dueDate: schema
    .string()
    .transform((dueDate) => new Date(dueDate).toISOString()),
  subscriptionDate: schema
    .string()
    .transform((dueDate) => new Date(dueDate).toISOString()),
  createdAt: schema.coerce.date().optional(),
  updatedAt: schema.coerce.date().optional(),
  endContract: schema.boolean().default(false),
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

export const fetchContractByIdReponseSchema = schema
  .object({
    data: ContractSchema,
  })
  .nullable();

export const FormContractSchema = schema
  .object({
    number: schema.string().regex(/\d{4}-\d{4}/), //Regex para aceita somente no formato 0000-0000 em que 0 pode ser qualquer numero.
    processNumber: schema.string().regex(/\d{4}-\d{4}/),
    biddingTypeId: schema.string(),
    supplierId: schema.coerce.string(),
    value: schema.coerce
      .string()
      .regex(/^(\d{1,3}(\.\d{3})*|\d+)(,\d{2})?$/)
      .transform((value) => value.replace(",", ".")),
    fixture: schema.string(),
    billingDeadline: schema.string(),
    dueDate: schema
      .string()
      .transform((dueDate) =>
        new Date(formatBrDateToNewDateFormat(dueDate)).toISOString()
      ),
    subscriptionDate: schema
      .string()
      .transform((dueDate) =>
        new Date(formatBrDateToNewDateFormat(dueDate)).toISOString()
      ),
    endContract: schema.boolean().default(false),
  })


export type FormContract = schema.infer<typeof FormContractSchema>;

export const CreateContractSchema = schema.object({
  number: schema.string().regex(/\d{4}-\d{4}/), //Regex para aceita somente no formato 0000-0000 em que 0 pode ser qualquer numero.
  processNumber: schema.string().regex(/\d{4}-\d{4}/),
  biddingTypeId: schema.string(),
  supplierId: schema.coerce.string(),
  value: schema.coerce
    .string()
    .regex(/^(\d{1,3}(\.\d{3})*|\d+)(,\d{2})?$/)
    .transform((value) => value.replace(",", ".")),
  fixture: schema.string(),
  billingDeadline: schema.string(),
  dueDate: schema
    .string()
    .transform((dueDate) =>
      new Date(formatBrDateToNewDateFormat(dueDate)).toISOString()
    ),
  subscriptionDate: schema
    .string()
    .transform((dueDate) =>
      new Date(formatBrDateToNewDateFormat(dueDate)).toISOString()
    ),
  endContract: schema.boolean().default(false),
});

export type CreateContract = schema.infer<typeof CreateContractSchema>;

export type fetchContractByIdReponse = schema.infer<
  typeof fetchContractByIdReponseSchema
>;

export const fetchContractByIdParamsSchema = schema.string().uuid();

export type fetchContractByIdParams = schema.infer<
  typeof fetchContractByIdParamsSchema
>;
