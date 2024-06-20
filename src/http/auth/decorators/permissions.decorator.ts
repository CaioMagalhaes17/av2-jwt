import { SetMetadata } from '@nestjs/common';
import { possiblePermissions } from 'src/constants/permissions';

export const Permissions = (permissions: possiblePermissions) => SetMetadata('permissions', permissions);