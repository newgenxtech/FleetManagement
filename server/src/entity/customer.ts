import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Common } from "./common";

@Entity()
export class customer extends Common {
  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  contact: string;

  @Column({ type: "varchar", length: 255 })
  address: string;

  @Column({ type: "varchar", length: 255 })
  gst: string;

  @Column({ type: "varchar", length: 255 })
  company: string;
}

