import crypto from "crypto";

import { Order } from "../../entity/order";
import { Customer } from "../../entity/customer";
import { OrderItem } from "../../entity/order/orderItem";

export class OrderService {
	static calculateTotal(orders: Order[]): number {
		const total = orders.reduce((acc, order) => acc += order.total(), 0);
		return total;
	}

	static placeOrder(customer: Customer, items: OrderItem[]): Order {
		const order = new Order(crypto.randomUUID(), customer.id, items);
		const rewardPoints = order.total() / 2;

		customer.addRewardPoints(rewardPoints);

		return order;
	}
}
