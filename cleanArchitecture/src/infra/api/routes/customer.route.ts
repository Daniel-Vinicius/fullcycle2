import express, { Request, Response } from "express";

import { CustomerRepository } from "@infra/customer/repository/sequelize/customer.repository";

import { InputCreateCustomerDto } from "@useCases/customer/create/create.customer.dto";
import { CreateCustomerUseCase } from "@useCases/customer/create/create.customer.usecase";
import { ListCustomerUseCase } from "@useCases/customer/list/list.customer.usecase";

export const customerRoute = express.Router();
const repository = new CustomerRepository();

customerRoute.post("/", async (request: Request, response: Response) => {
	const usecase = new CreateCustomerUseCase(repository);

	try {
		const { name, address } = request.body;
		const { street, city, number, zip } = address;

		const customerDto: InputCreateCustomerDto = {
			name,
			address: { street, city, number, zip },
		};

		const output = await usecase.execute(customerDto);

		response.status(201).send(output);
	} catch (error) {
		response.status(400).send(error);
	}
});

customerRoute.get("/", async (request: Request, response: Response) => {
	const usecase = new ListCustomerUseCase(repository);

	try {
		const output = await usecase.execute({});

		response.status(200).send(output);
	} catch (error) {
		response.status(400).send(error);
	}
});
