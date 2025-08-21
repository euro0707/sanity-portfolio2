import { z } from "zod"

const EnvSchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1, "Sanity project ID is required"),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1, "Sanity dataset is required"),
  NEXT_PUBLIC_BASE_URL: z.string().url().optional(),
  GITHUB_TOKEN: z.string().optional(),
})

const envVars = {
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
}

let ENV: z.infer<typeof EnvSchema>

try {
  ENV = EnvSchema.parse(envVars)
} catch (error) {
  if (error instanceof z.ZodError) {
    const missingVars = error.errors.map(err => err.path.join('.'))
    throw new Error(`Missing or invalid environment variables: ${missingVars.join(', ')}`)
  }
  throw error
}

export { ENV }