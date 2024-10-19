import {CanActivateFn, Router} from '@angular/router';
import {LocalStorageUtils} from "../util/local-storage";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const isAuthenticatedUser = LocalStorageUtils.isAuthenticatedUser();
  if (isAuthenticatedUser) {
    return true;
  }
  const router = inject(Router);
  router.navigate(['/entrar']);
  return false;
};
