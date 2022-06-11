import { RepositoryInterface } from "@domain/@shared/repository/repositoryInterface";
import { Product } from "@domain/product/entity/product";

export type ProductRepositoryInterface = RepositoryInterface<Product>
// export interface ProductRepositoryInterface extends RepositoryInterface<Product> {}
