import { ValidatorInterface } from "@domain/@shared/validator/validator.interface";
import { Product } from "../entity/product";
import { ProductYupValidator } from "../validator/product.yup.validator";

export class ProductValidatorFactory {
	static create(): ValidatorInterface<Product> {
		return new ProductYupValidator();
	}
}
