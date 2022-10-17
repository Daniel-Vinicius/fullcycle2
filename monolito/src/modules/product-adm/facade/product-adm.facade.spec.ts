import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";

import { ProductAdmFacadeFactory } from "../factory/facade.factory";

describe("ProductAdmFacade test", () => {
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
    const productAdmFacade = ProductAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Product name",
      description: "Product description",
      stock: 5,
      purchasePrice: 120,
    };

    await productAdmFacade.addProduct(input);

    const product = await ProductModel.findOne({ where: { id: "1" } });

    expect(product).toBeDefined();
    expect(product.id).toBe(input.id);
    expect(product.name).toBe(input.name);
    expect(product.description).toBe(input.description);
    expect(product.stock).toBe(input.stock);
    expect(product.purchasePrice).toBe(input.purchasePrice);
  });

  it("should check product stock", async () => {
    const productProps = {
      id: "1",
      name: "My Product",
      description: "Product description",
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await ProductModel.create(productProps);

    const productAdmFacade = ProductAdmFacadeFactory.create();

    const result = await productAdmFacade.checkStock({
      productId: productProps.id,
    });

    expect(result.productId).toBe(productProps.id);
    expect(result.stock).toBe(productProps.stock);
  });
});
