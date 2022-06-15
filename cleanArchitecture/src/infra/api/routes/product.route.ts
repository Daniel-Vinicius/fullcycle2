import express, { Request, Response } from "express";

import { ProductRepository } from "@infra/product/repository/sequelize/product.repository";

import { InputCreateProductDto } from "@useCases/product/create/create.product.dto";
import { CreateProductUseCase } from "@useCases/product/create/create.product.usecase";
import { ListProductsUseCase } from "@useCases/product/list/list.product.usecase";

export const productRoute = express.Router();
const repository = new ProductRepository();

productRoute.post("/", async (request: Request, response: Response) => {
	const usecase = new CreateProductUseCase(repository);

	try {
		const { name, price } = request.body;

		const customerDto: InputCreateProductDto = {
			name,
			price
		};

		const output = await usecase.execute(customerDto);

		response.status(201).send(output);
	} catch (error) {
		response.status(400).send(error);
	}
});

productRoute.get("/", async (request: Request, response: Response) => {
	const usecase = new ListProductsUseCase(repository);

	try {
		const output = await usecase.execute({});

		response.status(200).send(output);
	} catch (error) {
		response.status(400).send(error);
	}
});
