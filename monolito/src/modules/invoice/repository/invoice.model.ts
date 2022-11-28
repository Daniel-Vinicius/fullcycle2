import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

interface ProductData {
  id: string;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

@Table({
  tableName: "invoices",
  timestamps: false,
})
export class InvoiceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  document: string;

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;

  @Column({ allowNull: false, type: DataType.JSON })
  items: ProductData[];

  @Column({ allowNull: false })
  addressStreet: string;

  @Column({ allowNull: false })
  addressNumber: string;

  @Column({ allowNull: false })
  addressComplement: string;

  @Column({ allowNull: false })
  addressCity: string;

  @Column({ allowNull: false })
  addressState: string;

  @Column({ allowNull: false })
  addressZipCode: string;
}
