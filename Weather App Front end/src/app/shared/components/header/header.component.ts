import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLinkActive, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: true,
    imports: [RouterLinkActive, RouterLink]
})
export class HeaderComponent implements OnInit, OnDestroy{
  isLoggedIn: boolean = false;
  subscriber: any;

  constructor(private authService: AuthService, private route: Router){}

  ngOnInit(){
    this.subscriber = this.authService.getLoggedInState().subscribe(val => {
      this.isLoggedIn = val;
    });
    this.authService.isLoggedIn();
  }

  toggleLoginState(){
    if(this.isLoggedIn){
      this.authService.logOut();
    }
    this.route.navigate(['login']);    
  }

  ngOnDestroy(){
    this.subscriber.unsubscribe();
  }
}