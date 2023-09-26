import { schema } from "@/client/lib/zod";

const envSchema = schema.object({
  DATABASE_URL: schema.string().optional(),
  API_BASE_URL: schema.string().optional(),
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  API_BASE_URL: process.env.API_BASE_URL,
});
