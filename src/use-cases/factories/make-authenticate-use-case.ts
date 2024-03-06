import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { AutheticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUserRepository()
  const authenticateUseCase = new AutheticateUseCase(usersRepository)

  return authenticateUseCase
}
