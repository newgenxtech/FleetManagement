import { configureStore } from "@reduxjs/toolkit";
import DriverSlice from "@/services/driver/driverSlice";
import VehicleSlice from "@/services/Vehicle/vehicleSlice";
// import tableReducer from "../services/TableSlice";


export const store = configureStore({
    reducer: {
        driver: DriverSlice,
        vehicle: VehicleSlice,
        // table: tableReducer,
    }
})

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;