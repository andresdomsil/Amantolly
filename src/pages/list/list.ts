import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { Http } from '@angular/http';
import { InfoProductoPage } from '../info-producto/info-producto';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  public host="http://azahareseventos-slp.com/amantolly";
  public carr="/controllers/carritoControllersinSession.php";
  public productos: any[];
  public myInput: any;
  public cabeza:any;
  public sub:any;

  constructor(
    public e: Events,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: Http, 
    public toast: ToastController,
    public translate: TranslateService
  ) {
    this.translate.get('CABEZA1').subscribe(val=>{
      this.cabeza=val;
    });
    var link = this.host+'/controllers/productosController.php?op=1';
    http.get(link)
            .subscribe(data => {
              this.productos=data.json();
            });
  }

  buscar(){
    this.translate.get('CABEZA2').subscribe(val=>{
      this.cabeza=val;
      var link = this.host+'/controllers/productosController.php?op=6&sub='+this.sub;
      this.http.get(link)
              .subscribe(data => {
                this.productos=data.json();
              });
    });
  }

  InfoProductoPage(id){
    this.navCtrl.push(InfoProductoPage,{
      id : id
    });
    
  }

  addCarrito(id){
    
    var link = this.host+this.carr+'?op=1&id='+id+'&cantidad=1';
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
