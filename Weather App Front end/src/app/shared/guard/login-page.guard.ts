import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class LoginPageGuard implements CanActivate {
  
  constructor(private authService:AuthService, private route:Router){}
  
  canActivate(){
    if(this.authService.isLoggedIn()){
      this.route.navigate(['/']);
      return false;
    }
    else{      
      return true;
    }    
  }  
}