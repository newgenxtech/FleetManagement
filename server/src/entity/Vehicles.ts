// Table vehicles {
//     id int [pk, increment]
//     vehicle_type varchar(255)
//     vehicle_number varchar(255)
//     chassis_number varchar(255)
//     chassis string
//     no_of_tyres int
//     fast_tag_id varchar
//     insurance_number varchar
//     insurance_exp_date datetime
//     roadta_exp_date datetime
//     pollution_exp_date datetime
//   }

import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from "typeorm";
import { Common } from "./common";

@Entity()
export class Vehicles extends Common {
  @Column({ type: "varchar", length: 255 })
  vehicle_type: string;

  @Column({ type: "varchar", length: 255 })
  vehicle_number: string;

  @Column({ type: "varchar", length: 255 })
  chassis_number: string;

  @Column({ type: "varchar", length: 255 })
  chassis: string;

  @Column({ type: "int" })
  no_of_tyres: number;

  @Column({ type: "varchar", length: 255 })
  fast_tag_id: string;

  @Column({ type: "varchar", length: 255 })
  insurance_number: string;

  @Column()
  insurance_exp_date: Date;

  @Column()
  roadta_exp_date: Date;

  @Column()
  pollution_exp_date: Date;
}
