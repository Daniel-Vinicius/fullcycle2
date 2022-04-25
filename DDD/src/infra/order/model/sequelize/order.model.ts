import {
	Table,
	Model,
	PrimaryKey,
	Column,
	ForeignKey,
	BelongsTo,
	HasMany
} from "sequelize-typescript";

import { CustomerModel } from "@infra/customer/model/sequelize/customer.model";
import { OrderItemModel } from "./orderItem.model";

@Table({
	tableName: "orders",
	timestamps: false,
})
export class OrderModel extends Model {
  @PrimaryKey
  @Column
	declare id: string;

  @ForeignKey(() => CustomerModel)
  @Column({ allowNull: false })
  declare customerId: string;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[];

  @Column({ allowNull: false })
  declare total: number;
}
