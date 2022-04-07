import { Customer } from "./customer";
import { Address } from "./address";

describe("Customer unit tests", () => {
	function emptyIdValidation() {
		expect(() => {
			new Customer("123", "");
		}).toThrowError("Name is required");
	}

	function emptyNameValidation() {
		expect(() => {
			new Customer("123", "");
		}).toThrowError("Name is required");
	}

	function atLeastTwoWordsNameValidation() {
		expect(() => {
			new Customer("123", "John");
		}).toThrowError("Name must contain at least two words");
	}

	function setAddressToCustomer(customer: Customer) {
		const address = new Address("Wilkie Way", 4290, 94306, "Palo Alto, CA");
		customer.setAddress(address);
	}

	function activateCustomer(customer: Customer) {
		setAddressToCustomer(customer);
		customer.activate();
	}

	it("should throw error when id is empty", () => {
		emptyIdValidation();
	});

	it("should throw error when name is empty", () => {
		emptyNameValidation();
	});

	it("should throw error when name don't have at least two words", () => {
		atLeastTwoWordsNameValidation();
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
		setAddressToCustomer(customer);

		expect(customer.getAddress()).toBeTruthy();
	});

	it("should activate a customer", () => {
		const customer = new Customer("123", "John Doe");

		activateCustomer(customer);

		expect(customer.active).toBe(true);
	});

	it("should deactivate a customer", () => {
		const customer = new Customer("123", "John Doe");
		activateCustomer(customer);

		customer.deactivate();
		expect(customer.active).toBe(false);
	});

});
