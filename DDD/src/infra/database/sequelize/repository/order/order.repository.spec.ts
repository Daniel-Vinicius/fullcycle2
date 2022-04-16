import { Sequelize } from "sequelize-typescript";

import { OrderModel } from "@infra/database/sequelize/model/order.model";
import { CustomerModel } from "@infra/database/sequelize/model/customer.model";
import { OrderItemModel } from "@infra/database/sequelize/model/orderItem.model";
import { ProductModel } from "@infra/database/sequelize/model/product.model";

import { Customer } from "@domain/entity/customer";
import { Address } from "@domain/entity/customer/address";
import { Product } from "@domain/entity/product";
import { OrderItem } from "@domain/entity/order/orderItem";
import { Order } from "@domain/entity/order";

import { CustomerRepository } from "@infra/database/sequelize/repository/customer/customer.repository";
import { ProductRepository } from "@infra/database/sequelize/repository/product/product.repository";
import { OrderRepository } from "./order.repository";

describe("Order repository test", () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});

		sequelize.addModels([OrderModel, CustomerModel, OrderItemModel, ProductModel]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	it("should create a order", async () => {
		const customerRepository = new CustomerRepository();
		const productRepository = new ProductRepository();
		const orderRepository = new OrderRepository();

		const customer = new Customer("123", "John Doe");
		const address = new Address("Wilkie Way", 4290, "94306", "Palo Alto, CA");
		customer.setAddress(address);
		await customerRepository.create(customer);

		const product1 = new Product("23", "Shoes", 259.99);
		const product2 = new Product("24", "Shirt", 89.99);

		await productRepository.create(product1);
		await productRepository.create(product2);

		const orderItem1 = new OrderItem("247", product1.id, "Order Item 1", product1.price, 1);
		const orderItem2 = new OrderItem("248", product2.id, "Order Item 2", product2.price, 2);

		const order = new Order("329", customer.id, [orderItem1, orderItem2]);

		await orderRepository.create(order);

		const orderFromDB = await OrderModel.findOne({ 
			where: { id: order.id },
			include: ["items"],
		});

		expect(orderFromDB?.toJSON()).toStrictEqual({
			id: order.id,
			customerId: order.customerId,
			total: order.total(),
			items: [
				{
					id: orderItem1.id,
					productId: orderItem1.productId,
					name: orderItem1.name,
					unitPrice: orderItem1.unitPrice,
					quantity: orderItem1.quantity,
					orderId: order.id,
				},
				{
					id: orderItem2.id,
					productId: orderItem2.productId,
					name: orderItem2.name,
					unitPrice: orderItem2.unitPrice,
					quantity: orderItem2.quantity,
					orderId: order.id,
				},
			],
		});

	});
});
