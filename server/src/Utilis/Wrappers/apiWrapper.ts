import { ApiResponse } from "../ApiResponse/apiresponse";
import { ApiResponseCode } from "../ApiResponse/reponseCode";

// Generic API handler wrapper
export const apiHandlerWrapper =
  (fn: Function) => async (req: Request, res: Response) => {
    try {
      // Execute the actual API function passed as fn
      await fn(req, res);
    } catch (error: any) {
      // Use ApiResponse to return error in a consistent format\
      let statusCode = error.statusCode || 500;
      console.log("error", error);
      return ApiResponse.error(
        res,
        500,
        ApiResponseCode.getMessage(500),
        error
      );
    }
  };
