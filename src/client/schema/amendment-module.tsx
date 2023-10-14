import { schema } from "../lib/zod";
import { ModuleSchema } from "./module";

export const AmendmentModuleSchema = schema.object({
  id: schema.string(),
  amendmentId: schema.string(),
  moduleId: schema.string(),
  module: ModuleSchema.optional(),
  value: schema.coerce.number(),
  createdAt: schema.coerce.date().optional(),
  updatedAt: schema.coerce.date().optional(),
});

export type AmendmentModule = schema.infer<typeof AmendmentModuleSchema>;

export const AmendmentModuleByIdParamsSchema = schema.object({
  contractId: schema.string(),
  amendmentId: schema.string(),
  amendmentModuleId: schema.string(),
});

export type AmendmentModuleByIdParams = schema.infer<
  typeof AmendmentModuleByIdParamsSchema
>;

export const FormAmendmentModuleSchema = schema.object({
  amendmentId: schema.string(),
  moduleId: schema.string(),
  value: schema.coerce
    .string()
    .regex(/^(\d{1,3}(\.\d{3})*|\d+)(,\d{2})?$/)
    .transform((value) => Number(value.replace(",", "."))),
});

export type FormAmendmentModule = schema.infer<
  typeof FormAmendmentModuleSchema
>;

export const CreateAmendmentModuleParamsSchema = schema.object({
  contractId: schema.string(),
  amendmentId: schema.string(),
});

export type CreateAmendmentModuleParams = schema.infer<
  typeof CreateAmendmentModuleParamsSchema
>;

export const CreateAmendmentModuleSchema = schema.object({
  amendmentId: schema.string(),
  moduleId: schema.string(),
  value: schema.coerce
    .string()
    .regex(/^(\d{1,3}(\.\d{3})*|\d+)(,\d{2})?$/)
    .transform((value) => Number(value.replace(",", "."))),
});

export type CreateAmendmentModule = schema.infer<
  typeof FormAmendmentModuleSchema
>;
