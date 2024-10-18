import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAuthenticationDTO} from "../models/IAuthenticationDTO";
import {Observable, Subject} from "rxjs";
import {ILoginResponseDTO} from "../models/ILoginResponseDTO";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly URL: string = 'http://localhost:8080/api/auth/login'
  private userLoggedSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  login(auth: IAuthenticationDTO): Observable<ILoginResponseDTO> {
    return this.http.post<ILoginResponseDTO>(this.URL, auth)
  }

  setUserLogged(value: boolean): void {
    this.userLoggedSubject.next(value);
  }

  getUserLoggedObservable(): Observable<boolean> {
    return this.userLoggedSubject.asObservable();
  }

}
