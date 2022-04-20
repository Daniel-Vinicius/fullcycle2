import { Order } from "./order";
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
			new OrderItem("1", "product-21", "Order Item one", 99.99, 2),
			new OrderItem("2", "product-62", "Order Item two", 199.99, 1)
		];

		const order = new Order("1", "123", items);

		expect(order.total()).toBe(399.97);
	});

	it("should add item", () => {
		const items = [
			new OrderItem("1", "product-21", "Order Item one", 99.99, 2),
			new OrderItem("2", "product-62", "Order Item two", 199.99, 1)
		];

		const order = new Order("1", "123", items);

		const newItem = new OrderItem("3", "product-75", "Order Item three", 99.99, 1);
		order.addItem(newItem);

		expect(order.items.length).toBe(3);
	});

	it("should remove item", () => {
		const item1 = new OrderItem("1", "product-21", "Order Item one", 99.99, 2);
		const item2 = new OrderItem("2", "product-62", "Order Item two", 199.99, 1);
		const items = [item1, item2];

		const order = new Order("1", "123", items);

		expect(order.items.length).toBe(2);

		order.removeItem(item1.id);

		expect(order.items.length).toBe(1);
		expect(order.items[0]).toBe(item2);
	});

	it("should throw error when item not found", () => {
		const item1 = new OrderItem("1", "product-21", "Order Item one", 99.99, 2);
		const item2 = new OrderItem("2", "product-62", "Order Item two", 199.99, 1);
		const items = [item1, item2];

		const order = new Order("1", "123", items);

		expect(() => {
			order.removeItem("3");
		}).toThrowError("Item not found");
	});

});
