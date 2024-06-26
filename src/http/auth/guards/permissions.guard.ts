import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { possiblePermissions } from 'src/constants/permissions';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const validPermission = this.reflector.get<possiblePermissions>('permissions', context.getHandler());
    if (!validPermission) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new ForbiddenException('Token not found');
    }

    const user = this.jwtService.verify(token);
    const hasPermission = () => user.permissions === validPermission;
    if (!hasPermission()) {
      throw new ForbiddenException('Acesso negado: permissões insuficientes');
    }

    return true;
  }
}