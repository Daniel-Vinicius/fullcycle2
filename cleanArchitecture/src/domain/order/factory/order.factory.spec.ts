import crypto from "crypto";

import { OrderFactory } from "./order.factory";

describe("Order Factory unit test", () => {
	it("should create an order", () => {
		const orderProps = {
			id: crypto.randomUUID(),
			customerId: crypto.randomUUID(),
			items: [
				{
					id: crypto.randomUUID(),
					productId: crypto.randomUUID(),
					name: "Item 1",
					unitPrice: 100,
					quantity: 3
				}
			]
		};

		const order = OrderFactory.create(orderProps);

		expect(order.id).toBe(orderProps.id);
		expect(order.customerId).toBe(orderProps.customerId);
		expect(order.items.length).toBe(1);
	});

});
