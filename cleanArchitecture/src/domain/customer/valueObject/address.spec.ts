import { Address } from "./address";

describe("Address unit tests", () => {
	it("should throw error when street is empty", () => {
		expect(() => {
			new Address("", 4290, "94306", "Palo Alto, CA");
		}).toThrowError("Street is required");
	});

	it("should throw error when number is less than or equal to 0", () => {
		expect(() => {
			new Address("Wilkie Way", -20, "94306", "Palo Alto, CA");
		}).toThrowError("Number must be greater than 0");
	});

	it("should throw error when city is empty", () => {
		expect(() => {
			new Address("Wilkie Way", 4290, "94306", "");
		}).toThrowError("City is required");
	});

	it("should return a string in the expected format", () => {
		const address = new Address("Wilkie Way", 4290, "94306", "Palo Alto, CA");

		expect(address.toString()).toBe("Wilkie Way, 4290, 94306 Palo Alto, CA");
	});

	it("should return a JSON object in the expected format", () => {
		const address = new Address("Wilkie Way", 4290, "94306", "Palo Alto, CA");

		expect(address.toJSON()).toEqual({
			street: "Wilkie Way",
			number: 4290,
			zip: "94306",
			city: "Palo Alto, CA",
		});
	});

});
