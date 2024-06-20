import { Injectable } from "@nestjs/common";
import { possiblePermissions } from "src/constants/permissions";
import { UserRepository } from "src/database/repositories/user.repository";

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async changePermissions(userId: string, permission: possiblePermissions){
    const result = await this.userRepository.changePermissions(userId, permission)
    if (result) return result
  }

  async deleteUser(userId: string){
    const user = await this.userRepository.getUserById(userId)
    if (user){
      const result = await this.userRepository.deleteUser(userId)
      return result
    }
  }
}