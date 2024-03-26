import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  
  constructor(private authService:AuthService, private router:Router){}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    // console.log(state.url);
    if(!this.authService.isLoggedIn() && state.url.includes('/login')){
      return true;
    }
    if(this.authService.isLoggedIn()){
        if(state.url.includes('/login')){
          this.router.navigate(['/']);
        }
        // return true;
    }
    else{      
      // console.log('not logged in');
      this.router.navigate(['/login']);
      //return false;
    }    
    return true;
  }  
}