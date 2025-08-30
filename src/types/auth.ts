import { User } from '@prisma/client'

export interface ExtendedUser extends User {
  credits: number
  plan: string
}

export interface AuthSession {
  user: {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    credits?: number
    plan?: string
  }
}