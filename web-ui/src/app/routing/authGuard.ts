import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

export function authGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  console.log('auth guard')
  if (localStorage.getItem('access_token')) {
    //validate token from server
    return true;
  }
  const router = inject(Router);
  router.navigate(['login']);
  return false;
}
