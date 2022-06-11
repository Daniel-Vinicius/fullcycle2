import crypto from "crypto";

import { Product } from "@domain/product/entity/product";
import { ProductInterface } from "@domain/product/entity/product.interface";
import { ProductB } from "@domain/product/entity/productB";

interface CreateProductInterface {
  type: string;
  name: string;
  price: number;
}

export class ProductFactory {
	public static create(data: CreateProductInterface): ProductInterface {
		const { type, name, price } = data;

		const uuid = crypto.randomUUID();

		switch (type) {
		case "A":
			return new Product(uuid, name, price);

		case "B":
			return new ProductB(uuid, name, price);

		default:
			throw new Error("Product type unsupported");
		}
	}
}
