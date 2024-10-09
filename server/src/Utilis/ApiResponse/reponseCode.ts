export class ApiResponseCode {
  public static readonly SUCCESS = 200;
  public static readonly BAD_REQUEST = 400;
  public static readonly UNAUTHORIZED = 401;
  public static readonly FORBIDDEN = 403;
  public static readonly NOT_FOUND = 404;
  public static readonly INTERNAL_SERVER_ERROR = 500;
  public static readonly SERVICE_UNAVAILABLE = 503;
  public static readonly GATEWAY_TIMEOUT = 504;

  public static getMessage(statusCode: number): string {
    switch (statusCode) {
      case ApiResponseCode.SUCCESS:
        return "Success";
      case ApiResponseCode.BAD_REQUEST:
        return "Bad Request";
      case ApiResponseCode.UNAUTHORIZED:
        return "Unauthorized";
      case ApiResponseCode.FORBIDDEN:
        return "Forbidden";
      case ApiResponseCode.NOT_FOUND:
        return "Not Found";
      case ApiResponseCode.INTERNAL_SERVER_ERROR:
        return "Internal Server Error";
      case ApiResponseCode.SERVICE_UNAVAILABLE:
        return "Service Unavailable";
      case ApiResponseCode.GATEWAY_TIMEOUT:
        return "Gateway Timeout";
      default:
        return "Unknown Status Code";
    }
  }
}
