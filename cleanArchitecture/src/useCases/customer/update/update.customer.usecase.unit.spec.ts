import { CustomerFactory } from "@domain/customer/factory/customer.factory";
import { UpdateCustomerUseCase } from "./update.customer.usecase";

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

	it("should validate id", async () => {
		const repository = MockRepository();
		const useCase = new UpdateCustomerUseCase(repository);

		await expect(useCase.execute({
			id: "invalidID",
		})).rejects.toThrow("Invalid customer id");
	});

	it("should update customer", async () => {
		const customerRepository = MockRepository();
		const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

		const result = await updateCustomerUseCase.execute(input);
		const expectedResult = input;

		expect(result).toEqual(expectedResult);
	});

	it("should update only customer name", async () => {
		const customerRepository = MockRepository();
		const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

		const inputWithoutAddress = {
			id: customer.id,
			name: "John Updated 2"
		};

		const result = await updateCustomerUseCase.execute(inputWithoutAddress);

		expect(result.address).toEqual(customer.getAddress()?.toJSON());
		expect(result.name).toEqual(inputWithoutAddress.name);
	});

	it("should update only customer address", async () => {
		const customerRepository = MockRepository();
		const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

		const inputWithoutName = {
			id: customer.id,
			address: {
				street: "Street Updated 2",
				number: 321,
				zip: "Zip Updated 2",
				city: "City Updated 2",
			}
		};

		const result = await updateCustomerUseCase.execute(inputWithoutName);

		expect(result.name).toEqual(customer.name);
		expect(result.address).toEqual(inputWithoutName.address);
	});
});
