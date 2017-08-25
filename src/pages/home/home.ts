import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { InicioPage } from '../inicio/inicio';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public seleccionado:any;

  constructor(public storage: Storage, public e: Events, public navCtrl: NavController) {
      storage.get('lang').then(val=>{
        this.seleccionado=val;
      });
  }
  regresar(){
    this.navCtrl.setRoot(InicioPage);   
  }

  cambiarIdioma(val){
    this.e.publish("translate"+val);
  }

}
