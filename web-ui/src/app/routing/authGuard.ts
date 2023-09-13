import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

export function authGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  var accessToken = localStorage.getItem('access_token');
  //TODO : add validation expiration date
  if (accessToken) {
    //validate token from server
    return true;
  }
  const router = inject(Router);
  router.navigate(['login']);
  return false;
}
