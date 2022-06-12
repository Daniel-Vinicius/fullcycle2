import { ProductFactory } from "./product.factory";

describe("Product Factory unit tests", () => {
	it("should create a product", () => {
		const product = ProductFactory.create({
			name: "Shirt",
			price: 10,
		});

		expect(product.id).toBeDefined();
		expect(product.name).toBe("Shirt");
		expect(product.price).toBe(10);
		expect(product.constructor.name).toBe("Product");
	});
});
