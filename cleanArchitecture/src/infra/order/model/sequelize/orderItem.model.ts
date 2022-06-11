import {
	Table,
	Model,
	PrimaryKey,
	Column,
	ForeignKey,
	BelongsTo
} from "sequelize-typescript";
import { OrderModel } from "./order.model";

import { ProductModel } from "@infra/product/model/sequelize/product.model";

@Table({
	tableName: "order_items",
	timestamps: false,
})
export class OrderItemModel extends Model {
  @PrimaryKey
  @Column
	declare id: string;

  @ForeignKey(() => ProductModel)
  @Column({ allowNull: false })
  declare productId: string;

  @BelongsTo(() => ProductModel)
  declare product: ProductModel;

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  declare orderId: string;

  @BelongsTo(() => OrderModel)
  declare order: OrderModel;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare unitPrice: number;

  @Column({ allowNull: false })
  declare quantity: number;
}
