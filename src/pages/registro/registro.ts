import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from "@angular/http";
import { CorrectoPage } from '../correcto/correcto';

/**
 * Generated class for the RegistroPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  public nameuser:any;
  public emailuser:any;
  public passuser:any;
  public host="http://sedely.mx/amantolly";
  public resp:any;
  public resp1:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public e: Events,
    public storage: Storage,
    public http: Http
  ) {
  }

  registrar(){
    var link1=this.host+'/controllers/loginController.php?op=3&user='+this.emailuser;
    this.http.get(link1).subscribe(data=>{    
      this.resp=data.json();
      if(this.resp==''){
        var link=this.host+'/controllers/loginController.php?op=5&user='+this.emailuser+'&pass='+this.passuser+'&name='+this.nameuser;
        this.http.get(link).subscribe(data=>{
          console.log(this.resp1);
          this.resp1=data.json();
          this.storage.set('iduser', this.resp1[0].id);
          this.storage.set('nombreuser', this.resp1[0].nombre);
          this.storage.set('correouser', this.resp1[0].correo);
          this.storage.set('passuser', this.resp1[0].pass);
          this.storage.set('telefonouser', this.resp1[0].telefono);
          this.storage.set('rfcuser', this.resp1[0].rfc);
          this.navCtrl.setRoot(CorrectoPage,{
            op : 2
          });
        });
      }else{
        alert('Este correo ya habia sido registrado con anterioridad.'); 
      }
    });
  }

  loginFB(){
    this.e.publish('loginFBapp');
  }

  loginGP(){
    this.e.publish('loginGPapp');
  }

  cerrar(){
    this.navCtrl.pop();
  }

}
