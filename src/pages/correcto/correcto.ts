import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { InicioPage } from '../inicio/inicio';

/**
 * Generated class for the CorrectoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-correcto',
  templateUrl: 'correcto.html',
})
export class CorrectoPage {

  public op:any;
  public nombre:any;

  constructor(
    public storage: Storage,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public e: Events
  ) {
    this.op=navParams.get('op');
  }

  irInicio(){
    this.e.publish('despliegueMenuLeft');
    this.e.publish('loginuser');
    this.navCtrl.setRoot(InicioPage);
  }

  ionViewDidLoad() {
    this.storage.get('nombreuser').then(val=>{
      this.nombre=val;
    })
  }

}
