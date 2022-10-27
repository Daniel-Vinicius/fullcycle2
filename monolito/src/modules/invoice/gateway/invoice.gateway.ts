import { Invoice } from "../domain/invoice";

export interface InvoiceGateway {
  find(id: string): Promise<Invoice>;
  add(invoice: Invoice): Promise<Invoice>;
}
