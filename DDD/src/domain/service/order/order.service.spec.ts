import { Order } from "../../entity/order";
import { OrderItem } from "../../entity/order/orderItem";
import { Customer } from "../../entity/customer";

import { OrderService } from "./order.service";

describe("Order service unit tests", () => {
	it("should calculate total of all orders", () => {
		const items = [
			new OrderItem("1", "product-41", "Order Item one", 99.99, 2),
			new OrderItem("2", "product-3", "Order Item two", 199.99, 1)
		];

		const order1 = new Order("1", "123", items);
		const order2 = new Order("2", "523", items);

		const orders = [order1, order2];

		const totalOfOrders = OrderService.calculateTotal(orders);

		expect(totalOfOrders).toBe(799.94);
	});

	it("should place an order", () => {
		const customer = new Customer("123", "John Doe");
		const item = new OrderItem("4", "product-13", "Order Item four", 200, 50);

		const order = OrderService.placeOrder(customer, [item]);

		const expectedRewardPoints = order.total() / 2;

		expect(order.total()).toBe(10000);
		expect(customer.rewardPoints).toBe(expectedRewardPoints);
	});
});
