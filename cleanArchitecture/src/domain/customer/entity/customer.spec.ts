import { Customer } from "./customer";
import { Address } from "@domain/customer/valueObject/address";

describe("Customer unit tests", () => {
	const address = new Address("Wilkie Way", 4290, "94306", "Palo Alto, CA");

	it("should throw error when id is empty", () => {
		expect(() => {
			new Customer("", "John Doe");
		}).toThrowError("Id is required");
	});

	it("should throw error when name is empty", () => {
		expect(() => {
			new Customer("123", "");
		}).toThrowError("Name is required");
	});

	it("should throw error when name don't have at least two words", () => {
		expect(() => {
			new Customer("123", "John");
		}).toThrowError("Name must contain at least two words");
	});

	it("should change name", () => {
		const customer = new Customer("123", "John Doe");

		customer.changeName("Daniel Vinícius");

		expect(customer.name).toBe("Daniel Vinícius");
	});

	it("should validate when change name", () => {
		expect(() => {
			const customer = new Customer("123", "John Doe");
			customer.changeName("");
		}).toThrowError("Name is required");
	});

	it("should not activate a customer without address", () => {
		expect(() => {
			const customer = new Customer("123", "John Doe");
			customer.activate();
		}).toThrowError("Address is mandatory to active a customer");
	});

	it("should set address to a customer", () => {
		const customer = new Customer("123", "John Doe");
		customer.setAddress(address);

		expect(customer.getAddress()).toBe(address);
	});

	it("should activate and deactivate a customer", () => {
		const customer = new Customer("123", "John Doe");
		customer.setAddress(address);

		customer.activate();
		expect(customer.active).toBe(true);

		customer.deactivate();
		expect(customer.active).toBe(false);
	});

	it("should add reward points", () => {
		const customer = new Customer("123", "John Doe");
		expect(customer.rewardPoints).toBe(0);

		customer.addRewardPoints(100);

		expect(customer.rewardPoints).toBe(100);

		customer.addRewardPoints(100);

		expect(customer.rewardPoints).toBe(200);
	});

	it("should not add negative reward points", () => {
		expect(() => {
			const customer = new Customer("123", "John Doe");
			customer.addRewardPoints(100);

			customer.addRewardPoints(-50);
		}).toThrowError("Points must be positive");
	});
});
