import { ValidatorInterface } from "@domain/@shared/validator/validator.interface";
import { Customer } from "../entity/customer";
import * as yup from "yup";

export class CustomerYupValidator implements ValidatorInterface<Customer> {
	validate(entity: Customer): void {
		const { id, name, rewardPoints } = entity;

		try {
			yup.object()
				.shape({
					id: yup.string().required("Id is required"),
					name: yup.string().required("Name is required").matches(/^s*[\S]+(\s[\S]+)+\s*$/, "Name must contain at least two words"),
					rewardPoints: yup.number().required().min(0, "Reward points must be greater than or equal to zero"),
				})
				.validateSync({ id, name, rewardPoints }, { abortEarly: false });
		} catch (errors) {
			const yupValidationError = errors as yup.ValidationError;

			yupValidationError.errors.forEach(error => {
				entity.notification.addError({
					context: "customer", message: error
				});
			});
		}

	}

}
