import { InfoUserPage } from './../info-user/info-user';
import { TranslateService } from '@ngx-translate/core';
import { FormdireccionesPage } from './../formdirecciones/formdirecciones';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';

/**
 * Generated class for the DireccionesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-direcciones',
  templateUrl: 'direcciones.html',
})
export class DireccionesPage {

  public direccion:any[];
  public id_user:any;
  public valDom:any;
  public direccions:any;
  public titulo:any;
  public mensaje:any;
  public cancel:any;
  public acept:any;
  public op:any;
  public host="http://sedely.com.mx/amantolly";

  constructor(
    public storage: Storage, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public e: Events,
    public alertCtrl: AlertController,
    public translate: TranslateService
) {
      this.storage.get('iduser').then(val=>{
        this.id_user=val;
        this.consultaDomincilios();
      });
      this.op=navParams.get('op');

      e.subscribe('nuevadireccion',()=>{
        this.consultaDomincilios();
      });
    }

  pedidoInfoUser(){
    this.navCtrl.push(InfoUserPage,{
      op:2
    });
  }

  eliminar(id){
    this.translate.get(["ACELIMINAR","ACMENSAJE","CANCEL","ACEPTAR"]).subscribe(values=>{
       this.acept=values['ACEPTAR'];
       this.titulo=values['ACELIMINAR'];
       this.mensaje=values['ACMENSAJE'];
       this.cancel=values['CANCEL'];
    });
    let confirm = this.alertCtrl.create({
      title: this.titulo,
      message: this.mensaje,
      buttons: [
        {
          text: this.cancel,
          handler: () => {
          }
        },
        {
          text: this.acept,
          handler: () => {
            this.eliminardireccion(id);
          }
        }
      ]
    });
    confirm.present();
  }

  eliminardireccion(id){
    var link = this.host+'/controllers/direccionesController.php?op=4&id='+id;
    this.http.get(link)
      .subscribe(data=>{
        var info=data.json();
        if(info[1]==null){
          this.consultaDomincilios();
        }else{
          alert('Error!');
        }
      });
  }

  consultaDomincilios(){
    var link = this.host+'/controllers/direccionesController.php?op=1&id='+this.id_user;
    this.http.get(link)
      .subscribe(data => {
        this.direccion=data.json();
        for (let i in this.direccion) {
          if(this.direccion[i]['predeterminada']==1){
            this.valDom=this.direccion[i]['id'];
          }
        }
        if(this.direccion[0]==null){
          this.direccions=null;
        }else{
          this.direccions=1;
        }
      });
  }

  cambio(){
    var link = this.host+'/controllers/direccionesController.php?op=3&id_user='+this.id_user+'&id_domicilio='+this.valDom;
    this.http.get(link)
      .subscribe(data=>{
        var info=data.json();
        if(info[1]!=null){
          alert('Error!');
        }
      });
  }

  nuevaDireccion() {
    this.navCtrl.push(FormdireccionesPage);
  }

}
