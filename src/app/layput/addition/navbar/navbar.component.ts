import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/authentication/auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  constructor(private _AuthService:AuthService, private _Router:Router){}

  isLogin: boolean= false;

  ngOnInit(): void {
    this._AuthService.userData.subscribe(()=>{
      if(this._AuthService.userData.getValue() == null){
        this.isLogin = false
      }
      else{
        this.isLogin = true
      }
    })
}

  logout(){
    localStorage.removeItem("userToken");
    this._AuthService.userData.next(null);
    this._Router.navigate(['./login'])
  }
}
