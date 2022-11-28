import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Address } from "../domain/address.value-object";
import { Invoice } from "../domain/invoice";
import { InvoiceGateway } from "../gateway/invoice.gateway";
import { InvoiceModel } from "./invoice.model";

function invoiceModelToInvoice(invoiceModel: InvoiceModel): Invoice {
  return new Invoice({
    id: new Id(invoiceModel.id),
    name: invoiceModel.name,
    document: invoiceModel.document,
    createdAt: invoiceModel.createdAt,
    updatedAt: invoiceModel.updatedAt,
    address: new Address({
      street: invoiceModel.addressStreet,
      number: invoiceModel.addressNumber,
      complement: invoiceModel.addressComplement,
      city: invoiceModel.addressCity,
      state: invoiceModel.addressState,
      zipCode: invoiceModel.addressZipCode,
    }),
    items: invoiceModel.items,
  });
}

export class InvoiceRepository implements InvoiceGateway {
  async find(id: string): Promise<Invoice> {
    try {
      const invoiceOnDB = await InvoiceModel.findByPk(id);
      const invoice = invoiceModelToInvoice(invoiceOnDB);
      return invoice;
    } catch (e) {
      throw new Error("Invoice does not exist.");
    }
  }

  async add(invoice: Invoice): Promise<Invoice> {
    const { id, name, document, createdAt, updatedAt, items, address } =
      invoice;

    const { street, number, complement, city, state, zipCode } = address;

    const invoiceCreated = await InvoiceModel.create({
      id: id.id,
      name,
      document,
      createdAt,
      updatedAt,
      items,
      addressStreet: street,
      addressNumber: number,
      addressComplement: complement,
      addressCity: city,
      addressState: state,
      addressZipCode: zipCode,
    });

    const result = invoiceModelToInvoice(invoiceCreated);

    return result;
  }
}
