import { Sequelize } from "sequelize-typescript";

import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Product } from "../domain/product.entity";

import { ProductModel } from "./product.model";
import { ProductRepository } from "./product.repository";

describe("ProductRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productProps = {
      id: new Id(),
      name: "My Product",
      description: "Product description",
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const product = new Product(productProps);

    const productRepository = new ProductRepository();
    await productRepository.add(product);

    const productDb = await ProductModel.findOne({
      where: { id: productProps.id.id },
    });

    expect(productDb.id).toBe(productProps.id.id);
    expect(productDb.name).toBe(productProps.name);
    expect(productDb.description).toBe(productProps.description);
    expect(productDb.purchasePrice).toBe(productProps.purchasePrice);
    expect(productDb.stock).toBe(productProps.stock);
  });
});
