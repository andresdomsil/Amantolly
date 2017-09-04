import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagoPaypalPage } from './pago-paypal';

@NgModule({
  declarations: [
    PagoPaypalPage,
  ],
  imports: [
    IonicPageModule.forChild(PagoPaypalPage),
  ],
  exports: [
    PagoPaypalPage
  ]
})
export class PagoPaypalPageModule {}
