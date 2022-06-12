import { validate } from "uuid";

import { CustomerRepositoryInterface } from "@domain/customer/repository/customerRepositoryInterface";
import { Address } from "@domain/customer/valueObject/address";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.customer.dto";

export class UpdateCustomerUseCase {
	private customerRepository: CustomerRepositoryInterface;

	constructor(customerRepository: CustomerRepositoryInterface) {
		this.customerRepository = customerRepository;
	}

	async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
		const { id, name, address } = input;

		const IdIsInvalid = !validate(id);

		if (IdIsInvalid) {
			throw new Error("Invalid customer id");
		}

		const customer = await this.customerRepository.find(id);

		if (!customer) {
			throw new Error("Customer not found");
		}

		if (address) {
			const { street, number, zip, city } = address;
			const newAddress = new Address(street, number, zip, city);
			customer.setAddress(newAddress);
		}

		if (name) {
			customer.changeName(name);
		}

		await this.customerRepository.update(customer);

		const outputDto: OutputUpdateCustomerDto = {
			id: customer.id,
			name: customer.name,
			address: customer.getAddress()?.toJSON()
		};

		return outputDto;
	}
}
