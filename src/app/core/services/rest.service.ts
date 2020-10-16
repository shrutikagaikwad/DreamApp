import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment as env } from "../../../environments/environment";


@Injectable()
export class RestApi {
  constructor(private http: HttpClient) {}
   
  /**
   * Performs a request with `get` http method.
   */
  get(url: string): Observable<any> {
    return this.http.get(`${env.api}${url}`).pipe(catchError(this.handleError));
  }
  
  /**
   * Performs a request with `post` http method.
   */
  post(url: string, body: any) {
    return this.http.post(`${env.api}${url}`, JSON.stringify(body)).pipe(catchError(this.handleError));
  }
  
  /**
   * Performs a request with `delete` http method.
   */
  del(url: string, id: any) {
    return this.http
      .delete(`${env.api}${url}/${id}`)
      .pipe(catchError(this.handleError));
  }
  /**
   * Performs a request with `put` http method.
   */
  put(url: string, body: any) {
    return this.http
      .put(`${env.api}${url}`, JSON.stringify(body))
      .pipe(catchError(this.handleError));
  }
  /**
   * Parses error if any and then thorw with message.
   */

  handleError(error: HttpResponse<any> | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body: any = error.json() || "";
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ""} ${err}`;
    } else {
      errMsg = error.message ? error : error.toString();
    }
    return Observable.throw(errMsg);
  }
}
