import { ProductFactory } from "@domain/product/factory/product.factory";
import { ProductRepositoryInterface } from "@domain/product/repository/productRepositoryInterface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export class CreateProductUseCase {
	private productRepository: ProductRepositoryInterface;

	constructor(productRepository: ProductRepositoryInterface) {
		this.productRepository = productRepository;
	}

	async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
		const { name, price } = input;

		const product = ProductFactory.create({ name, price });

		await this.productRepository.create(product);

		const outputDto: OutputCreateProductDto = {
			id: product.id,
			name: product.name,
			price: product.price,
		};

		return outputDto;
	}
}
