import { Order } from "@domain/entity/order";
import { OrderItem } from "@domain/entity/order/orderItem";

import { OrderRepositoryInterface } from "@domain/repository/orderRepositoryInterface";
import { OrderModel } from "@infra/database/sequelize/model/order.model";
import { OrderItemModel } from "../model/orderItem.model";

function orderItemToDatabase(orderItem: OrderItem) {
	return {
		id: orderItem.id,
		productId: orderItem.productId,
		name: orderItem.name,
		unitPrice: orderItem.unitPrice,
		quantity: orderItem.quantity,
	};
}

export class OrderRepository implements OrderRepositoryInterface {
	async create(entity: Order): Promise<void> {
		const items = entity.items.map(orderItemToDatabase);

		await OrderModel.create(
			{
				id: entity.id,
				customerId: entity.customerId,
				total: entity.total(),
				items,
			},
			{
				include: [{ model: OrderItemModel }]
			}
		);
	}

	update(entity: Order): Promise<void> {
		throw new Error("Method not implemented.");
	}
	find(id: string): Promise<Order> {
		throw new Error("Method not implemented.");
	}
	findAll(): Promise<Order[]> {
		throw new Error("Method not implemented.");
	}	
}
