import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const notAuthGuard: CanActivateFn = (route, state) => {
  if(!localStorage.getItem("freshToken")){
    return true;
  }
  let router:Router=inject(Router);
  router.navigate(["/home"]);
  return false;
  
};
