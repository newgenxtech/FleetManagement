import { AppDataSource } from "../data-source";
import { customer } from "../entity/customer";
import { ApiResponse } from "../Utilis/ApiResponse/apiresponse";
import { apiHandlerWrapper } from "../Utilis/Wrappers/apiWrapper";
import { Request, Response } from "express";

export const addCustomer = apiHandlerWrapper(
    async (req: Request, res: Response) => {
      const { name, contact, address, gst, company } = req.body;
  
      const customerRepo = AppDataSource.getRepository(customer);
  
      const existingCustomer = await customerRepo.findOne({
        where: { contact, deleted: false },
      });
  
      if (existingCustomer && existingCustomer.deleted) {
        return ApiResponse.error(
          res,
          400,
          "Customer already exists & deleted",
          []
        );
      }
  
      if (existingCustomer) {
        return ApiResponse.error(res, 400, "Customer already exists", []);
      }
  
      const Customer = new customer();
      Customer.name = name;
      Customer.contact = contact;
      Customer.address = address;
      Customer.gst = gst;
      Customer.company = company;
      Customer.deleted = false;
      Customer.created_at = new Date();
      Customer.updated_at = new Date();
  
      await customerRepo.save(Customer);
  
      return ApiResponse.successResponseWithData(
        res,
        "Customer added successfully",
        customer
      );
    }
  );
  
  
  // edit driver
  export const editCustomer = apiHandlerWrapper(
    async (req: Request, res: Response) => {
      const { id, name, contact, address, gst, company } = req.body;
  
      const CustomerRepo = AppDataSource.getRepository(customer);
  
      const Customer = await CustomerRepo.findOne({
        where: { id },
      });
  
      if (!Customer) {
        return ApiResponse.error(res, 400, "Customer not found", []);
      }
  
      Customer.name = name;
      Customer.contact = contact;
      Customer.address = address;
      Customer.gst = gst;
      Customer.company = company;
      Customer.updated_at = new Date();
  
      await AppDataSource.getRepository(customer).save(Customer);
  
      return ApiResponse.successResponseWithData(
        res,
        "Driver updated successfully",
     Customer
      );
    }
  );
  
  export const deleteCustomer = apiHandlerWrapper(
    async (req: Request, res: Response) => {
      const id = req.params.id;
  
      const customerRepo = AppDataSource.getRepository(customer);
  
      const Customer = await customerRepo.findOne({
        where: { id },
      });
  
      if (!Customer) {
        return ApiResponse.error(res, 400, "Customer not found", []);
      }
  
      Customer.deleted = true;
      Customer.updated_at = new Date();
  
      await customerRepo.save(Customer);
  
      return ApiResponse.success(res, "Customer deleted successfully");
    }
  );
  
  
  export const getAllCustomers = apiHandlerWrapper(
    async (req: Request, res: Response) => {
      const customerRepo = AppDataSource.getRepository(customer);
  
      const customers = await customerRepo.find({
        where: { deleted: false },
      });
  
      console.log("customers", customers);
  
      return ApiResponse.successResponseWithData(res, "Customers", customers);
    }
  );
  
  export const getCustomerById = apiHandlerWrapper(
    async (req: Request, res: Response) => {
      const id = req.params.id;
  
      const customerRepo = AppDataSource.getRepository(customer);
  
      const Customer = await customerRepo.findOne({
        where: { id },
      });
  
      if (!Customer) {
        return ApiResponse.error(res, 400, "Customer not found", []);
      }
  
      return ApiResponse.successResponseWithData(res, "customer", Customer);
    }
  );
  