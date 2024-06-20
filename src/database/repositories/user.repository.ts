import { User } from "../models/user.model";
import { possiblePermissions } from "src/constants/permissions";

export class UserRepository {
  constructor(private userModel: User){}

  async getUserById(id: string){
    const result = await User.findByPk(id)
    if (result) return result
  }

  async getUserByLogin(login: string){
    const result = await User.findAll({
      where: {login}
    })
    return result[0]
  }

  async createUser(userData: Partial<User>){
    const result = await User.create(userData)
    return result
  }

  async changePermissions(userId: string, permission: possiblePermissions){
    if (await this.getUserById(userId)) {
      const result = await User.update({permissions: permission}, {
        where: {id: userId},
        returning: true
      })
      console.log(result)
      return result
    }
  }

  async getAdmins(){
    const result = await User.findAll({
      where: {permissions: 'ADMIN'}
    })
    return result
  }

  async deleteUser(userId: string){
    const result = await User.destroy({
      where: {
        id: userId
      }
    })
    return result
  }
}