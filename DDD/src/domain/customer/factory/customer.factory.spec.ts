import { CustomerFactory } from "./customer.factory";

describe("Customer Factory unit tests", () => {
	const address = {
		street: "Wilkie Way",
		number: 4290,
		zip: "94306",
		city: "Palo Alto, CA"
	};

	it("should create a customer with an address", () => {
		const customer = CustomerFactory.create({
			name: "John Doe",
			address
		});

		expect(customer.id).toBeDefined();
		expect(customer.name).toBe("John Doe");

		expect(customer.getAddress()?.street).toBe(address.street);
		expect(customer.getAddress()?.number).toBe(address.number);
		expect(customer.getAddress()?.zip).toBe(address.zip);
		expect(customer.getAddress()?.city).toBe(address.city);
	});

	it("should create a customer without address", () => {
		const customer = CustomerFactory.create({ name: "John Doe" });

		expect(customer.id).toBeDefined();
		expect(customer.name).toBe("John Doe");
		expect(customer.getAddress()).toBeFalsy();
	});

});
