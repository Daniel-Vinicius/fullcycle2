import { Product } from "./product";

describe("Product unit tests", () => {
	it("should throw error when id is empty", () => {
		expect(() => {
			new Product("", "Product 1", 100);
		}).toThrowError("Id is required");
	});

	it("should throw error when name is empty", () => {
		expect(() => {
			new Product("1", "", 100);
		}).toThrowError("Name is required");
	});

	it("should throw error when price is less than or equal to zero", () => {
		expect(() => {
			new Product("1", "Product 1", -10);
		}).toThrowError("Price must be greater than zero");
	});

	it("it should change name", () => {
		const product = new Product("1", "Product 1", 100);

		product.changeName("Product 2");

		expect(product.name).toBe("Product 2");
	});

	it("it should change price", () => {
		const product = new Product("1", "Product 1", 100);

		product.changePrice(90);

		expect(product.price).toBe(90);
	});

	it("it should apply discount", () => {
		const product = new Product("1", "Product 1", 100);

		product.applyDiscount(10);

		expect(product.price).toBe(90);
	});
});
