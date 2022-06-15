import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";

import { CustomerModel } from "@infra/customer/model/sequelize/customer.model";
import { ProductModel } from "@infra/product/model/sequelize/product.model";

import { customerRoute } from "./routes/customer.route";
import { productRoute } from "./routes/product.route";

export const app: Express = express();
app.use(express.json());
app.use("/customer", customerRoute);
app.use("/product", productRoute);

export let sequelize: Sequelize;

async function setupDb() {
	sequelize = new Sequelize({
		dialect: "sqlite",
		storage: ":memory:",
		logging: false,
	});

	sequelize.addModels([CustomerModel, ProductModel]);
	await sequelize.sync();
}

setupDb();
