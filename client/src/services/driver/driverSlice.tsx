import {
    createSlice,
    nanoid
} from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';
import { DriverMasterData } from '@/view/Master pages/Driver/Driver.Interface';
import { StoreInterface } from '@/Interfaces/interface';

const createData = () => {
    const data: DriverMasterData[] = [];
    for (let i = 0; i < 50; i++) {
        data.push({
            id: i + 1,
            name: `${faker.person.firstName()} ${faker.person.lastName()}`,
            address: faker.location.streetAddress(),
            contact: faker.phone.number()
        });
    }
    return data;
}

const initialState: StoreInterface<DriverMasterData> = {
    data: createData(),
    columns: [],
    filterData: [],
    sortDirection: "asc",
    sortColumn: null,
    currentPage: 1,
    rowsPerPage: 10,
    searchColumn: {
        name: '',
        address: '',
        contact: '',
        customItems: []
    }

}




const driverSlice = createSlice({
    name: 'driver',
    initialState,
    reducers: {
        addDriver: (state, action) => {
            const addDriver = {
                id: parseInt(nanoid()),
                name: action.payload.name,
                address: action.payload.address,
                contact: action.payload.contact,
                customItems: action.payload.customItems
            }
            state.data.push(addDriver)
        },
        deleteDriver: (state, action) => {
            state.data = state.data.filter((item) => item.id !== action.payload)
        },
        updateDriver: (state, action) => {
            const index = state.data.findIndex((item) => item.id === action.payload.id)
            state.data[index] = action.payload
        },
        UpdateFilteredData: (state, action) => {
            state.filterData = action.payload
        },
        updateSort: (state, action) => {
            state.sortColumn = action.payload.sortColumn
            state.sortDirection = action.payload.sortDirection
        },
        updatePagination: (state, action) => {
            state.currentPage = action.payload.currentPage
            state.rowsPerPage = action.payload.rowsPerPage
        },
        updateSearchColumn: (state, action) => {
            state.searchColumn = action.payload
        },
        resetData: (state) => {
            state.data = createData()
        },
        resetPagination: (state) => {
            state.currentPage = 1
            state.rowsPerPage = 10
        },
        resetFilter: (state) => {
            state.sortColumn = null
            state.sortDirection = 'asc'
        }

    }
})

export const {
    addDriver,
    deleteDriver,
    updateDriver,
    updateSort,
    updatePagination,
    resetData,
    resetPagination,
    resetFilter,
    UpdateFilteredData,
    updateSearchColumn
} = driverSlice.actions

export default driverSlice.reducer