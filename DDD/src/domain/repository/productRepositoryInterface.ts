import { RepositoryInterface } from "./repositoryInterface";
import { Product } from "@domain/entity/product";

export type ProductRepositoryInterface = RepositoryInterface<Product>
// export interface ProductRepositoryInterface extends RepositoryInterface<Product> {}
