import { ProductRepositoryInterface } from "@domain/product/repository/productRepositoryInterface";
import { Product } from "@domain/product/entity/product";
import { ProductModel } from "@infra/product/model/sequelize/product.model";

function productModelToProduct(productModel: ProductModel): Product {
	const product = new Product(productModel.id, productModel.name, productModel.price);
	return product;
}

export class ProductRepository implements ProductRepositoryInterface {
	async create(entity: Product): Promise<void> {
		await ProductModel.create({
			id: entity.id,
			name: entity.name,
			price: entity.price,
		});
	}

	async update(entity: Product): Promise<void> {
		await ProductModel.update(
			{
				name: entity.name,
				price: entity.price,
			},
			{ where: { id: entity.id } }
		);
	}

	async find(id: string): Promise<Product> {
		let productModel;
		try {
			productModel = await ProductModel.findOne({
				where: {
					id,
				},
				rejectOnEmpty: true,
			});
		} catch (error) {
			throw new Error("Product not found");
		}

		const product = productModelToProduct(productModel);

		return product;
	}

	async findAll(): Promise<Product[]> {
		const productsModel = await ProductModel.findAll();
		const products = productsModel.map((productModel) => productModelToProduct(productModel));

		return products;
	}
}
