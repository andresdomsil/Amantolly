import { Storage } from '@ionic/storage';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DireccionesPage } from '../direcciones/direcciones';
import { InfoUserPage } from '../info-user/info-user';

/**
 * Generated class for the ConfigPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage
  ) {
  }

  ir(val){
    switch (val) {
      case 'Home':
        this.navCtrl.push(HomePage);
        break;
      case 'Direccion':
        this.storage.get('iduser').then(val=>{
          if(val==null){
            this.navCtrl.setRoot(LoginPage);
          }else{
            this.navCtrl.push(DireccionesPage,{
              op:1
            });
          }
        });
        break;
      case 'InfoUser':
        this.storage.get('iduser').then(val=>{
          if(val==null){
            this.navCtrl.setRoot(LoginPage);
          }else{
            this.navCtrl.push(InfoUserPage,{
              op:1
            });
          }
        });
        break;
      default:
        break;
    }
    
  }

}
