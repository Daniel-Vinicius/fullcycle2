import { StoreCatalogFacade } from "../facade/store-catalog.facade";
import { ProductRepository } from "../repository/product.repository";
import { FindAllProductsUseCase } from "../usecases/find-all-products/find-all-products.usecase";
import { FindProductUseCase } from "../usecases/find-product/find-product.usecase";

export class StoreCatalogFacadeFactory {
  static create(): StoreCatalogFacade {
    const productRepository = new ProductRepository();

    const findProductUseCase = new FindProductUseCase(productRepository);
    const findAllProductsUseCase = new FindAllProductsUseCase(
      productRepository
    );

    const storeCatalogFacade = new StoreCatalogFacade({
      findUseCase: findProductUseCase,
      findAllUseCase: findAllProductsUseCase,
    });

    return storeCatalogFacade;
  }
}
