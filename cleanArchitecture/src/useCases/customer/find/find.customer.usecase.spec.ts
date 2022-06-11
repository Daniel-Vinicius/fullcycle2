import { Sequelize } from "sequelize-typescript";

import { CustomerModel } from "@infra/customer/model/sequelize/customer.model";
import { CustomerRepository } from "@infra/customer/repository/sequelize/customer.repository";

import { CustomerFactory } from "@domain/customer/factory/customer.factory";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";
import { FindCustomerUseCase } from "./find.customer.usecase";

describe("Test find customer use case", () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});

		sequelize.addModels([CustomerModel]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	it("should find a customer", async () => {
		const customerRepository = new CustomerRepository();
		const useCase = new FindCustomerUseCase(customerRepository);

		const customer = CustomerFactory.createWithAddress({
			name: "John Doe",
			address: {
				street: "Street 1",
				number: 1,
				zip: "Zipcode 1",
				city: "City 1",
			}
		});

		await customerRepository.create(customer);

		const input: InputFindCustomerDto = {
			id: customer.id,
		};

		const expectedOutput: OutputFindCustomerDto = {
			id: customer.id,
			name: customer.name,
			address: customer.getAddress()?.toJSON()
		};

		const result = await useCase.execute(input);
		expect(result).toEqual(expectedOutput);
	});

});
