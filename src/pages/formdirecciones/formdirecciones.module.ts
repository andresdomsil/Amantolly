import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormdireccionesPage } from './formdirecciones';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    FormdireccionesPage,
  ],
  imports: [
    IonicPageModule.forChild(FormdireccionesPage),
    TranslateModule.forChild()
  ],
  exports: [
    FormdireccionesPage
  ]
})
export class FormdireccionesPageModule {}
