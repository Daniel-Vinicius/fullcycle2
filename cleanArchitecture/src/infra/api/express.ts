import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";

import { CustomerModel } from "@infra/customer/model/sequelize/customer.model";

export const app: Express = express();
app.use(express.json());

export let sequelize: Sequelize;

async function setupDb() {
	sequelize = new Sequelize({
		dialect: "sqlite",
		storage: ":memory:",
		logging: false,
	});

	sequelize.addModels([CustomerModel]);
	await sequelize.sync();
}

setupDb();
