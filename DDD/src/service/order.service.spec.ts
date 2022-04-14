// 1:56 minutes Definindo nosso ProductService

import { Product } from "../entity/product";

describe("Product service unit tests", () => {
	it("should change the prices of all products", () => {
		const product1 = new Product("1", "Product 1", 100);
		const product2 = new Product("2", "Product 2", 150);
		const products = [product1, product2];

		ProductService.incrasePrices(products, 20);

		expect(product1.price).toBe(120);
		expect(product2.price).toBe(180);
	});
});
