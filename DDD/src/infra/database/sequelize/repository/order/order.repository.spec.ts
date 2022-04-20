import { Sequelize } from "sequelize-typescript";

import { OrderModel } from "@infra/database/sequelize/model/order.model";
import { CustomerModel } from "@infra/database/sequelize/model/customer.model";
import { OrderItemModel } from "@infra/database/sequelize/model/orderItem.model";
import { ProductModel } from "@infra/database/sequelize/model/product.model";

import { Customer } from "@domain/customer/entity/customer";
import { Address } from "@domain/customer/valueObject/address";
import { Product } from "@domain/product/entity/product";
import { OrderItem } from "@domain/order/entity/orderItem";
import { Order } from "@domain/order/entity/order";

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

	function getCustomerWithAddress() {
		const customer = new Customer("123", "John Doe");
		const address = new Address("Wilkie Way", 4290, "94306", "Palo Alto, CA");
		customer.setAddress(address);
		
		return customer;
	}

	it("should create a order", async () => {
		const customerRepository = new CustomerRepository();
		const productRepository = new ProductRepository();
		const orderRepository = new OrderRepository();

		const customer = getCustomerWithAddress();
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

	it("should update items and the total of an order", async () => {
		const customerRepository = new CustomerRepository();
		const productRepository = new ProductRepository();
		const orderRepository = new OrderRepository();

		const customer = getCustomerWithAddress();
		await customerRepository.create(customer);

		const product1 = new Product("23", "Shoes", 259.99);
		const product2 = new Product("24", "Shirt", 89.99);
		const product3 = new Product("25", "Pack of socks", 19.99);

		await productRepository.create(product1);
		await productRepository.create(product2);
		await productRepository.create(product3);

		const orderItem1 = new OrderItem("247", product1.id, "Order Item 1", product1.price, 1);
		const orderItem2 = new OrderItem("248", product2.id, "Order Item 2", product2.price, 2);

		const order = new Order("329", customer.id, [orderItem1, orderItem2]);

		await orderRepository.create(order);

		const orderItem3 = new OrderItem("249", product3.id, "Order Item 3", product3.price, 1);
		
		order.addItem(orderItem3);

		await orderRepository.update(order);

		const orderFromDB = await OrderModel.findOne({
			where: { id: order.id },
			include: ["items"],
		});

		expect(orderFromDB?.items.length).toBe(3);
		expect(orderFromDB?.total).toBe(order.total());

		order.removeItem(orderItem1.id);
		order.removeItem(orderItem2.id);

		await orderRepository.update(order);

		const orderFromDB2 = await OrderModel.findOne({
			where: { id: order.id },
			include: ["items"],
		});

		expect(orderFromDB2?.items.length).toBe(1);
		expect(orderFromDB2?.total).toBe(order.total());
	});

	it("should throw an error when customer is not found", async () => {
		const orderRepository = new OrderRepository();

		expect(async () => {
			await orderRepository.find("973");
		}).rejects.toThrow("Order with id: 973 not found");
	});


	it("should find a order", async () => {
		const customerRepository = new CustomerRepository();
		const productRepository = new ProductRepository();
		const orderRepository = new OrderRepository();

		const customer = getCustomerWithAddress();
		await customerRepository.create(customer);

		const product1 = new Product("23", "Shoes", 259.99);
		await productRepository.create(product1);

		const orderItem1 = new OrderItem("256", product1.id, "Order Item 1", product1.price, 1);
		const order = new Order("332", customer.id, [orderItem1]);
		await orderRepository.create(order);

		const orderFound = await orderRepository.find(order.id);

		expect(orderFound).toEqual(order);
	});

	it("should find all orders", async () => {
		const customerRepository = new CustomerRepository();
		const productRepository = new ProductRepository();
		const orderRepository = new OrderRepository();

		const customer = getCustomerWithAddress();
		await customerRepository.create(customer);

		const product1 = new Product("23", "Shoes", 259.99);
		const product2 = new Product("24", "Shirt", 89.99);
		const product3 = new Product("25", "Pack of socks", 19.99);

		await productRepository.create(product1);
		await productRepository.create(product2);
		await productRepository.create(product3);

		const orderItem1 = new OrderItem("247", product1.id, "Order Item 1", product1.price, 1);
		const orderItem2 = new OrderItem("248", product2.id, "Order Item 2", product2.price, 2);
		const orderItem3 = new OrderItem("249", product3.id, "Order Item 3", product3.price, 1);

		const order1 = new Order("329", customer.id, [orderItem1, orderItem2]);
		const order2 = new Order("330", customer.id, [orderItem3]);

		await orderRepository.create(order1);
		await orderRepository.create(order2);

		const orders = await orderRepository.findAll();

		expect(orders.length).toBe(2);
		expect(orders).toContainEqual(order1);
		expect(orders).toContainEqual(order2);
	});
});
