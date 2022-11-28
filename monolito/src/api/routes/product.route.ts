import express, { Request, Response } from "express";

import { ProductAdmFacadeFactory } from "../../modules/product-adm/factory/facade.factory";
import { AddProductFacadeInputDto } from "../../modules/product-adm/facade/product-adm.facade.interface";

export const productsRoute = express.Router();

productsRoute.post("/", async (request: Request, response: Response) => {
  const facade = ProductAdmFacadeFactory.create();

  try {
    const { id, name, description, stock, purchasePrice } = request.body;

    const productDto: AddProductFacadeInputDto = {
      id,
      name,
      description,
      stock,
      purchasePrice,
    };

    await facade.addProduct(productDto);

    response.status(201).send();
  } catch (error) {
    response.status(400).send(error);
  }
});
