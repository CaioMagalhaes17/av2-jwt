import { Module } from "@nestjs/common";
import { AuthModule } from "./auth.module";
import { UserRepository } from "src/database/repositories/user.repository";
import { PermissionsGuard } from "./auth/guards/permissions.guard";
import { JwtStrategy } from "./auth/strategies/jwt-strategy";
import { UserController } from "./controllers/user.controller";
import { UserService } from "src/services/user.service";
import { ProductsController } from "./controllers/products.controller";
import { ProductsService } from "src/services/products.service";

@Module({
  imports: [AuthModule],
  controllers: [UserController, ProductsController],
  providers: [UserService, ProductsService, JwtStrategy, PermissionsGuard, UserRepository],
})
export class HttpModule {}