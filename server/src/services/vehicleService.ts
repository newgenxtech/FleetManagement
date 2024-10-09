import { AppDataSource } from "../data-source";
import { Vehicles } from "../entity/Vehicles";
import { ApiResponse } from "../Utilis/ApiResponse/apiresponse";
import { apiHandlerWrapper } from "../Utilis/Wrappers/apiWrapper";
import { Request, Response } from "express";
export const addVehicle = apiHandlerWrapper(
  async (req: Request, res: Response) => {
    const {
      vehicle_type,
      vehicle_number,
      chassis_number,
      chassis,
      no_of_tyres,
      fast_tag_id,
      insurance_number,
      insurance_exp_date,
      roadta_exp_date,
      pollution_exp_date,
    } = req.body;

    const vehiclesRepo = AppDataSource.getRepository(Vehicles);

    const existingVehicle = await vehiclesRepo.findOne({
      where: { vehicle_number },
    });

    if (existingVehicle) {
      return ApiResponse.error(res, 400, "Vehicle already exists", []);
    }

    const vehicle = new Vehicles();
    vehicle.vehicle_type = vehicle_type;
    vehicle.vehicle_number = vehicle_number;
    vehicle.chassis_number = chassis_number;
    vehicle.chassis = chassis;
    vehicle.no_of_tyres = no_of_tyres;
    vehicle.fast_tag_id = fast_tag_id;
    vehicle.insurance_number = insurance_number;
    vehicle.insurance_exp_date = insurance_exp_date;
    vehicle.roadta_exp_date = roadta_exp_date;
    vehicle.pollution_exp_date = pollution_exp_date;
    vehicle.deleted = false;
    vehicle.created_at = new Date();
    vehicle.updated_at = new Date();
    await AppDataSource.getRepository(Vehicles).save(vehicle);

    return ApiResponse.successResponseWithData(
      res,
      "Vehicle added successfully",
      vehicle
    );
  }
);

// edit vehicle
export const editVehicle = apiHandlerWrapper(
  async (req: Request, res: Response) => {
    const {
      id,
      vehicle_type,
      vehicle_number,
      chassis_number,
      chassis,
      no_of_tyres,
      fast_tag_id,
      insurance_number,
      insurance_exp_date,
      roadta_exp_date,
      pollution_exp_date,
      deleted,
    } = req.body;

    const vehiclesRepo = AppDataSource.getRepository(Vehicles);

    const vehicle = await vehiclesRepo.findOne({
      where: { id },
    });

    if (!vehicle) {
      return ApiResponse.error(res, 400, "Vehicle not found", []);
    }

    vehicle.vehicle_type = vehicle_type;
    vehicle.vehicle_number = vehicle_number;
    vehicle.chassis_number = chassis_number;
    vehicle.chassis = chassis;
    vehicle.no_of_tyres = no_of_tyres;
    vehicle.fast_tag_id = fast_tag_id;
    vehicle.insurance_number = insurance_number;
    vehicle.insurance_exp_date = insurance_exp_date;
    vehicle.roadta_exp_date = roadta_exp_date;
    vehicle.pollution_exp_date = pollution_exp_date;
    vehicle.deleted = deleted;
    vehicle.updated_at = new Date();

    await AppDataSource.getRepository(Vehicles).save(vehicle);

    return ApiResponse.successResponseWithData(
      res,
      "Vehicle updated successfully",
      vehicle
    );
  }
);

// get all vehicles
export const getAllVehicles = apiHandlerWrapper(
  async (req: Request, res: Response) => {
    const vehiclesRepo = AppDataSource.getRepository(Vehicles);

    const vehicles = await vehiclesRepo.find({
      where: { deleted: false },
    });

    return ApiResponse.successResponseWithData(res, "Vehicles", vehicles);
  }
);

// delete vehicle
export const deleteVehicle = apiHandlerWrapper(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const vehiclesRepo = AppDataSource.getRepository(Vehicles);

    const vehicle = await vehiclesRepo.findOne({
      where: { id },
    });

    if (!vehicle) {
      return ApiResponse.error(res, 400, "Vehicle not found", []);
    }

    vehicle.deleted = true;

    vehicle.updated_at = new Date();

    await AppDataSource.getRepository(Vehicles).save(vehicle);

    return ApiResponse.success(res, "Vehicle deleted successfully");
  }
);

// get vehicle by id
export const getVehicleById = apiHandlerWrapper(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const vehiclesRepo = AppDataSource.getRepository(Vehicles);

    const vehicle = await vehiclesRepo.findOne({
      where: { id },
    });

    if (!vehicle) {
      return ApiResponse.error(res, 400, "Vehicle not found", []);
    }

    return ApiResponse.successResponseWithData(res, "Vehicle", vehicle);
  }
);
