export class LocalStorageUtils {

  private static readonly TOKEN = 'app.token';

  static saveUserToken(token: string) {
    localStorage.setItem(this.TOKEN, token);
  }

  static clearUserToken() {
    localStorage.removeItem(this.TOKEN);
  }

  static getUserToken() {
    return localStorage.getItem(this.TOKEN);
  }

  static isUserLogged() {
    return this.getUserToken() != null;
  }
}
