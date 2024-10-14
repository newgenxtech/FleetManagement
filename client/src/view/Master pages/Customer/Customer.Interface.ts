import { TableCommonEntitiesInterface } from "@/Interfaces/interface";

export interface CustomerMasterData extends TableCommonEntitiesInterface {
    name: string;
    address: string;
    contact: string;
    gst: string;
    company: string;
}


