import { BaseEntity } from "../../@shared/domain/entity/base.entity";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Client } from "./client.entity";
import { Product } from "./product.entity";

type OrderProps = {
  id?: Id;
  client: Client;
  products: Product[];
  status?: string;
};

export class Order extends BaseEntity {
  private _client: Client;
  private _products: Product[];
  private _status: string;

  constructor(props: OrderProps) {
    super(props.id);
    this._client = props.client;
    this._products = props.products;
    this._status = props.status || "pending";
  }

  approved() {
    this._status = "approved";
  }

  get client() {
    return this._client;
  }

  get products() {
    return this._products;
  }

  get status() {
    return this._status;
  }

  get total() {
    return this._products.reduce((total, product) => {
      return total + product.salesPrice;
    }, 0);
  }
}
