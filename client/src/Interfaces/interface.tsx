import { InputField } from "@/components/FormComponent"


export interface StoreInterface<T> {
    data: T[],
    columns: InputField[]
    sortDirection: "asc" | "desc",
    sortColumn: string | null,
    currentPage: number,
    rowsPerPage: number,
    filterData: T[]
    searchColumn?: T | {
        customItems: InputField[]
    }

}
