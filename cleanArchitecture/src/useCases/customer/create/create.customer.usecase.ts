import { CustomerRepositoryInterface } from "@domain/customer/repository/customerRepositoryInterface";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";
import { CustomerFactory } from "@domain/customer/factory/customer.factory";

export class CreateCustomerUseCase {
	private customerRepository: CustomerRepositoryInterface;

	constructor(customerRepository: CustomerRepositoryInterface) {
		this.customerRepository = customerRepository;
	}

	async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
		const { name, address } = input;

		const customer = address ?
			CustomerFactory.createWithAddress({ name, address }) : CustomerFactory.create(name);

		await this.customerRepository.create(customer);

		const outputDto: OutputCreateCustomerDto = {
			id: customer.id,
			name: customer.name,
			address: customer.getAddress()?.toJSON(),
		};

		return outputDto;
	}

}
