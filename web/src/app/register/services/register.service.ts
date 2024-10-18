import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IRegisterDTO} from "../models/IRegisterDTO";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private readonly URL: string = 'http://localhost:8080/api/auth/register'

  constructor(private http: HttpClient) { }

  register(register: IRegisterDTO) {
    return this.http.post(this.URL, register)
  }

}
