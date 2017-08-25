import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfigPage } from './config';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ConfigPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfigPage),
    TranslateModule.forChild()
  ],
  exports: [
    ConfigPage
  ]
})
export class ConfigPageModule {}
