import express, { Request, Response } from "express";

import { OrderRepository } from "../../modules/checkout/repository/order.repository";
import { PlaceOrderUseCase } from "../../modules/checkout/usecases/place-order/place-order.usecase";
import {
  PlaceOrderInputDto,
  PlaceOrderOutputDto,
} from "../../modules/checkout/usecases/place-order/place-order.dto";

import { ClientAdmFacadeFactory } from "../../modules/client-adm/factory/client-adm.facade.factory";
import { InvoiceFacadeFactory } from "../../modules/invoice/factory/facade.factory";
import { PaymentFacadeFactory } from "../../modules/payment/factory/payment.facade.factory";
import { ProductAdmFacadeFactory } from "../../modules/product-adm/factory/facade.factory";
import { StoreCatalogFacadeFactory } from "../../modules/store-catalog/factory/facade.factory";

export const checkoutRoute = express.Router();
const repository = new OrderRepository();

checkoutRoute.post("/", async (request: Request, response: Response) => {
  const clientFacade = ClientAdmFacadeFactory.create();
  const productFacade = ProductAdmFacadeFactory.create();
  const catalogFacade = StoreCatalogFacadeFactory.create();
  const paymentFacade = PaymentFacadeFactory.create();
  const invoiceFacade = InvoiceFacadeFactory.create();

  const usecase = new PlaceOrderUseCase(
    clientFacade,
    productFacade,
    catalogFacade,
    paymentFacade,
    invoiceFacade,
    repository
  );

  try {
    const { clientId, products } = request.body;

    const orderDto: PlaceOrderInputDto = {
      clientId,
      products,
    };

    const output: PlaceOrderOutputDto = await usecase.execute(orderDto);

    response.status(200).send(output);
  } catch (error) {
    console.error(error);
    response.status(400).send(error);
  }
});
