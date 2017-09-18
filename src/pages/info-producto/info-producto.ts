import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { Http } from '@angular/http';
import { MapaPage } from '../mapa/mapa';

/**
 * Generated class for the InfoProductoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-info-producto',
  templateUrl: 'info-producto.html',
})
export class InfoProductoPage {
  lugarorigen: any[];

  public value = 1;
  public id: any;
  public lat: any;
  public lng: any;
  public titleLugar: any;
  public producto: any[];
  public imagenes: any[];
  public host="http://azahareseventos-slp.com/amantolly";
  public carr="/controllers/carritoControllersinSession.php";

  constructor(
    public e: Events,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: Http, 
    public toast: ToastController
  ) {
    
  }

  ionViewDidLoad() {
    this.id=this.navParams.get("id");
    var link = this.host+'/controllers/productosController.php?op=2&id='+this.id;
    this.http.get(link)
            .subscribe(data => {
              this.producto= data.json();
              this.lugar(this.producto[0].origen_id);
            });
    link = this.host+'/controllers/productosController.php?op=3&id='+this.id;
    this.http.get(link)
            .subscribe(data => {
              this.imagenes= data.json();
            });
    

  }

  lugar(id){
    var link = this.host+'/controllers/productosController.php?op=5&id='+id;
    this.http.get(link)
            .subscribe(data => {
              this.lugarorigen= data.json();
              this.lat=this.lugarorigen[0].lat;
              this.lng=this.lugarorigen[0].lng;
              this.titleLugar=this.lugarorigen[0].nombre;              
            });
  }

  addCarrito(id){    
    var link = this.host+this.carr+'?op=1&id='+id+'&cantidad='+this.value;
    this.http.get(link)
            .subscribe(() => {
              let t= this.toast.create({
                message:'Elemento añadido correctamente al carrito',
                duration: 2000,
                position: "bottom" 	
              });
              t.present().then(()=>{
                this.navCtrl.pop();
                this.e.publish("addcarrito");
              });
            });
    
  }

  irMapa(){
    this.navCtrl.push(MapaPage,{
      lat   : this.lat,
      lng   : this.lng,
      title : this.titleLugar
    });
  }

  cerrar(){
    this.navCtrl.pop();
  }

}
