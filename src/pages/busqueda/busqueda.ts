import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { Http } from '@angular/http';
import { InfoProductoPage } from '../info-producto/info-producto';

/**
 * Generated class for the BusquedaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-busqueda',
  templateUrl: 'busqueda.html',
})
export class BusquedaPage {

  public productos: any[];

  constructor(public e: Events, public toast: ToastController, public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    var link = 'http://azahareseventos-slp.com/amantolly/controllers/productosController.php?op=4';
    http.get(link)
            .subscribe(data => {
              this.productos= data.json();
            });
  }

  InfoProductoPage(id){
    this.navCtrl.push(InfoProductoPage,{
      id : id
    });
    
  }

  addCarrito(id){
    var link = 'http://azahareseventos-slp.com/amantolly/controllers/carritoControllersinSession.php?op=1&id='+id+'&cantidad=1';
    this.http.get(link)
            .subscribe(() => {
              let t= this.toast.create({
                message:'Elemento añadido correctamente al carrito',
                duration: 1000,
                position: "bottom" 	
              });
              t.present().then(()=>{
                this.e.publish("addcarrito");
              });
            });
  }


}
