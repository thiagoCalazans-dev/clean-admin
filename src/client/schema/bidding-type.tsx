import { schema } from "@/client/lib/zod";

export const FormBiddingTypeSchema = schema.object({
  name: schema.string().min(3),
});

export type FormBiddingType = schema.infer<typeof FormBiddingTypeSchema>;

export const CreateBiddingTypeSchema = schema.object({
  name: schema.string().min(3),
});

export type CreateBiddingType = schema.infer<typeof CreateBiddingTypeSchema>;

export const BiddingTypeSchema = schema.object({
  id: schema.string(),
  name: schema.string().min(3),
});

export type BiddingType = schema.infer<typeof BiddingTypeSchema>;

export const GetBiddingTypeSchemaActionOutput = schema.object({
  data: BiddingTypeSchema.array(),
});
export type GetBiddingTypeActionOutput = schema.infer<
  typeof GetBiddingTypeSchemaActionOutput
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
