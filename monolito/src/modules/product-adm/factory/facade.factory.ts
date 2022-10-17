import { ProductAdmFacade } from "../facade/product-adm.facade";

import { ProductRepository } from "../repository/product.repository";
import { AddProductUsecase } from "../usecases/add-product/add-product.usecase";
import { CheckStockUseCase } from "../usecases/check-stock/check-stock.usecase";

export class ProductAdmFacadeFactory {
  static create(): ProductAdmFacade {
    const productRepository = new ProductRepository();
    const addProductUseCase = new AddProductUsecase(productRepository);
    const checkStockUseCase = new CheckStockUseCase(productRepository);

    const productAdmFacade = new ProductAdmFacade({
      addUseCase: addProductUseCase,
      checkStockUseCase: checkStockUseCase,
    });

    return productAdmFacade;
  }
}
