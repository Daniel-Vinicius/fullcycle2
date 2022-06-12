import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";
import { CreateCustomerUseCase } from "./create.customer.usecase";

const MockRepository = () => {
	return {
		create: jest.fn(),
		update: jest.fn(),
		find: jest.fn(),
		findAll: jest.fn(),
	};
};

const input: InputCreateCustomerDto = {
	name: "John Doe",
	address: {
		street: "Street",
		number: 123,
		zip: "12345",
		city: "City"
	}
};

describe("Unit Test create customer usecase", () => {
	it("should create customer", async () => {
		const customerRepository = MockRepository();
		const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

		const result = await createCustomerUseCase.execute(input);
    
		const outputExpected: OutputCreateCustomerDto = {
			id: expect.any(String),
			name: input.name,
			address: input.address
		};

		expect(result).toEqual(outputExpected);
	});

	it("should throw error when name is missing", async () => {
		const customerRepository = MockRepository();
		const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

		input.name = "";

		await expect(createCustomerUseCase.execute(input)).rejects.toThrow("Name is required");

		input.name = "John Doe";
	});

	it("should throw error when some data of address is invalid or missing", async () => {
		const customerRepository = MockRepository();
		const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

		input.address = {
			street: "",
			number: 123,
			zip: "12345",
			city: "City"
		};

		await expect(createCustomerUseCase.execute(input)).rejects.toThrow("Street is required");

		input.address.street = "Street";
		input.address.number = -2901;
		await expect(createCustomerUseCase.execute(input)).rejects.toThrow("Number must be greater than 0");

		input.address.number = 123;
		input.address.zip = "";
		await expect(createCustomerUseCase.execute(input)).rejects.toThrow("Zip is required");

		input.address.zip = "12345";
		input.address.city = "";
		await expect(createCustomerUseCase.execute(input)).rejects.toThrow("City is required");
	});

});
