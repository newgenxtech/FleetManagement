import { TableCommonEntitiesInterface } from "@/Interfaces/interface";

export interface VehicleMasterData extends TableCommonEntitiesInterface {
    vehicle_number: string;
    vehicle_type: string;
    chassis_number: string;
    chassis: string;
    no_of_tyres: number;
    fast_tag_id: string;
    insurance_number: string;
    insurance_exp_date: Date | string;
    roadta_exp_date: Date | string;
    pollution_exp_date: Date | string;
}