import 'dotenv/config'
import { z } from 'zod'

// process.env: { NODE_ENV: 'dev'. ... }

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'homologation', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333), // Coerce convert um valor para um número
})

const _env = envSchema.safeParse(process.env) // SafeParse: Vai validar o process.env para ver se tem as informações contidas no envSchema

if (_env.success === false) {
  console.error('Invalid environment variable', _env.error.format())
  throw new Error('Invalid environment variable.')
}

export const env = _env.data
