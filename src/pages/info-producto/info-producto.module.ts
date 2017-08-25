import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoProductoPage } from './info-producto';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    InfoProductoPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoProductoPage),
    TranslateModule.forChild()
  ],
  exports: [
    InfoProductoPage
  ]
})
export class InfoProductoPageModule {}
