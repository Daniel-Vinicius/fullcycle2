import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";

import { StoreCatalogFacadeFactory } from "../factory/facade.factory";

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

  it("should find a product", async () => {
    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Description 1",
      salesPrice: 100,
    });

    const storeCatalogFacade = StoreCatalogFacadeFactory.create();

    const result = await storeCatalogFacade.find({ id: "1" });

    expect(result.id).toBe("1");
    expect(result.name).toBe("Product 1");
    expect(result.description).toBe("Description 1");
    expect(result.salesPrice).toBe(100);
  });

  it("should find all products", async () => {
    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Description 1",
      salesPrice: 100,
    });

    await ProductModel.create({
      id: "2",
      name: "Product 2",
      description: "Description 2",
      salesPrice: 150,
    });

    const storeCatalogFacade = StoreCatalogFacadeFactory.create();

    const result = await storeCatalogFacade.findAll();

    expect(result.products.length).toBe(2);
    expect(result.products[0].id).toBe("1");
    expect(result.products[1].id).toBe("2");
    expect(result.products[0].name).toBe("Product 1");
    expect(result.products[1].name).toBe("Product 2");
    expect(result.products[0].description).toBe("Description 1");
    expect(result.products[1].description).toBe("Description 2");
    expect(result.products[0].salesPrice).toBe(100);
    expect(result.products[1].salesPrice).toBe(150);
  });
});
