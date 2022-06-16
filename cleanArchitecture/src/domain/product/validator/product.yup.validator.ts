import * as yup from "yup";
import { ValidatorInterface } from "@domain/@shared/validator/validator.interface";
import { Product } from "../entity/product";

export class ProductYupValidator implements ValidatorInterface<Product> {
	validate(entity: Product) {
		const { id, name, price } = entity;

		try {
			yup.object()
				.shape({
					id: yup.string().required("Id is required"),
					name: yup.string().required("Name is required"),
					price: yup.number().required().positive("Price must be greater than zero"),
				})
				.validateSync({ id, name, price }, { abortEarly: false });
		} catch (errors) {
			const yupValidationError = errors as yup.ValidationError;

			yupValidationError.errors.forEach(error => {
				entity.notification.addError({ context: "product", message: error });
			});
		}
	}
}
