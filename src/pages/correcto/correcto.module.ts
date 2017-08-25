import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CorrectoPage } from './correcto';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CorrectoPage,
  ],
  imports: [
    IonicPageModule.forChild(CorrectoPage),
    TranslateModule.forChild()
  ],
  exports: [
    CorrectoPage
  ]
})
export class CorrectoPageModule {}
