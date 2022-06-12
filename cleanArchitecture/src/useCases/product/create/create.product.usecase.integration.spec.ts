import { Sequelize } from "sequelize-typescript";

import { ProductModel } from "@infra/product/model/sequelize/product.model";
import { ProductRepository } from "@infra/product/repository/sequelize/product.repository";

import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";
import { CreateProductUseCase } from "./create.product.usecase";


describe("Integration Test create product use case", () => {
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
		const productRepository = new ProductRepository();
		const useCase = new CreateProductUseCase(productRepository);

		const input: InputCreateProductDto = {
			name: "Shirt",
			price: 10,
		};

		const expectedOutput: OutputCreateProductDto = {
			id: expect.any(String),
			name: input.name,
			price: input.price
		};

		const result = await useCase.execute(input);
		expect(result).toEqual(expectedOutput);
	});

});
