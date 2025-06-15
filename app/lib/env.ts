import { z } from "zod";

/**
 * Environment variables schema using Zod
 * All environment variables should be defined here
 */
const envSchema = z.object({
	APP_NAME: z.string().default("SaasApp"),
	APP_ICON: z.string().default("Blocks"),
});

/**
 * Parse and validate environment variables
 * VITE_ prefix is automatically stripped by Vite
 */
const processEnv = {
	APP_NAME: import.meta.env.VITE_APP_NAME,
	APP_ICON: import.meta.env.VITE_APP_ICON,
};

/**
 * Validated environment variables
 * This is the object you should use throughout your application
 */
export const env = envSchema.parse(processEnv);

/**
 * Type definition for environment variables
 * This can be used for type safety when accessing environment variables
 */
export type Env = z.infer<typeof envSchema>;
