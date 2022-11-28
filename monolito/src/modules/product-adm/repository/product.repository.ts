import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Product } from "../domain/product.entity";
import { ProductGateway } from "../gateway/product.gateway";
import { ProductModel } from "./product.model";

function productModelToProduct(productModel: ProductModel): Product {
  const product = new Product({
    id: new Id(productModel.id),
    name: productModel.name,
    description: productModel.description,
    purchasePrice: productModel.purchasePrice,
    stock: productModel.stock,
    createdAt: productModel.createdAt,
    updatedAt: productModel.updatedAt,
  });

  return product;
}

export class ProductRepository implements ProductGateway {
  async add(product: Product): Promise<void> {
    await ProductModel.create({
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      salesPrice: product.purchasePrice,
      stock: product.stock,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async find(id: string): Promise<Product> {
    try {
      const productOnDB = await ProductModel.findByPk(id);
      return productModelToProduct(productOnDB);
    } catch (error) {
      throw new Error(`Product with ${id} not found`);
    }
  }
}
