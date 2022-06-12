import { CustomerRepositoryInterface } from "@domain/customer/repository/customerRepositoryInterface";
import { InputListCustomerDto, OutputListCustomerDto } from "./list.customer.dto";

export class ListCustomerUseCase {
	private customerRepository: CustomerRepositoryInterface;

	constructor(customerRepository: CustomerRepositoryInterface) {
		this.customerRepository = customerRepository;
	}

	async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
		const customers = await this.customerRepository.findAll();

		const customersDto = customers.map(customer => {
			return {
				id: customer.id,
				name: customer.name,
				address: customer.getAddress()?.toJSON(),
			};
		});

		const outputDto: OutputListCustomerDto = {
			customers: customersDto
		};

		return outputDto;
	}
}