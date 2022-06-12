import { ProductFactory } from "@domain/product/factory/product.factory";
import { InputCreateProductDto } from "./create.product.dto";
import { CreateProductUseCase } from "./create.product.usecase";

const product = ProductFactory.create({
	name: "Shirt",
	price: 10,
});

const MockRepository = () => {
	return {
		create: jest.fn().mockReturnValue(Promise.resolve(product)),
		update: jest.fn(),
		find: jest.fn(),
		findAll: jest.fn(),
	};
};

describe("Unit test create product use case", () => {
	it("should create a product", async () => {
		const repository = MockRepository();
		const createProductUseCase = new CreateProductUseCase(repository);

		const input: InputCreateProductDto = {
			name: product.name,
			price: product.price,
		};

		const result = await createProductUseCase.execute(input);

		expect(result.id).toBeTruthy();
		expect(result.name).toEqual(product.name);
		expect(result.price).toEqual(product.price);
	});
});
