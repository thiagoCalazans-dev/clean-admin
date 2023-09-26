import { schema } from "@/client/lib/zod";
import { formatNumbersToCnpjMask } from "../helpers/validators";

export const SupplierSchema = schema.object({
  id: schema.string(),
  name: schema.string().min(3),
  corporateName: schema.string().min(3),
  cnpj: schema.string().transform((item) => formatNumbersToCnpjMask(item)),
  zipcode: schema.string().regex(/^\d{5}-?\d{3}$/),
  city: schema.string(),
  neighborhood: schema.string(),
  address: schema.string(),
  number: schema.number().transform((number) => String(number)),
  observation: schema.string().optional(),
});

export type Supplier = schema.infer<typeof SupplierSchema>;

export const FormSupplierSchema = schema.object({
  name: schema.string().min(3),
  corporateName: schema.string().min(3),
  cnpj: schema.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/),
  zipcode: schema.string().regex(/^\d{5}-?\d{3}$/),
  city: schema.string(),
  neighborhood: schema.string(),
  address: schema.string(),
  number: schema.string(),
  observation: schema.string().optional(),
});

export type FormSupplier = schema.infer<typeof FormSupplierSchema>;

export const CreateSupplierSchema = schema.object({
  name: schema.string().min(3),
  corporateName: schema.string().min(3),
  cnpj: schema.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/),
  zipcode: schema.string().regex(/^\d{5}-?\d{3}$/),
  city: schema.string(),
  neighborhood: schema.string(),
  address: schema.string(),
  number: schema.string(),
  observation: schema.string().optional(),
});

export type CreateSupplier = schema.infer<typeof CreateSupplierSchema>;

export const GetSupplierSchemaActionOutput = schema.object({
  data: SupplierSchema.array(),
});
export type GetSupplierActionOutput = schema.infer<
  typeof GetSupplierSchemaActionOutput
>;

// export const fetchByIdReponseSchema = schema
//   .object({
//     data: schema.object({
//       id: schema.string().uuid(),
//       name: schema.string(),
//     }),
//   })
//   .nullable();

// export const fetchByIdParamsSchema = schema.string().uuid();

// export type fetchByIdParamsSchema = schema.infer<typeof fetchByIdReponseSchema>;
// export type fetchByIdReponse = schema.infer<typeof fetchByIdReponseSchema>;
