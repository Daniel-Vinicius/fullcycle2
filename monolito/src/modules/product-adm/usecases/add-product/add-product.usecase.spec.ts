import { AddProductInputDto } from "./add-product.dto";
import { AddProductUsecase } from "./add-product.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  };
};

describe("Add Product usecase unit test", () => {
  it("should add a product", async () => {
    const productRepository = MockRepository();
    const usecase = new AddProductUsecase(productRepository);

    const input: AddProductInputDto = {
      name: "Shirt",
      description: "Shirt description",
      purchasePrice: 100,
      stock: 10,
    };

    const result = await usecase.execute(input);

    expect(productRepository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();

    expect(result.name).toBe(input.name);
    expect(result.description).toBe(input.description);
    expect(result.purchasePrice).toBe(input.purchasePrice);
    expect(result.stock).toBe(input.stock);
  });
});
