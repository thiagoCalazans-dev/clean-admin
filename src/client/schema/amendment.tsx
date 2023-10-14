import {
  formatBrDateToNewDateFormat,
  formatDateToBrazilianDateString,
} from "../helpers/validators";
import { schema } from "../lib/zod";
import { AmendmentModuleSchema } from "./amendment-module";
import { ContractSchema } from "./contract";
import { SupplierSchema } from "./supplier";

export const AmendmentSchema = schema.object({
  id: schema.string(),
  contractId: schema.string(),
  contract: schema
    .object({
      id: schema.string(),
      number: schema.string(),
      processNumber: schema.string(),
      supplier: SupplierSchema.optional(),
    })
    .optional(),
  number: schema.coerce.number(),
  dueDate: schema
    .string()
    .transform((dueDate) => formatDateToBrazilianDateString(new Date(dueDate))),
  subscriptionDate: schema
    .string()
    .transform((dueDate) => formatDateToBrazilianDateString(new Date(dueDate))),
  value: schema.coerce.number(),
  createdAt: schema.coerce.date().optional(),
  updatedAt: schema.coerce.date().optional(),
  amendmentModules: AmendmentModuleSchema.array().optional(),
});
export type Amendment = schema.infer<typeof AmendmentSchema>;

export const FormAmendmentSchema = schema.object({
  number: schema.coerce.number(),
  contractId: schema.string(),
  value: schema.coerce
    .string()
    .regex(/^(\d{1,3}(\.\d{3})*|\d+)(,\d{2})?$/)
    .transform((value) => Number(value.replace(",", "."))),

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
});

export type FormAmendment = schema.infer<typeof FormAmendmentSchema>;

export const CreateAmendmentSchema = schema.object({
  number: schema.coerce.number(),
  contractId: schema.string(),
  value: schema.coerce
    .string()
    .regex(/^(\d{1,3}(\.\d{3})*|\d+)(,\d{2})?$/)
    .transform((value) => Number(value.replace(",", "."))),

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
});

export type CreateAmendment = schema.infer<typeof CreateAmendmentSchema>;

export const CreateAmendmentParamsSchema = schema.object({
  contractId: schema.string(),
  amendmentId: schema.string(),
});

export type CreateAmendmentParams = schema.infer<
  typeof CreateAmendmentParamsSchema
>;

export const AmendmentByIdParamsSchema = schema.object({
  contractId: schema.string(),
  amendmentId: schema.string(),
});

export type AmendmentByIdParams = schema.infer<
  typeof AmendmentByIdParamsSchema
>;

export const fetchAmendmentByIdReponseSchema = schema.object({
  data: AmendmentSchema,
});
export type fetchAmendmentByIdReponse = schema.infer<
  typeof fetchAmendmentByIdReponseSchema
>;
