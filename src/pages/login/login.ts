import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from "@angular/http";
import { CorrectoPage } from '../correcto/correcto';
import { TranslateService } from '@ngx-translate/core';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public emailuser:any;
  public passuser:any;
  public nombre:any;
  public host="http://sedely.com.mx/amantolly";
  public titulo:any;
  public mensaje:any;
  public BA:any;
  public BC:any;
  public resp:any;

  constructor(
    public storage: Storage,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public e: Events,
    public translate: TranslateService,
    public alertCtrl: AlertController
  ){
    storage.get('correouser').then(val=>{
      this.emailuser=val;
    });
    storage.get('passuser').then(val=>{
      this.passuser=val;
    });
    this.prepararAlert();
  }

  prepararAlert() {
    this.translate.get(["ACEPTAR","CANCEL","ALERTTITLE","MENSAJEALERT"]).subscribe(values=>{
        this.BA=values['ACEPTAR'];
        this.BC=values['CANCEL'];
        this.titulo=values['ALERTTITLE'];
        this.mensaje=values['MENSAJEALERT'];
    });
  }

  crearAlert(){
    let prompt = this.alertCtrl.create({
      title: this.titulo,
      message: this.mensaje,
      inputs: [
        {
          type: 'email',
          name: 'Email',
          placeholder: 'ej@hotmail.com'
        },
      ],
      buttons: [
        {
          text: this.BC,
          handler: data => {
            
          }
        },
        {
          text: this.BA,
          handler: data => {
            this.enviarcontraseña(data.Email);
          }
        }
      ]
    });
    prompt.present();
  }

  enviarcontraseña(datos){
    var link=this.host+'/controllers/loginController.php?op=2&correo='+datos;
    this.http.get(link).subscribe(val=>{
      switch (val.text()) {
        case '1':
          alert("Su contraseña fue enviada a su correo electronico.");
          break;
        case '2':
          alert("Este correo no esta registrado en la aplicación. Por favor registrese con nosotros para continuar");
          break;
        default:
          alert("Hay algun problema con el envio de su contraseña, intentelo mas tarde");
          break;
      }
    });
  }

  buscaruser(){
    var link=this.host+'/controllers/loginController.php?op=1&user='+this.emailuser+'&pass='+this.passuser;
    this.http.get(link).subscribe(data=>{
      this.nombre=data.json();
      if(this.nombre==''){
        alert('El correo o contraseña es incorrecto'); 
      }else{
        this.storage.set('iduser', this.nombre[0].id);
        this.storage.set('nombreuser', this.nombre[0].nombre);
        this.storage.set('correouser', this.nombre[0].correo);
        this.storage.set('passuser', this.nombre[0].pass);
        this.storage.set('telefonouser', this.nombre[0].telefono);
        this.storage.set('rfcuser', this.nombre[0].rfc);
        this.navCtrl.setRoot(CorrectoPage,{
          op : 1
        });
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
