import { Injectable } from "@nestjs/common";
import { possiblePermissions } from "src/constants/permissions";
import { UserRepository } from "src/database/repositories/user.repository";

@Injectable()
export class ProductsService {
  async createProduct(product){
    return {message: 'Produto criado com sucesso!', product}
  }

  async getProductSelledAnalytics(idProduct: number){
    if (idProduct/2 == 0) {
      return {
        message: 'Quantidade de vendas do produto' + idProduct + ' 300MIL VENDAS RECORD BATIDO PEÇA SUA BONIFICAÇÃO'
      }
    }
    return {
      message: 'Quantidade de vendas do produto' + idProduct + ' 5 vendas, precisa melhorar.'
    }
  }

  async getProducts(){
    return [
      {id: '1', name: 'Sabão', qtd: 3},
      {id: '2', name: 'Macarrão', qtd: 3},
      {id: '3', name: 'Arroz', qtd: 5},
    ]
  }
}