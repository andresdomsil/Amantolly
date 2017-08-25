import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DireccionesPage } from './direcciones';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DireccionesPage,
  ],
  imports: [
    IonicPageModule.forChild(DireccionesPage),
    TranslateModule.forChild()
  ],
  exports: [
    DireccionesPage
  ]
})
export class DireccionesPageModule {}
