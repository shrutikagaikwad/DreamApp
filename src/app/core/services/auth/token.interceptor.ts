import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private inject: Injector) {
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.url.endsWith("login")) {
      if (!request.url.endsWith('register')) {
      const auth = this.inject.get(AuthService);
      request = request.clone({
        setHeaders: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getToken()}`,
          "cache-control": "no-cache",
          "Access-Control-Allow-Origin": "http://localhost:8005/"
        }
      });
     }
    }
    return next.handle(request);
  }
}
