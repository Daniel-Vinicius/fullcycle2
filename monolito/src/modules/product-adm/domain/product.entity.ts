import { BaseEntity } from "../../@shared/domain/entity/base.entity";
import { AggregateRoot } from "../../@shared/domain/entity/aggregate-root.interface";
import { Id } from "../../@shared/domain/value-object/id.value-object";

type ProductProps = {
  id?: Id;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Product extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _description: string;
  private _purchasePrice: number;
  private _stock: number;

  constructor(props: ProductProps) {
    super(props.id);
    this._name = props.name;
    this._description = props.description;
    this._purchasePrice = props.purchasePrice;
    this._stock = props.stock;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get purchasePrice() {
    return this._purchasePrice;
  }

  get stock() {
    return this._stock;
  }

  set name(name: string) {
    this._name = name;
  }

  set description(description: string) {
    this._description = description;
  }

  set purchasePrice(purchasePrice: number) {
    this._purchasePrice = purchasePrice;
  }

  set stock(value: number) {
    this._stock = value;
  }
}
