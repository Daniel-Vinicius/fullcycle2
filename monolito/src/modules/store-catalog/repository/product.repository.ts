import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Product } from "../domain/product.entity";
import { ProductGateway } from "../gateway/product.gateway";
import { ProductModel } from "./product.model";

function productModelToProductEntity(productModel: ProductModel): Product {
  const product = new Product({
    id: new Id(productModel.id),
    name: productModel.name,
    description: productModel.description,
    salesPrice: productModel.salesPrice,
  });

  return product;
}

export class ProductRepository implements ProductGateway {
  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll();
    return products.map((product) => productModelToProductEntity(product));
  }

  async find(id: string): Promise<Product> {
    const product = await ProductModel.findByPk(id);
    return productModelToProductEntity(product);
  }
}
