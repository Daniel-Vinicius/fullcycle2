import { ProductFactory } from "./product.factory";

describe("Product Factory unit tests", () => {
	it("should create a product type A", () => {
		const product = ProductFactory.create({
			type: "A",
			name: "Shirt",
			price: 10,
		});

		expect(product.id).toBeDefined();
		expect(product.name).toBe("Shirt");
		expect(product.price).toBe(10);
		expect(product.constructor.name).toBe("Product");
	});

	it("should create a product type B", () => {
		const product = ProductFactory.create({
			type: "B",
			name: "Blender",
			price: 200,
		});

		expect(product.id).toBeDefined();
		expect(product.name).toBe("Blender");
		expect(product.price).toBe(400);
		expect(product.constructor.name).toBe("ProductB");
	});

	it("should throw an error when product type is not supported", () => {
		expect(() => {
			ProductFactory.create({
				type: "C",
				name: "Product C",
				price: 25,
			});
		}).toThrowError("Product type unsupported");
	});
});
