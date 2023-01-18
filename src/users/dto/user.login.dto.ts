
export class UserLoginDto{
  readonly email: string
  readonly password: string

  toString() {
    return `email: ${this.email}`
  }

}