import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComprasPage } from './compras';

@NgModule({
  declarations: [
    ComprasPage,
  ],
  imports: [
    IonicPageModule.forChild(ComprasPage),
  ],
  exports: [
    ComprasPage
  ]
})
export class ComprasPageModule {}
