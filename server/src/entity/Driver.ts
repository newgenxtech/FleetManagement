import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  contact: string;

  @Column({ type: "varchar", length: 255 })
  address: string;

  // deleted flag
  @Column({ type: "boolean", default: false })
  deleted: boolean;
}
