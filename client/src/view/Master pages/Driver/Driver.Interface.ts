import { TableCommonEntitiesInterface } from "@/Interfaces/interface";

export interface DriverMasterData extends TableCommonEntitiesInterface {
    name: string,
    contact: string,
    address: string
}