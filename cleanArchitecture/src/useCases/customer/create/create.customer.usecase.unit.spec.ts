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

describe("Unit Test create customer usecase", () => {
	it("should create customer", async () => {
		const customerRepository = MockRepository();
		const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

		const input: InputCreateCustomerDto = {
			name: "John Doe",
			address: {
				street: "Street",
				number: 123,
				zip: "12345",
				city: "City"
			}
		};

		const result = await createCustomerUseCase.execute(input);
    
		const outputExpected: OutputCreateCustomerDto = {
			id: expect.any(String),
			name: input.name,
			address: input.address
		};

		expect(result).toEqual(outputExpected);
	});

});
