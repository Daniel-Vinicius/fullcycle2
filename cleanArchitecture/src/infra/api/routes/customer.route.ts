import express, { Request, Response } from "express";

import { CustomerRepository } from "@infra/customer/repository/sequelize/customer.repository";

import { InputCreateCustomerDto, OutputCreateCustomerDto } from "@useCases/customer/create/create.customer.dto";
import { CreateCustomerUseCase } from "@useCases/customer/create/create.customer.usecase";

import { OutputListCustomerDto } from "@useCases/customer/list/list.customer.dto";
import { ListCustomerUseCase } from "@useCases/customer/list/list.customer.usecase";

import CustomerPresenter from "@infra/api/presenters/customer.presenter";

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

		const output: OutputCreateCustomerDto = await usecase.execute(customerDto);

		response.status(201).send(output);
	} catch (error) {
		response.status(400).send(error);
	}
});

customerRoute.get("/", async (request: Request, response: Response) => {
	const usecase = new ListCustomerUseCase(repository);

	try {
		const output: OutputListCustomerDto = await usecase.execute({});

		response.format({
			json: async () => response.status(200).send(output),
			xml: async () => response.send(CustomerPresenter.listXML(output)),
		});

	} catch (error) {
		response.status(400).send(error);
	}
});
