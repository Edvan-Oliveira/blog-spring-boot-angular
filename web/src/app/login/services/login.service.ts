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
  private authenticatedUserSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  login(auth: IAuthenticationDTO): Observable<ILoginResponseDTO> {
    return this.http.post<ILoginResponseDTO>(this.URL, auth)
  }

  setAuthenticatedUser(value: boolean): void {
    this.authenticatedUserSubject.next(value);
  }

  getAuthenticatedUserObservable(): Observable<boolean> {
    return this.authenticatedUserSubject.asObservable();
  }

}
