import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

/**
 * Generated class for the FormdireccionesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-formdirecciones',
  templateUrl: 'formdirecciones.html',
})
export class FormdireccionesPage {

  public direccion='';
  public cp='';
  public ciudad='';
  public estado='';
  public pais='';
  public id_user='';
  public host="http://sedely.com.mx/amantolly";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public tl: TranslateService,
    public storage: Storage,
    public e: Events
  ) {
    storage.get('iduser').then(val=>{
        this.id_user=val;
    });
  }

  guardar(){
    if (this.direccion!='' && this.cp!='' && this.ciudad!='' && this.estado!='' && this.pais!='') {
      var link= this.host+'/controllers/direccionesController.php?op=2&id='+this.id_user+'&dom='+this.direccion+'&cp='+this.cp+'&ciudad='+this.ciudad+'&estado='+this.estado+'&pais='+this.pais;
      link=link.replace("#", "%23");
      this.http.get(link)
        .subscribe(data=>{
          var info=data.json();
          if(info[1]==null){
            this.e.publish('nuevadireccion');
            this.navCtrl.pop();
          }
        });
    }else{
      this.tl.get("CAMPINCOMPLETOS").subscribe(val=>{
        alert(val);
      });
    }
    
  }

}
