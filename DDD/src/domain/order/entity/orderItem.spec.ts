import { OrderItem } from "./orderItem";

describe("Order Item unit tests", () => {
	it("should throw error when id is empty", () => {
		expect(() => {
			new OrderItem("", "21", "Order Item one", 99.99, 2);
		}).toThrowError("Id is required");
	});

	it("should throw error when productId is empty", () => {
		expect(() => {
			new OrderItem("1", "", "Order Item one", 99.99, 2);
		}).toThrowError("ProductId is required");
	});

	it("should throw error when name is empty", () => {
		expect(() => {
			new OrderItem("1", "21", "", 99.99, 2);
		}).toThrowError("Name is required");
	});

	it("should throw error if the price is less than or equal to 0", () => {
		expect(() => {
			new OrderItem("1", "21", "Order Item one", -299.99, 2);
		}).toThrowError("Price must be greater than zero");
	});

	it("should throw error if the quantity is less than or equal to 0", () => {
		expect(() => {
			new OrderItem("1", "21", "Order Item one", 99.99, -2);
		}).toThrowError("Quantity must be greater than zero");
	});
});
