import { PagoPaypalPage } from './../pago-paypal/pago-paypal';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InfoCompraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-info-compra',
  templateUrl: 'info-compra.html',
})
export class InfoCompraPage {
 
  public cart:any[];
  public subtotal:any;
  public id_user:any;
  public nombre:any;
  public tel:any;
  public rfc:any;
  public carrito: any[]=[];
  public direccion:any[];
  public infoUser:any[];
  public host="http://azahareseventos-slp.com/amantolly";
  public carr="/controllers/carritoControllersinSession.php";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public storage:Storage
  ){
    this.llenarCampos();
  }

  actualizarCarrito(){
    var link=this.host+this.carr+"?op=0";
    this.http.get(link)
      .subscribe(data=>{
        this.carrito=[];
        this.cart=data.json();
        for (let i in this.cart) {
          this.carrito.push(this.cart[i]);
        }
        this.obtenerSubtotal();
      });
  }

  obtenerSubtotal(){
    var link=this.host+this.carr+"?op=3";
      this.http.get(link)
        .subscribe(data=>{
          this.subtotal=data.text();
        });
  }

  consultaDomincilios(){
    var link = this.host+'/controllers/direccionesController.php?op=5&id='+this.id_user;
    this.http.get(link)
      .subscribe(data => {
        this.direccion=data.json();
      });
  }

  llenarCampos(){
    this.storage.get('iduser').then(val=>{
      this.id_user=val;
      this.consultaDomincilios();
    });
    this.storage.get('nombreuser').then(val=>{
      this.nombre=val;
    });
    this.storage.get('telefonouser').then(val=>{
      this.tel=val;
    });
    this.storage.get('rfcuser').then(val=>{
      this.rfc=val;
    });
    this.actualizarCarrito();
  }

  pago(){
    this.navCtrl.push(PagoPaypalPage);
  }


}
