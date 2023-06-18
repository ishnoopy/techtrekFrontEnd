import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { CardComponent } from './card/card.component';
import { FooterComponent } from './footer/footer.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';



@NgModule({
  declarations: [
    NavbarComponent,
    CardComponent,
    FooterComponent,
    AdminNavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent,
    CardComponent,
    FooterComponent,
    AdminNavbarComponent
  ]
})
export class SharedModule { }
