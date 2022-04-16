import { Order } from "@domain/entity/order";
import { OrderItem } from "@domain/entity/order/orderItem";

import { OrderRepositoryInterface } from "@domain/repository/orderRepositoryInterface";
import { OrderModel } from "@infra/database/sequelize/model/order.model";
import { OrderItemModel } from "@infra/database/sequelize/model/orderItem.model";

function orderItemToDatabase(orderItem: OrderItem) {
	return {
		id: orderItem.id,
		productId: orderItem.productId,
		name: orderItem.name,
		unitPrice: orderItem.unitPrice,
		quantity: orderItem.quantity,
	};
}

function orderItemModelToOrderItem(orderItemModel: OrderItemModel) {
	return new OrderItem(orderItemModel.id, orderItemModel.productId, orderItemModel.name, orderItemModel.unitPrice, orderItemModel.quantity);
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

	async update(entity: Order): Promise<void> {
		const updatedItems = entity.items.map(orderItemToDatabase);
		const itemsOnDB = await OrderItemModel.findAll({ where: { orderId: entity.id } });

		for (const updatedItem of updatedItems) {
			const itemExistsOnDB = itemsOnDB.find((itemOnDB) => itemOnDB.id === updatedItem.id);

			if (!itemExistsOnDB) {
				await OrderItemModel.create({ ...updatedItem, orderId: entity.id });
			}
		}

		for (const itemOnDB of itemsOnDB) {
			const itemExistsOnUpdatedItems = updatedItems.find((updatedItem) => updatedItem.id === itemOnDB.id);

			if (!itemExistsOnUpdatedItems) {
				await OrderItemModel.destroy({ where: { id: itemOnDB.id } });
			}
		}

		await OrderModel.update({ total: entity.total() }, { where: { id: entity.id } });
	}

	async find(id: string): Promise<Order> {
		const orderOnDB = await OrderModel.findOne({
			where: { id },
			include: [{ model: OrderItemModel }]
		});

		if (!orderOnDB) {
			throw new Error(`Order with id: "${id}" not found`);
		}

		const items = orderOnDB.items.map(orderItemModelToOrderItem);
		const order = new Order(orderOnDB.id, orderOnDB.customerId, items);

		return order;
	}

	async findAll(): Promise<Order[]> {
		const ordersOnDB = await OrderModel.findAll({ include: [{ model: OrderItemModel }] });

		const orders = ordersOnDB.map((orderOnDB) => {
			const items = orderOnDB.items.map(orderItemModelToOrderItem);
			const order = new Order(orderOnDB.id, orderOnDB.customerId, items);

			return order;
		});

		return orders;
	}
}
