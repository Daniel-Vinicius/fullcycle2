export interface InputListProductsDto {}

type Product = {
	id: string;
  name: string;
  price: number;
}

export interface OutputListProductsDto {
  products: Product[]
}
