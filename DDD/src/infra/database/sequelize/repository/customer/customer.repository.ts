import { Customer } from "@domain/entity/customer";
import { Address } from "@domain/entity/customer/address";
import { CustomerRepositoryInterface } from "@domain/repository/customerRepositoryInterface";
import { CustomerModel } from "@infra/database/sequelize/model/customer.model";

function customerModelHasAddress(customerModel: CustomerModel): boolean {
	if (customerModel.street && customerModel.number && customerModel.zipcode && customerModel.city) {
		return true;
	}

	return false;
}

function customerModelToCustomer(customerModel: CustomerModel): Customer {
	const customer = new Customer(customerModel.id, customerModel.name);
	customer.addRewardPoints(customerModel.rewardPoints);

	if (customerModelHasAddress(customerModel)) {
		const address = new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city);
		customer.setAddress(address);
	}

	if (customerModel.active) {
		customer.activate();
	}

	return customer;
}

export class CustomerRepository implements CustomerRepositoryInterface {
	async create(entity: Customer): Promise<void> {
		const address = entity.getAddress();

		await CustomerModel.create({
			id: entity.id,
			name: entity.name,
			street: address?.street,
			number: address?.number,
			zipcode: address?.zip,
			city: address?.city,
			active: entity.active,
			rewardPoints: entity.rewardPoints,
		});

	}

	async update(entity: Customer): Promise<void> {
		const address = entity.getAddress();

		await CustomerModel.update(
			{
				name: entity.name,
				street: address?.street,
				number: address?.number,
				zipcode: address?.zip,
				city: address?.city,
				active: entity.active,
				rewardPoints: entity.rewardPoints,
			},
			{
				where: {
					id: entity.id,
				},
			}
		);
	}

	async find(id: string): Promise<Customer> {
		let customerModel;
		try {
			customerModel = await CustomerModel.findOne({
				where: {
					id,
				},
				rejectOnEmpty: true,
			});
		} catch (error) {
			throw new Error("Customer not found");
		}

		const customerParsed = customerModelToCustomer(customerModel);

		return customerParsed;
	}

	async findAll(): Promise<Customer[]> {
		const customerModels = await CustomerModel.findAll();
		const customers = customerModels.map((customerModel) => customerModelToCustomer(customerModel));

		return customers;
	}
}
