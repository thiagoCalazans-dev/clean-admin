import { schema } from "@/client/lib/zod";

export const FormModuleSchema = schema.object({
  name: schema.string().min(3),
});

export type FormModule = schema.infer<typeof FormModuleSchema>;

export const CreateModuleSchema = schema.object({
  name: schema.string().min(3),
});

export type CreateModule = schema.infer<typeof CreateModuleSchema>;

export const ModuleSchema = schema.object({
  id: schema.string(),
  name: schema.string().min(3),
});

export type Module = schema.infer<typeof ModuleSchema>;

export const GetModuleSchemaActionOutput = schema.object({
  data: ModuleSchema.array(),
});
export type GetModuleActionOutput = schema.infer<
  typeof GetModuleSchemaActionOutput
>;

export const fetchByIdReponseSchema = schema
  .object({
    data: schema.object({
      id: schema.string().uuid(),
      name: schema.string(),
    }),
  })
  .nullable();

export const fetchByIdParamsSchema = schema.string().uuid();

export type fetchByIdParamsSchema = schema.infer<typeof fetchByIdReponseSchema>;
export type fetchByIdReponse = schema.infer<typeof fetchByIdReponseSchema>;
