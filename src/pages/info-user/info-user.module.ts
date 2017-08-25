import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoUserPage } from './info-user';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    InfoUserPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoUserPage),
    TranslateModule.forChild()
  ],
  exports: [
    InfoUserPage
  ]
})
export class InfoUserPageModule {}
