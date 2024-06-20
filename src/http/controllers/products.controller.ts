import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Permissions } from "../auth/decorators/permissions.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { PermissionsGuard } from "../auth/guards/permissions.guard";
import { ProductsService } from "src/services/products.service";
import { ProductCreateDTO } from "src/dto/product-create";

@Controller()
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('MANAGER')
  @Post('/manager/product')
  async createProduct(@Body() createProductPayload: ProductCreateDTO) {
    return await this.productsService.createProduct(createProductPayload)
    //const response = await this.productsService
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('SELLER')
  @Get('/seller/product/:productId')
  async getProductSelledAnalytics(@Param() productId: number) {
    return await this.productsService.getProductSelledAnalytics(productId)
    //const response = await this.productsService
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('CUSTOMER')
  @Get('/customer/products')
  async getCustomerEndpoint() {
    return await this.productsService.getProducts()
    //const response = await this.productsService
  }
}
