import { ErrorHandler, Injectable } from "@angular/core";
import { AuthService } from "./auth/auth.service";
@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
  constructor(private auth: AuthService) {
    super();
  }
  
  getErrorMessage = errorId => {

    let msg = ERR.COMMON_ERR,id = errorId;
    switch (id) {
      case 1:
        msg=ERR.NO_DATA;
        break;
      case 2:
        msg=ERR.INVALID_CREDENTIALS;  
        break;
      case 3:
        msg=ERR.ALREADY_USER;  
        break;  
      case 401:
        msg = ERR.UNAUTHORIZED;
        this.auth.logout();
        break;
      default:
        msg = ERR.COMMON_ERR;
        this.auth.logout();
        break;
    }
    return msg;
  };
}

const ERR = {
  COMMON_ERR: " Oops something went wrong, please try again.",
  NO_DATA: "No result found.",
  INVALID_CREDENTIALS: "Invalid username or password.",
  UNAUTHORIZED: "You are not authorized or your session is expired.",
  ALREADY_USER:"Email already exists"
};
