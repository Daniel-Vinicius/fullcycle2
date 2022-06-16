import { toXML, XmlOptions } from "jstoxml";
import { OutputListCustomerDto } from "@useCases/customer/list/list.customer.dto";

export default class CustomerPresenter {
	static toXML(data: OutputListCustomerDto): string {
		const { customers } = data;

		const xmlOptions: XmlOptions = {
			header: true,
			indent: " ",
		};

		const xml = toXML({
			customers: {
				customer: customers.map(({ id, name, address }) => ({
					id,
					name,
					address,
				}))
			}
		}, xmlOptions);

		return xml;
	}
}
