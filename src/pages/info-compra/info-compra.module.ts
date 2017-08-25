import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoCompraPage } from './info-compra';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    InfoCompraPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoCompraPage),
    TranslateModule.forChild()
  ],
  exports: [
    InfoCompraPage
  ]
})
export class InfoCompraPageModule {}
