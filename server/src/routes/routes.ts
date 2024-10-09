import { Router } from "express";
import {
  addDriver,
  deleteDriver,
  editDriver,
  getAllDrivers,
  getDriverById,
} from "../services/driver";

const router = Router();

router.post("/driver", addDriver);
router.put("/driver", editDriver);
router.delete("/driver/:id", deleteDriver);
router.get("/driver", getAllDrivers);
router.get("/driver/:id", getDriverById);
export default router;
