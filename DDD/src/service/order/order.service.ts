import { Order } from "../../entity/order";

export class OrderService {
	static calculateTotal(orders: Order[]): number {
		const total = orders.reduce((acc, order) => acc += order.total(), 0);
		return total;
	}
}
