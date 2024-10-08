import { NgxSpinnerModule } from 'ngx-spinner';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./layput/addition/navbar/navbar.component";
import { FooterComponent } from "./layput/addition/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent,NgxSpinnerModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'E-commerce';
  
}
