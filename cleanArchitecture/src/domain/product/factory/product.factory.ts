import crypto from "crypto";

import { Product } from "@domain/product/entity/product";

interface CreateProductInterface {
	name: string;
	price: number;
}

export class ProductFactory {
	public static create(data: CreateProductInterface) {
		const { name, price } = data;

		const uuid = crypto.randomUUID();

		return new Product(uuid, name, price);
	}
}
