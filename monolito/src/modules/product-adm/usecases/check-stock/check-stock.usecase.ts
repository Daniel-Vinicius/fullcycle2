import { UseCaseInterface } from "../../../@shared/usecase/usecase.interface";
import { CheckStockInputDto, CheckStockOutputDto } from "./check-stock.dto";
import { ProductGateway } from "../../gateway/product.gateway";

export class CheckStockUseCase implements UseCaseInterface {
  private _productRepository: ProductGateway;

  constructor(productRepository: ProductGateway) {
    this._productRepository = productRepository;
  }

  async execute({
    productId,
  }: CheckStockInputDto): Promise<CheckStockOutputDto> {
    const product = await this._productRepository.find(productId);

    return {
      productId: product.id.id,
      stock: product.stock,
    };
  }
}
