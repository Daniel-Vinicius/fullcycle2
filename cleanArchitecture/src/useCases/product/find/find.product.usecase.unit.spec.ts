import { ProductFactory } from "@domain/product/factory/product.factory";
import { InputFindProductDto } from "./find.product.dto";
import { FindProductUseCase } from "./find.product.usecase";

const product = ProductFactory.create({
	name: "Shirt",
	price: 10,
});

const MockRepository = () => {
	return {
		create: jest.fn(),
		update: jest.fn(),
		find: jest.fn().mockReturnValue(Promise.resolve(product)),
		findAll: jest.fn(),
	};
};

describe("Unit test find product use case", () => {
	it("should validate id", async () => {
		const repository = MockRepository();
		const findProductUseCase = new FindProductUseCase(repository);

		await expect(findProductUseCase.execute({
			id: "invalidID",
		})).rejects.toThrow("Invalid product id");
	});

	it("should find a product", async () => {
		const repository = MockRepository();
		const findProductUseCase = new FindProductUseCase(repository);

		const input: InputFindProductDto = {
			id: product.id,
		};

		const result = await findProductUseCase.execute(input);

		expect(result).toEqual(product.toJSON());
	});
});
