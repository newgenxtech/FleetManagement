import { AppDataSource } from "../data-source";
import { Driver } from "../entity/Driver";
import { ApiResponse } from "../Utilis/ApiResponse/apiresponse";
import { apiHandlerWrapper } from "../Utilis/Wrappers/apiWrapper";
import { Request, Response } from "express";

export const addDriver = apiHandlerWrapper(
  async (req: Request, res: Response) => {
    const { name, contact, address } = req.body;

    const driverRepo = AppDataSource.getRepository(Driver);

    const existingDriver = await driverRepo.findOne({
      where: { contact, deleted: false },
    });

    if (existingDriver && existingDriver.deleted) {
      return ApiResponse.error(
        res,
        400,
        "Driver already exists & deleted ",
        []
      );
    }

    if (existingDriver) {
      return ApiResponse.error(res, 400, "Driver already exists", []);
    }

    const driver = new Driver();

    driver.name = name;
    driver.contact = contact;
    driver.address = address;
    driver.deleted = false;
    driver.created_at = new Date();
    driver.updated_at = new Date();

    await AppDataSource.getRepository(Driver).save(driver);

    return ApiResponse.successResponseWithData(
      res,
      "Driver added successfully",
      driver
    );
  }
);

// edit driver
export const editDriver = apiHandlerWrapper(
  async (req: Request, res: Response) => {
    const { id, name, contact, address, deleted } = req.body;

    const driverRepo = AppDataSource.getRepository(Driver);

    const driver = await driverRepo.findOne({
      where: { id },
    });

    if (!driver) {
      return ApiResponse.error(res, 400, "Driver not found", []);
    }

    driver.name = name;
    driver.contact = contact;
    driver.address = address;
    driver.deleted = deleted;
    driver.updated_at = new Date();

    await AppDataSource.getRepository(Driver).save(driver);

    return ApiResponse.successResponseWithData(
      res,
      "Driver updated successfully",
      driver
    );
  }
);

// delete driver
export const deleteDriver = apiHandlerWrapper(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const driverRepo = AppDataSource.getRepository(Driver);

    const driver = await driverRepo.findOne({
      where: { id },
    });

    if (!driver) {
      return ApiResponse.error(res, 400, "Driver not found", []);
    }

    driver.deleted = true;

    driver.updated_at = new Date();

    await AppDataSource.getRepository(Driver).save(driver);

    return ApiResponse.success(res, "Driver deleted successfully");
  }
);

// get all drivers
export const getAllDrivers = apiHandlerWrapper(
  async (req: Request, res: Response) => {
    const driverRepo = AppDataSource.getRepository(Driver);

    const drivers = await driverRepo.find({
      where: { deleted: false },
    });

    console.log("drivers", drivers);

    return ApiResponse.successResponseWithData(res, "Drivers", drivers);
  }
);

// get driver by id
export const getDriverById = apiHandlerWrapper(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const driverRepo = AppDataSource.getRepository(Driver);

    const driver = await driverRepo.findOne({
      where: { id },
    });

    if (!driver) {
      return ApiResponse.error(res, 400, "Driver not found", []);
    }

    return ApiResponse.successResponseWithData(res, "Driver", driver);
  }
);
