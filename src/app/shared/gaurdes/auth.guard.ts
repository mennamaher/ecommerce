import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authentication/auth.service';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {
  let _AuthService : AuthService = inject(AuthService)
  let _Router : Router = inject(Router);

  if(localStorage.getItem('userToken') != null){
    _AuthService.userInf()
    return true;
  }
  else{
    _Router.navigate(['login'])
    return false;
  }
};
