import { CustomerRepositoryInterface } from "@domain/customer/repository/customerRepositoryInterface";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";

export class FindCustomerUseCase {
	private customerRepository: CustomerRepositoryInterface;

	constructor(customerRepository: CustomerRepositoryInterface) {
		this.customerRepository = customerRepository;
	}

	async execute({ id }: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
		const customer = await this.customerRepository.find(id);

		const outputDto: OutputFindCustomerDto = {
			id: customer.id,
			name: customer.name,
			address: customer.getAddress()?.toJSON(),
		};

		return outputDto;
	}
}
