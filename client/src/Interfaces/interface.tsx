import { InputField } from "@/components/FormComponent"


export interface StoreInterface<T> {
    data: T[],
    columns: InputField[]
    sortDirection: "asc" | "desc",
    sortColumn: string | null,
    currentPage: number,
    rowsPerPage: number,
    filterData: T[]
    searchColumn: {
        name: string,
        code: string,
        city: string,
        space_available: string,
        type: string,
        cluster: string,
        is_registered: string,
        is_live: string,
        customItems: InputField[]
    }
}
