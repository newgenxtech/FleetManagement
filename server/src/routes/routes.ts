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

const router = Router();

router.post("/driver", addDriver);
router.put("/driver", editDriver);
router.delete("/driver/:id", deleteDriver);
router.get("/driver", getAllDrivers);
router.get("/driver/:id", getDriverById);

router.post("/vehicle", addVehicle);
router.put("/vehicle", editVehicle);
router.delete("/vehicle/:id", deleteVehicle);
router.get("/vehicle", getAllVehicles);
router.get("/vehicle/:id", getVehicleById);

export default router;
