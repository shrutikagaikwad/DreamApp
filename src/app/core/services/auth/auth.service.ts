import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { shareReplay, map } from "rxjs/operators";
import { environment as env } from "../../../../environments/environment";

const TOKEN = "token";
interface Response {
    token:string;
}

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}


  register(reqBody) {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'cache-control': 'no-cache'
    });
    return this.http.post(`${env.api}register`, reqBody, { headers }).pipe(
        map((resp) => {
            return resp;
        })
    );
}

  login(email: string, password: string) {
    const body = {
      'email':email,
      'password':password
    };
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
        
    return this.http.post(`${env.api}login`, body, { headers }).pipe(
      shareReplay(),
      map((resp: Response) => {
        if(resp.token){
          this.setToken(resp.token);
        }
          return resp;
      })
    );
  }

  logout = () => {
    this.removeItemsFromStorage([TOKEN]);
    this.router.navigate(["/login"]);
  }; 
  private removeItemsFromStorage = (items: string[]) =>
  items.forEach(item => localStorage.removeItem(item));

  getToken = () => localStorage.getItem(TOKEN);
  setToken = (token: string) => localStorage.setItem(TOKEN, token);
  
}

