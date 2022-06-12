import { CustomerFactory } from "@domain/customer/factory/customer.factory";
import { ListCustomerUseCase } from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress({
	name: "John Doe",
	address: {
		street: "Street",
		number: 123,
		zip: "Zip",
		city: "City",
	}
});

const customer2 = CustomerFactory.create("Jane Doe");

const MockRepository = () => {
	return {
		create: jest.fn(),
		update: jest.fn(),
		find: jest.fn(),
		findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
	};
};

describe("Unit test list customer use case", () => {
	it("should return a list of customers", async () => {
		const repository = MockRepository();
		const useCase = new ListCustomerUseCase(repository);

		const output = await useCase.execute({});
		const customer1Output = output.customers[0];
		const customer2Output = output.customers[1];
    
		expect(output.customers.length).toEqual(2);

		expect(customer1Output.id).toEqual(customer1.id);
		expect(customer1Output.name).toEqual(customer1.name);
		expect(customer1Output.address).toEqual(customer1.getAddress()?.toJSON());

		expect(customer2Output.id).toEqual(customer2.id);
		expect(customer2Output.name).toEqual(customer2.name);
		expect(customer2Output.address).toBeFalsy();
	});
});
