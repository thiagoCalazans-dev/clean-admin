import {
  formatBrDateToNewDateFormat,
  formatDateToBrazilianDateString,
} from "../helpers/validators";
import { schema } from "../lib/zod";

export const AmendmentSchema = schema.object({
  id: schema.string(),
  contractId: schema.string(),
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
});

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

export type Amendment = schema.infer<typeof AmendmentSchema>;

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
