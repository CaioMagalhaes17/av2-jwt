import { BadRequestException, Body, Controller, Delete, Get, HttpException, Param, Put, Request, UseGuards } from "@nestjs/common";
import { Permissions } from "../auth/decorators/permissions.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { PermissionsGuard } from "../auth/guards/permissions.guard";
import { UserService } from "src/services/user.service";
import { JwtPayloadDTO } from "../auth/dto/jwt-payload.dto";
import { possiblePermissions } from "src/constants/permissions";

@Controller()
export class UserController {
  constructor (private userService: UserService){}

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  async getUserLogged(@Request() req: {user: JwtPayloadDTO}){
    return req.user
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('ADMIN')
  @Put('/admin/user/permission/:userId')
  async changePermissions(@Param('userId') userId: string, @Body() changePermissionPayload: {permissions: possiblePermissions}){
    if (changePermissionPayload.permissions !== 'ADMIN' && changePermissionPayload.permissions !== 'MANAGER' && changePermissionPayload.permissions !== 'SELLER' && changePermissionPayload.permissions !== 'CUSTOMER'){
      throw new BadRequestException(`Permissão - ${changePermissionPayload.permissions} - não existe!`)
    }
    const response = await this.userService.changePermissions(userId, changePermissionPayload.permissions)
    if (!response) throw new HttpException('Erro, usuário inexistente', 400)
    return {
      response: 'Permissões alteradas com sucesso!'
    }
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('ADMIN')
  @Delete('/admin/users/:userId')
  async deleteUsers(@Param('userId') userId: string){
    const response = await this.userService.deleteUser(userId)
    return response
  }
}