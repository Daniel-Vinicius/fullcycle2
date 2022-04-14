import { Order } from "../../entity/order";
import { OrderItem } from "../../entity/order/orderItem";

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
});
