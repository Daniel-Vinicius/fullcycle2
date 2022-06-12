import { CustomerFactory } from "@domain/customer/factory/customer.factory";

const customer = CustomerFactory.createWithAddress({
	name: "John Doe",
	address: {
		street: "Street",
		number: 123,
		zip: "Zip",
		city: "City",
	}
});

const input = {
	id: customer.id,
	name: "John Updated",
	address: {
		street: "Street Updated",
		number: 321,
		zip: "Zip Updated",
		city: "City Updated",
	}
};

const MockRepository = () => {
	return {
		create: jest.fn(),
		update: jest.fn(),
		find: jest.fn().mockReturnValue(Promise.resolve(customer)),
		findAll: jest.fn(),
	};
};

describe("Unit test customer update use case", () => {
	it("should update customer", async () => {
		const customerRepository = MockRepository();
		const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

		const result = await updateCustomerUseCase.execute(input);
		const expectedResult = input;

		expect(result).toEqual(expectedResult);
	});
});
