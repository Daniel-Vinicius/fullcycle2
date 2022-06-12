import { Sequelize } from "sequelize-typescript";

import { ProductModel } from "@infra/product/model/sequelize/product.model";
import { ProductRepository } from "@infra/product/repository/sequelize/product.repository";

import { InputListProductsDto, OutputListProductsDto } from "./list.product.dto";
import { ListProductsUseCase } from "./list.product.usecase";
import { ProductFactory } from "@domain/product/factory/product.factory";


describe("Integration Test list product use case", () => {
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

	it("should list products", async () => {
		const productRepository = new ProductRepository();
		const useCase = new ListProductsUseCase(productRepository);

		const product1 = ProductFactory.create({
			name: "Shirt",
			price: 10,
		});

		const product2 = ProductFactory.create({
			name: "Shirt",
			price: 10,
		});

		await productRepository.create(product1);
		await productRepository.create(product2);

		const input: InputListProductsDto = {};

		const expectedOutput: OutputListProductsDto = {
			products: [product1.toJSON(), product2.toJSON()],
		};

		const result = await useCase.execute(input);
		expect(result).toEqual(expectedOutput);
	});

});
