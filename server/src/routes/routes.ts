import { Router } from "express";
import {
  addDriver,
  deleteDriver,
  editDriver,
  getAllDrivers,
  getDriverById,
} from "../services/driverService";
import {
  addVehicle,
  deleteVehicle,
  editVehicle,
  getAllVehicles,
  getVehicleById,
} from "../services/vehicleService";
import {
  addCustomer,
  editCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomerById,
} from "../services/customerService";
const router = Router();
//driver
router.post("/customer", addCustomer);
router.post("/editcustomer", editCustomer);
router.delete("/customer/:id",  deleteCustomer);
router.get("/getAllcustomer", getAllCustomers);
router.get("/customer/:id", getCustomerById);
//customer
router.post("/driver", addDriver);
router.put("/driver", editDriver);
router.delete("/driver/:id", deleteDriver);
router.get("/driver", getAllDrivers);
router.get("/driver/:id", getDriverById);

// vehicle
router.post("/vehicle", addVehicle);
router.put("/vehicle", editVehicle);
router.delete("/vehicle/:id", deleteVehicle);
router.get("/vehicle", getAllVehicles);
router.get("/vehicle/:id", getVehicleById);

export default router;
