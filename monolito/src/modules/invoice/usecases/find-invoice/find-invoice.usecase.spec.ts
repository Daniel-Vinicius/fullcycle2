import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Address } from "../../domain/address.value-object";
import { Invoice } from "../../domain/invoice";
import { Product } from "../../domain/product";
import { FindInvoiceUseCase } from "./find-invoice.usecase";

const address = new Address({
  street: "Main Street",
  number: "123",
  complement: "Next to the bank",
  city: "New York",
  state: "New York",
  zipCode: "122343404",
});

const product1 = new Product({
  id: new Id("1"),
  name: "Product 1",
  price: 100,
});

const product2 = new Product({
  id: new Id("2"),
  name: "Product 2",
  price: 200,
});

const invoice = new Invoice({
  id: new Id("123"),
  name: "Invoice 1",
  document: "Document 1",
  items: [product1, product2],
  address: address,
});

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    add: jest.fn(),
  };
};

describe("FindInvoiceUseCase unit test", () => {
  it("should find an invoice", async () => {
    const repository = MockRepository();
    const findInvoiceUseCase = new FindInvoiceUseCase(repository);

    const result = await findInvoiceUseCase.execute({ id: "123" });

    expect(result.id).toEqual(invoice.id.id);
    expect(result.name).toEqual(invoice.name);
    expect(result.document).toEqual(invoice.document);
    expect(result.address).toEqual(invoice.address);
    expect(result.items).toEqual([
      { id: "1", name: product1.name, price: product1.price },
      { id: "2", name: product2.name, price: product2.price },
    ]);

    expect(result.total).toEqual(300);
    expect(result.createdAt).toBeTruthy();
  });
});
