import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

/**
 * Generated class for the PedidosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})
export class PedidosPage {

  public compras: any[]=[];
  public host="http://sedely.mx/amantolly";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public e: Events,
    public http: Http,
    public storage: Storage
  ) {
    e.publish('addcarrito');
    this.storage.get('iduser').then(val=>{
      var link=this.host+'/controllers/comprasController.php?op=0&id='+val;
      this.http.get(link)
        .subscribe(data=>{
          this.compras=data.json();
      });
    });
    

  }

}
