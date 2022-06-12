import { validate } from "uuid";

import { ProductRepositoryInterface } from "@domain/product/repository/productRepositoryInterface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export class FindProductUseCase {
	private productRepository: ProductRepositoryInterface;

	constructor(productRepository: ProductRepositoryInterface) {
		this.productRepository = productRepository;
	}

	async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
		const { id } = input;

		const IdIsInvalid = !validate(id);

		if (IdIsInvalid) {
			throw new Error("Invalid product id");
		}
		
		const product = await this.productRepository.find(id);

		const outputDto: OutputFindProductDto = product.toJSON();
		return outputDto;
	}
}
