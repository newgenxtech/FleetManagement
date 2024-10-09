import { ApiResponseCode } from "./reponseCode";

export class ApiResponse {
  /* The `statusCode`, `message`, `data`, and `error` are properties of the `ApiResponse` class. */
  statusCode: any;
  message: string;
  data: any;
  error?: any;
  /**
   * The constructor function initializes the properties of an object with the provided parameters.
   * @param statusCode - The statusCode parameter represents the HTTP status code of the response. It
   * indicates the status of the request, such as whether it was successful or encountered an error.
   * Examples of common status codes include 200 for a successful request, 404 for a resource not
   * found, and 500 for a server error.
   * @param message - The message parameter is a string that represents a description or explanation of
   * the response or error. It can be used to provide additional information to the user or developer.
   * @param data - The `data` parameter is used to store any additional data that you want to include
   * in the response. It can be any type of data, such as an object, array, or string. This data can be
   * used to provide more information or context about the response.
   * @param [error] - The "error" parameter is an optional parameter that can be passed to the
   * constructor. It is used to store any error information related to the response.
   */
  constructor(statusCode, message, data, error?) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.error = error;
  }

  /**
   * The function returns a success response with a status code of 200 and a message of "Success",
   * along with the provided data.
   * @param res - The "res" parameter is the response object that is used to send the response back to
   * the client. It is typically provided by the web framework or library being used.
   * @param data - The `data` parameter is the response data that you want to send back to the client.
   * It can be any type of data, such as an object, array, or string.
   * @returns a response with a status code of 200 and a body containing an ApiResponse object with a
   * success message and the provided data.
   */
  static success(res, data) {
    return res
      .status(200)
      .send(new ApiResponse(200, ApiResponseCode.getMessage(200), data));
  }

  /**
   * The error function sends an API response with a specified status code, message, and error.
   * @param res - The "res" parameter is the response object that is used to send the response back to
   * the client. It is typically provided by the web framework or library being used.
   * @param statusCode - The statusCode parameter is the HTTP status code that will be sent in the
   * response. It indicates the status of the request, such as 200 for a successful request or 404 for
   * a resource not found.
   * @param message - The "message" parameter is a string that represents the error message that you
   * want to send back to the client.
   * @param error - The "error" parameter is an optional parameter that represents any error object or
   * error message that you want to include in the response. .
   * @returns the result of calling the `send` method on the `res` object. The `send` method is being
   * called with an instance of the `ApiResponse` class as an argument.
   */
  static error(res, statusCode, message, error) {
    return res.status(500).send(new ApiResponse(statusCode, message, error));
  }

  /**
   * The function returns a success response with a message and data.
   * @param res - The "res" parameter is the response object that is used to send the response back to
   * the client. It is typically provided by the web framework or server that is handling the request.
   * @param message - The message parameter is a string that represents a message or description of the
   * response. It can be used to provide additional information or context about the data being
   * returned.
   * @param data - The "data" parameter is the actual data that you want to send as a response. It can
   * be any type of data, such as an object, array, string, or number.
   * @returns a response with a status code of 200 and a body containing an instance of the ApiResponse
   * class with the provided status code, message, and data.
   */
  static successResponseWithData(res, message, data) {
    return res
      .status(200)
      .send(new ApiResponse(200, ApiResponseCode.getMessage(200), data));
  }
}
