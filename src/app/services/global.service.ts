import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  onHttpLogin = new Subject();
  isLogged = new Subject();
  onHttpGetProfile = new Subject();
  onHttpUpdateProfile = new Subject();

  constructor(private http: HttpClient, private route: Router) {

  }

  httpLogin(logins: any){
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/auth/login';

    // const data = {
    //   username: 'erwinf@cloudstaff.com',
    //   password: 'SS@wada91824'
    // };

    this.http.post(url, logins).subscribe(
      (response: any) => {
        console.log('success response' , response);
        if(response.status == 'success'){
          this.onHttpLogin.next(response.data);
          this.isLogged.next(true);
        }
      },
      (error) => {
        console.log('error response' , error);
      },
    );
  }

  httpGetProfile(): void{
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/users/my';
    const token = this.getToken();

    this.http.get(url, {
      headers: new HttpHeaders().set('Authorization','Bearer ' + token)
    }).subscribe(
      (response:any) => {
        console.log('this is from httpGetProfile Service', response.data);

        if(response.status == 'success'){
          this.onHttpGetProfile.next(response.data);
        }
      },
      (error) => {
        console.log('this is from httpGetProfile Service', error);
        this.route.navigate(['/']);
      }
    );
  }

  httpUpdateProfile(data: any): void {
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/users/my';
    const token = this.getToken();

    this.http.put(url , data ,{
      headers: new HttpHeaders().set('Authorization','Bearer ' + token)
    }).subscribe(
      (response: any) => {
        console.log('this is from http update profile service', response);

        if(response.status === 'success'){
          this.onHttpUpdateProfile.next(response.data);
        }
      },
      (error) => {
        console.log('error reponse in httpUpdateProfile', error);
      }
    );

  }

  setToken(token:string): void{
    localStorage.setItem('token',token);
    // return token;
  }

  getToken(): string{
    const token = localStorage.getItem('token');
    return token || '';
  }

  checkLogStatus() : void{
    const token = localStorage.getItem('token');

    if(token){
      this.isLogged.next(true);
    }else{
      this.isLogged.next(false);
    }
  }

  deleteToken(): void{
    localStorage.removeItem('token');
    this.isLogged.next(false);
  }

}
