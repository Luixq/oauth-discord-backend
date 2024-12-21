import { z } from "zod";

const envSchema = z.object({
    OAUTH_CLIENT_SECRET: z.string(),
    OAUTH_CLIENT_ID: z.string(),

    COOKIE_SECRET: z.string(),
})

type EnvSchemaType = z.infer<typeof envSchema>;

declare global {
    namespace NodeJS {
        interface ProcessEnv extends EnvSchemaType { }
    }
}