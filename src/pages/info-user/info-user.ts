import { InfoCompraPage } from './../info-compra/info-compra';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

/**
 * Generated class for the InfoUserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-info-user',
  templateUrl: 'info-user.html',
})
export class InfoUserPage {

  public nombre:any;
  public op:any;
  public telefono:any;
  public rfc:any;
  public iduser:any;
  public datosUser:any[];
  public correo:any;
  public host="http://azahareseventos-slp.com/amantolly";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage:Storage,
    public http:Http,
    public e:Events
  ) {
    this.op=navParams.get('op');
    storage.get('iduser').then(val=>{
      this.iduser=val;
    });
    storage.get('nombreuser').then(val=>{
      this.nombre=val;
    });
    storage.get('telefonouser').then(val=>{
      this.telefono=val;
    });
    storage.get('rfcuser').then(val=>{
      this.rfc=val;
    });
    storage.get('correouser').then(val=>{
      this.correo=val;
    });

  }

  mayusc(a){
    this.rfc=a.value.toUpperCase();
  }

  guardar(){
    var link= this.host+'/controllers/loginController.php?op=6&user='+this.correo+'&name='+this.nombre+'&tel='+this.telefono+'&rfc='+this.rfc;
    this.http.get(link).subscribe(data=>{
      var err=data.json;
      if(err[1]==null){
        var link1= this.host+'/controllers/loginController.php?op=3&user='+this.correo;
        this.http.get(link1).subscribe(data=>{
          this.datosUser=data.json();
          this.storage.set('iduser', this.datosUser[0].id);
          this.storage.set('nombreuser', this.datosUser[0].nombre);
          this.storage.set('correouser', this.datosUser[0].correo);
          this.storage.set('telefonouser', this.datosUser[0].telefono);
          this.storage.set('rfcuser', this.datosUser[0].rfc);
          this.e.publish('loginuser');
          this.navCtrl.pop();
        });
      }else{
        alert('Error!');
      }
    });
    
  }

  guardarSeguir(){
    var link= this.host+'/controllers/loginController.php?op=6&user='+this.correo+'&name='+this.nombre+'&tel='+this.telefono+'&rfc='+this.rfc;
    this.http.get(link).subscribe(data=>{
      var err=data.json;
      if(err[1]==null){
        var link1= this.host+'/controllers/loginController.php?op=3&user='+this.correo;
        this.http.get(link1).subscribe(data=>{
          this.datosUser=data.json();
          this.storage.set('iduser', this.datosUser[0].id);
          this.storage.set('nombreuser', this.datosUser[0].nombre);
          this.storage.set('correouser', this.datosUser[0].correo);
          this.storage.set('telefonouser', this.datosUser[0].telefono);
          this.storage.set('rfcuser', this.datosUser[0].rfc);
          this.e.publish('loginuser');
          this.navCtrl.push(InfoCompraPage);
        });
      }else{
        alert('Error!');
      }
    });
    
  }


}
