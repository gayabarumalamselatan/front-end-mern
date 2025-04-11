import { Session, User } from "next-auth"
import { JWT } from "next-auth/jwt"

interface IRegister {
  fullName: string,
  userName: string,
  email: string,
  password: string,
  confirmPassword: string
}

interface Ilogin {
  identifier: string,
  password: string
}

interface IActivation {
  code: string,
}

interface UserExtended extends User {
  accessToken?: string,
  role?: string
}

interface SessionExtended extends Session {
  accessToken?: string
}

interface JWTExtended extends JWT {
  user?: UserExtended
}

export type {
  IRegister,
  IActivation,
  JWTExtended,
  SessionExtended,
  UserExtended,
  Ilogin
}