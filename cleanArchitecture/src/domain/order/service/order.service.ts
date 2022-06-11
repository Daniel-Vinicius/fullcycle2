import crypto from "crypto";

import { Order } from "@domain/order/entity/order";
import { Customer } from "@domain/customer/entity/customer";
import { OrderItem } from "@domain/order/entity/orderItem";

export class OrderService {
	static calculateTotal(orders: Order[]): number {
		const total = orders.reduce((acc, order) => acc += order.total(), 0);
		return total;
	}


	/** @description This method will create a new order and add the reward points to the customer */
	static placeOrder(customer: Customer, items: OrderItem[]): Order {
		const order = new Order(crypto.randomUUID(), customer.id, items);
		const rewardPoints = order.total() / 2;

		customer.addRewardPoints(rewardPoints);

		return order;
	}
}
