import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroPage } from './registro';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RegistroPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroPage),
    TranslateModule.forChild()
  ],
  exports: [
    RegistroPage
  ]
})
export class RegistroPageModule {}
