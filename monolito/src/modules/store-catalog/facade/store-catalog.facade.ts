import { FindAllProductsUseCase } from "../usecases/find-all-products/find-all-products.usecase";
import { FindProductUseCase } from "../usecases/find-product/find-product.usecase";
import {
  FindAllStoreCatalogOutputDto,
  FindStoreCatalogInputDto,
  FindStoreCatalogOutputDto,
  StoreCatalogFacadeInterface,
} from "./store-catalog.facade.interface";

export interface UseCaseProps {
  findUseCase: FindProductUseCase;
  findAllUseCase: FindAllProductsUseCase;
}

export class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private _findUseCase: FindProductUseCase;
  private _findAllUseCase: FindAllProductsUseCase;

  constructor(useCases: UseCaseProps) {
    this._findUseCase = useCases.findUseCase;
    this._findAllUseCase = useCases.findAllUseCase;
  }

  async find({
    id,
  }: FindStoreCatalogInputDto): Promise<FindStoreCatalogOutputDto> {
    const product = await this._findUseCase.execute({ id });
    return product;
  }

  async findAll(): Promise<FindAllStoreCatalogOutputDto> {
    const products = await this._findAllUseCase.execute();
    return products;
  }
}
