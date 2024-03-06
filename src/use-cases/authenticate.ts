import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AutheticateUserCaseRequest {
  email: string
  password: string
}

interface AutheticateUserCaseResponse {
  user: User
}

export class AutheticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AutheticateUserCaseRequest): Promise<AutheticateUserCaseResponse> {
    // Buscar o usuário no banco pelo e-mail
    // comparar se a senha salva no banco bate com a senha do param
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }
    return {
      user,
    }
  }
}
