import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarritoPage } from './carrito';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CarritoPage,
  ],
  imports: [
    IonicPageModule.forChild(CarritoPage),
    TranslateModule.forChild()
  ],
  exports: [
    CarritoPage
  ]
})
export class CarritoPageModule {}
