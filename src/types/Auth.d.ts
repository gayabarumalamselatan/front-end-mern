interface IRegister {
  fullName: string,
  userName: string,
  email: string,
  password: string,
  confirmPassword: string
}

interface IActivation {
  code: string,
}

export type {
  IRegister,
  IActivation
}