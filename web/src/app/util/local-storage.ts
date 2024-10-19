import {ILoginResponseDTO} from "../login/models/ILoginResponseDTO";

export class LocalStorageUtils {

  private static readonly USER_ID = 'app.userId';
  private static readonly TOKEN = 'app.token';

  static saveAuthenticatedUser(loginResponseDTO: ILoginResponseDTO) {
    localStorage.setItem(this.USER_ID, loginResponseDTO.userId);
    localStorage.setItem(this.TOKEN, loginResponseDTO.token);
  }

  static clearAuthenticatedUser() {
    localStorage.removeItem(this.USER_ID);
    localStorage.removeItem(this.TOKEN);
  }

  static getUserToken() {
    return localStorage.getItem(this.TOKEN);
  }

  static getUserId() {
    return localStorage.getItem(this.USER_ID);
  }

  static isAuthenticatedUser() {
    return this.getUserToken() != null;
  }
}
