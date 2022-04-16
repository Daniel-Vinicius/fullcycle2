import { Sequelize } from "sequelize-typescript";

import { Order } from "@domain/entity/order";

describe("Order repository test", () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});

		sequelize.addModels([OrderModel]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	it("should create a order", async () => {
		const orderRepository = new OrderRepository();
	});
});
