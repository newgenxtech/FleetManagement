import {
    createSlice,
    nanoid
} from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';
import { VehicleMasterData } from '@/view/Master pages/Vehicle/Vehicle.Interface';
import { StoreInterface } from '@/Interfaces/interface';

const createData = () => {
    const data: VehicleMasterData[] = [];
    for (let i = 0; i < 50; i++) {
        data.push({
            id: i + 1,
            // vehicle_number: string;
            // vehicle_type: string;
            // chassis_number: string;
            // chassis: string;
            // no_of_tyres: number;
            // fast_tag_id: string;
            // insurance_number: string;
            // insurance_exp_date: Date;
            // roadta_exp_date: Date;
            // pollution_exp_date: Date;
            vehicle_number: faker.vehicle.vehicle(),
            vehicle_type: faker.vehicle.type(),
            chassis_number: faker.vehicle.vin(),
            chassis: faker.vehicle.vin(),
            no_of_tyres: faker.number.int({
                min: 4,
                max: 12
            }),
            fast_tag_id: faker.vehicle.vin(),
            insurance_number: faker.vehicle.vin(),
            insurance_exp_date: faker.date.future().toISOString(),
            roadta_exp_date: faker.date.future().toISOString(),
            pollution_exp_date: faker.date.future().toISOString()
        });
    }
    return data;
}

const initialState: StoreInterface<VehicleMasterData> = {
    data: createData(),
    columns: [],
    filterData: [],
    sortDirection: "asc",
    sortColumn: null,
    currentPage: 1,
    rowsPerPage: 10,
    searchColumn: {
        vehicle_number: '',
        vehicle_type: '',
        chassis_number: '',
        chassis: '',
        no_of_tyres: 0,
        fast_tag_id: '',
        insurance_number: '',
        insurance_exp_date: new Date().toISOString(),
        roadta_exp_date: new Date().toISOString(),
        pollution_exp_date: new Date().toISOString(),
        customItems: []
    }

}




const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState,
    reducers: {
        addVehicle: (state, action) => {
            const addVehicle = {
                id: parseInt(nanoid()),
                vehicle_number: action.payload.vehicle_number,
                vehicle_type: action.payload.vehicle_type,
                chassis_number: action.payload.chassis_number,
                chassis: action.payload.chassis,
                no_of_tyres: action.payload.no_of_tyres,
                fast_tag_id: action.payload.fast_tag_id,
                insurance_number: action.payload.insurance_number,
                insurance_exp_date: action.payload.insurance_exp_date,
                roadta_exp_date: action.payload.roadta_exp_date,
                pollution_exp_date: action.payload.pollution_exp_date,
                customItems: action.payload.customItems
            }
            state.data.push(addVehicle)
        },
        deleteVehicle: (state, action) => {
            state.data = state.data.filter((item) => item.id !== action.payload)
        },
        updateVehicle: (state, action) => {
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
    addVehicle,
    deleteVehicle,
    updateVehicle,
    updateSort,
    updatePagination,
    resetData,
    resetPagination,
    resetFilter,
    UpdateFilteredData,
    updateSearchColumn
} = vehicleSlice.actions

export default vehicleSlice.reducer