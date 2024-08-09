import { Routes } from '@angular/router';
import { LoginComponent } from './layput/pages/login/login.component';
import { RegisterComponent } from './layput/pages/register/register.component';
import { HomeComponent } from './layput/pages/home/home.component';
import { CartComponent } from './layput/pages/cart/cart.component';
import { ProductComponent } from './layput/pages/product/product.component';
import { CategoriesComponent } from './layput/pages/categories/categories.component';
import { BrandsComponent } from './layput/pages/brands/brands.component';
import { NotfoundComponent } from './layput/addition/notfound/notfound.component';
import { LogoutComponent } from './layout/pages/logout/logout.component';
import { authGuard } from './shared/gaurdes/auth.guard';


export const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:"full"},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'home', component:HomeComponent, canActivate:[authGuard]},
  {path:'cart', component:CartComponent, canActivate:[authGuard]},
  {path:'products', component:ProductComponent, canActivate:[authGuard]},
  {path:'categories', component:CategoriesComponent, canActivate:[authGuard]},
  {path:'brands', component:BrandsComponent, canActivate:[authGuard]},
  {path:'**', component:NotfoundComponent, canActivate:[authGuard]},
];
