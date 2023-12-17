import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authService  = inject(AuthenticationService);
  const router  = inject(Router);
  let authenticated = authService.isAuthenticated();
  if(authenticated==false) {
    router.navigateByUrl("/login");
    return false;
  }else {
    return true;
  }
};