import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { UseCaseInterface } from "../../../@shared/usecase/usecase.interface";
import { ClientAdmFacadeInterface } from "../../../client-adm/facade/client-adm.facade.interface";
import { InvoiceFacadeInterface } from "../../../invoice/facade/invoice.facade.interface";
import { PaymentFacadeInterface } from "../../../payment/facade/facade.interface";
import { ProductAdmFacadeInterface } from "../../../product-adm/facade/product-adm.facade.interface";
import { StoreCatalogFacadeInterface } from "../../../store-catalog/facade/store-catalog.facade.interface";
import { Client } from "../../domain/client.entity";
import { Order } from "../../domain/order.entity";
import { Product } from "../../domain/product.entity";
import { CheckoutGateway } from "../../gateway/checkout.gateway";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export class PlaceOrderUseCase implements UseCaseInterface {
  private _clientFacade: ClientAdmFacadeInterface;
  private _productFacade: ProductAdmFacadeInterface;
  private _catalogFacade: StoreCatalogFacadeInterface;
  private _paymentFacade: PaymentFacadeInterface;
  private _invoiceFacade: InvoiceFacadeInterface;
  private _orderRepository: CheckoutGateway;

  constructor(
    clientFacade: ClientAdmFacadeInterface,
    productFacade: ProductAdmFacadeInterface,
    catalogFacade: StoreCatalogFacadeInterface,
    paymentFacade: PaymentFacadeInterface,
    invoiceFacade: InvoiceFacadeInterface,
    orderRepository: CheckoutGateway
  ) {
    this._clientFacade = clientFacade;
    this._productFacade = productFacade;
    this._catalogFacade = catalogFacade;
    this._paymentFacade = paymentFacade;
    this._invoiceFacade = invoiceFacade;
    this._orderRepository = orderRepository;
  }

  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    const client = await this._clientFacade.find({ id: input.clientId });

    if (!client) {
      throw new Error("Client not found");
    }

    await this.validateProducts(input);

    const products = await Promise.all(
      input.products.map((p) => this.getProduct(p.productId))
    );

    const orderClient = new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      address: client.address,
    });

    const order = new Order({
      client: orderClient,
      products: products,
    });

    const payment = await this._paymentFacade.process({
      orderId: order.id.id,
      amount: order.total,
    });

    const invoice =
      payment.status === "approved"
        ? await this._invoiceFacade.generateInvoice({
            city: client.address,
            zipCode: client.address,
            street: client.address,
            state: client.address,
            complement: client.address,
            number: client.address,
            name: client.name,
            document: client.document,
            items: products.map((p) => ({
              id: p.id.id,
              name: p.name,
              price: p.salesPrice,
            })),
          })
        : null;

    payment.status === "approved" && order.approved();
    const invoiceId = payment.status === "approved" ? invoice.id : null;

    order.setInvoiceId(invoiceId);
    this._orderRepository.addOrder(order);

    return {
      id: order.id.id,
      invoiceId,
      status: order.status,
      total: order.total,
      products: products.map((p) => ({ productId: p.id.id })),
    };
  }

  private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
    if (input.products.length === 0) {
      throw new Error("No products selected");
    }

    for (const product of input.products) {
      const productStock = await this._productFacade.checkStock({
        productId: product.productId,
      });

      if (productStock.stock <= 0) {
        throw new Error(
          `Product ${product.productId} is not available in stock`
        );
      }
    }
  }

  private async getProduct(productId: string): Promise<Product> {
    const product = await this._catalogFacade.find({ id: productId });
    if (!product) {
      throw new Error("Product not found");
    }

    const { id, name, description, salesPrice } = product;
    return new Product({
      id: new Id(id),
      name,
      description,
      salesPrice,
    });
  }
}
