import { UseCaseInterface } from "../../../@shared/usecase/usecase.interface";

import { Product } from "../../domain/product.entity";
import { ProductGateway } from "../../gateway/product.gateway";

import { FindAllProductsOutputDto } from "./find-all-products.dto";

export class FindAllProductsUseCase implements UseCaseInterface {
  constructor(private productRepository: ProductGateway) {}

  async execute(): Promise<FindAllProductsOutputDto> {
    const products = await this.productRepository.findAll();
    const productsConverted = products.map((product: Product) => ({
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    }));

    const output: FindAllProductsOutputDto = {
      products: productsConverted,
    };

    return output;
  }
}
