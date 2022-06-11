import { CustomerFactory } from "@domain/customer/factory/customer.factory";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";
import { FindCustomerUseCase } from "./find.customer.usecase";

const customer = CustomerFactory.createWithAddress({
	name: "John Doe",
	address: {
		street: "Street 1",
		number: 1,
		zip: "Zipcode 1",
		city: "City 1",
	}
});

const MockRepository = () => {
	return {
		create: jest.fn(),
		update: jest.fn(),
		find: jest.fn().mockResolvedValue(Promise.resolve(customer)),
		findAll: jest.fn(),
	};
};

describe("Unit Test find customer use case", () => {
	it("should find a customer", async () => {
		const customerRepository = MockRepository();
		const useCase = new FindCustomerUseCase(customerRepository);

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
