import {configureStore} from "@reduxjs/toolkit";
import WareHouseSlice from "../services/warehouse/warehouseSlice";
import tableReducer from "../services/TableSlice";


 export const store = configureStore({
        reducer: {
            warehouse: WareHouseSlice,
            table: tableReducer,
        
        }
    })
    
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;