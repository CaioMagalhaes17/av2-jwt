import { possiblePermissions } from "src/constants/permissions"

export class JwtPayloadDTO {
  id: number
  name: string
  login: string
  permissions: possiblePermissions
  password?: string
}