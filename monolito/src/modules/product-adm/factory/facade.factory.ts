import { ProductAdmFacade } from "../facade/product-adm.facade";

import { ProductRepository } from "../repository/product.repository";
import { AddProductUsecase } from "../usecases/add-product/add-product.usecase";

export class ProductAdmFacadeFactory {
  static create(): ProductAdmFacade {
    const productRepository = new ProductRepository();
    const addProductUseCase = new AddProductUsecase(productRepository);

    const productAdmFacade = new ProductAdmFacade({
      addUseCase: addProductUseCase,
      checkStockUseCase: null,
    });

    return productAdmFacade;
  }
}
