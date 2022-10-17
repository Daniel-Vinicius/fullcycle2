import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Product } from "../../domain/product.entity";
import { FindAllProductsUseCase } from "./find-all-products.usecase";

const product = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Description 1",
  salesPrice: 100,
});

const product2 = new Product({
  id: new Id("2"),
  name: "Product 2",
  description: "Description 2",
  salesPrice: 200,
});

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2])),
  };
};

describe("FindAllProducts usecase unit test", () => {
  it("should find all products", async () => {
    const productRepository = MockRepository();
    const findAllProductsUseCase = new FindAllProductsUseCase(
      productRepository
    );

    const result = await findAllProductsUseCase.execute();

    expect(productRepository.findAll).toHaveBeenCalled();
    expect(result.products.length).toBe(2);
    expect(result.products[0].name).toBe("Product 1");
    expect(result.products[1].name).toBe("Product 2");
  });
});
