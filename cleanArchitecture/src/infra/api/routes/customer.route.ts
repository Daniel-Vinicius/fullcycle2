import express, { Request, Response } from "express";

import { CustomerRepository } from "@infra/customer/repository/sequelize/customer.repository";

import { CreateCustomerUseCase } from "@useCases/customer/create/create.customer.usecase";
import { InputCreateCustomerDto } from "@useCases/customer/create/create.customer.dto";

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
