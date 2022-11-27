import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

import { Client } from "../domain/client.entity";
import { Product } from "../domain/product.entity";

@Table({
  tableName: "orders",
  timestamps: false,
})
export class OrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  status: string;

  @Column({ allowNull: true })
  invoiceId: string;

  @Column({ allowNull: false, type: DataType.JSON })
  client: Client;

  @Column({ allowNull: false, type: DataType.JSON })
  products: Product[];
}
