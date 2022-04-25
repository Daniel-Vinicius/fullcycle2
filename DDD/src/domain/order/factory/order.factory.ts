import { Order } from "@domain/order/entity/order";
import { OrderItem } from "@domain/order/entity/orderItem";

interface CreateOrderInterface {
  id: string,
  customerId: string,
  items: {
    id: string;
    productId: string;
    name: string;
    unitPrice: number;
    quantity: number;
  }[]
}

export class OrderFactory {
	public static create(orderProps: CreateOrderInterface): Order {
		const { id, customerId, items } = orderProps;

		const itemsParsed = items.map(item => {
			const { productId, name, unitPrice, quantity } = item;
			return new OrderItem(item.id, productId, name, unitPrice, quantity);
		});

		const order = new Order(id, customerId, itemsParsed);

		return order;
	}
}
