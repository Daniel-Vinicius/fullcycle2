import { Order } from ".";
import { OrderItem } from "./orderItem";

describe("Order unit tests", () => {

	it("should throw error when id is empty", () => {
		expect(() => {
			new Order("", "123", []);
		}).toThrowError("Id is required");
	});

	it("should throw error when customerId is empty", () => {
		expect(() => {
			new Order("1", "", []);
		}).toThrowError("CustomerId is required");
	});

	it("order must have at least one item", () => {
		expect(() => {
			new Order("1", "123", []);
		}).toThrowError("Order must have at least one item");
	});

	it("should calculate total", () => {
		const items = [
			new OrderItem("1", "product-1", "Shirt", 99.99, 2),
			new OrderItem("2", "product-2", "Shoes", 199.99, 1)
		];

		const order = new Order("1", "123", items);

		expect(order.total()).toBe(399.97);
	});

	it("should throw error if the item quantity is less than or equal to 0", () => {
		expect(() => {
			const items = [
				new OrderItem("1", "product-1", "Shirt", 99.99,  -1),
				new OrderItem("2", "product-2", "Shoes", 199.99,  0)
			];

			new Order("1", "123", items);
		}).toThrowError("Quantity must be greater than zero");
	});
});
