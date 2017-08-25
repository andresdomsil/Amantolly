import { LoginPage } from './../login/login';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Http } from "@angular/http";
import { DireccionesPage } from '../direcciones/direcciones';

/**
 * Generated class for the CarritoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {

  public cart:any[];
  public subtotal:any;
  public carrito: any[]=[];
  public host="http://sedely.com.mx/amantolly";
  public carr="/controllers/carritoControllersinSession.php";

  constructor(
    public e: Events, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: Http,
    public storage: Storage
  ) {
    this.actualizarCarrito();
  }

  eliminarProducto(id){
    var link=this.host+this.carr+"?op=2&id="+id;
      this.http.get(link)
        .subscribe(()=>{
          this.actualizarCarrito();
        });
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
          this.e.publish("addcarrito");
        });
  }

  obtenerSubtotal(){
    var link=this.host+this.carr+"?op=3";
      this.http.get(link)
        .subscribe(data=>{
          this.subtotal=data.text();
        });
  }

  realizarPedido(){
    this.storage.get('iduser').then(val=>{
      if(val!=null){
        this.navCtrl.push(DireccionesPage,{
          op:2
        });
      }else {
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }

}
