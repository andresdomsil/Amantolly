import { Component, ViewChild, Injectable } from '@angular/core';
import { Nav, Platform, Events, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CarritoPage } from '../pages/carrito/carrito';
import { PedidosPage } from '../pages/pedidos/pedidos';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { InicioPage } from '../pages/inicio/inicio';
import { ConfigPage } from '../pages/config/config';
import { CorrectoPage } from '../pages/correcto/correcto';
import { BusquedaPage } from '../pages/busqueda/busqueda';
import { RegistroPage } from '../pages/registro/registro';
import { Http } from "@angular/http";
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';


@Component({
  templateUrl: 'app.html'
})
@Injectable()
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = InicioPage;
  cantidadCarrito:any;

  public datosUser:any;
  public registro:any;
  public picture=null;
  public cart:any[];
  public subtotal:any;
  public carrito: any[]=[];
  public user: any;
  public correo: any;
  public txt_carrito: any;
  public host="http://azahareseventos-slp.com/amantolly";
  public carr="/controllers/carritoControllersinSession.php";

  pages: Array<{title: string, component: any}>;


  constructor(
    public storage: Storage, 
    public translate: TranslateService,
    public e: Events, 
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public http: Http, 
    public menuCtrl: MenuController,
    public fb: Facebook,
    public gp: GooglePlus
  ) {
    
    storage.get('lang').then(val=>{
      if(val==null){
        translate.setDefaultLang('es');
        this.ir('home');
      }else{
        translate.setDefaultLang(val);
      }
      this.inicializarMenu();
    });
    this.establecerUser();
    this.initializeApp();
    this.cantidadCarrito=0;
    this.actualizarCarrito();
    e.subscribe('addcarrito',()=>{
      this.actualizarCarrito();
    });

    e.subscribe('camara',()=>{
      this.ir('Busqueda');
    });

    e.subscribe('despliegueMenuLeft',()=>{
      this.toggleLeftMenu();
    });


    e.subscribe('translateES',()=>{
      this.translateTo('es');
    });
    e.subscribe('translateEN',()=>{
      this.translateTo('en');
    });
    e.subscribe('translateDE',()=>{
      this.translateTo('es');
    });


    e.subscribe('loginuser',()=>{
      this.establecerUser();
    });
    e.subscribe('loginFBapp',()=>{
      this.loginFB();
    });
    e.subscribe('loginGPapp',()=>{
      this.loginGP();
    });
  }

  loginFB(){
    this.fb.login(['email', 'public_profile']).then((response: FacebookLoginResponse)=>{
      this.fb.api('me?fields=id,name,email,picture.width(360).height(360).as(picture_large)',[]).then(profile=>{ 
        this.storage.set('foto',profile['picture_large']['data']['url']);
        this.verificarExistencia(profile['email'],profile['name']);
      });
    });
  }

  loginGP(){
    this.gp.login({})
    .then(res=>{
      this.storage.set('foto',res.imageUrl);
      this.verificarExistencia(res.email,res.displayName);
    })
    .catch(err=>{
      alert(err);
    });
  }

  verificarExistencia(user,name){
    var link=this.host+'/controllers/loginController.php?op=3&user='+user;
    this.http.get(link).subscribe(data=>{
      this.datosUser=data.json();
      if(this.datosUser==''){
        var link1=this.host+'/controllers/loginController.php?op=4&user='+user+'&name='+name;
        this.http.get(link1).subscribe(data=>{
          this.registro=data.json();
          if(this.registro){
            this.verificarExistencia(user,name);
          }
        });
      }else{
        this.storage.set('iduser', this.datosUser[0].id);
        this.storage.set('nombreuser', this.datosUser[0].nombre);
        this.storage.set('correouser', this.datosUser[0].correo);
        this.storage.set('telefonouser', this.datosUser[0].telefono);
        this.storage.set('rfcuser', this.datosUser[0].rfc);
        this.nav.setRoot(CorrectoPage,{
          op : 1
        });
      }
      
    });
  }

  logoutFB(){
    this.fb.logout();
  }

  logoutGP(){
    this.gp.logout();
  }
  
  establecerUser(){
    this.storage.get('nombreuser').then(val=>{
      this.user=val;
    });
    this.storage.get('correouser').then(val=>{
      this.correo=val;
    });
    this.storage.get('foto').then(val=>{
      if(val!=null){
        this.picture=val;
      }
    });
  }

  cerrarSesion(){
    var link= this.host+'/controllers/salir.php';
      this.http.get(link)
        .subscribe(data=>{
          this.storage.set('iduser', null);
          this.storage.set('nombreuser', null);
          this.storage.set('correouser', null);
          this.storage.set('passuser', null);
          this.storage.set('telefonouser', null);
          this.storage.set('rfcuser', null);  
          this.storage.set('foto',null)
          this.toggleLeftMenu();
          this.actualizarCarrito();
          this.user=null;
          this.correo=null;
          this.picture=null;
          this.logoutFB();
          this.logoutGP();
          this.nav.setRoot(InicioPage);
        });
  }

  translateTo(val){
    this.translate.use(val);
    this.storage.set('lang',val);
    this.inicializarMenu();
  }

  inicializarMenu(){
    this.translate.get(["INICIO","PRODUCTOS","CARRITO","PEDIDOS","CONFIG","QUIENES SOMOS"]).subscribe(values=>{
      this.pages = [
        { title: values["INICIO"], component: InicioPage },
        { title: values["PRODUCTOS"], component: ListPage },
        { title: values["CARRITO"], component: CarritoPage },
        { title: values["PEDIDOS"], component: PedidosPage },
        { title: values["CONFIG"], component: ConfigPage },
        { title: values["QUIENES SOMOS"], component: AboutPage }
      ];
      this.txt_carrito=values["CARRITO"];      
    });
  }

  toggleLeftMenu() {
    this.menuCtrl.toggle('left');
  }

  eliminarProducto(id){
    var link=this.host+this.carr+"?op=2&id="+id;
      this.http.get(link)
        .subscribe(()=>{
          this.actualizarCarrito();
        });
  }

  actualizarCarrito(){
    var link= this.host+this.carr+"?op=0";
      this.http.get(link)
        .subscribe(data=>{
          this.carrito=[];
          this.cart=data.json();
          for (let i in this.cart) {
            this.carrito.push(this.cart[i]);
          }
          this.cantidadCarrito=this.carrito.length;
          this.obtenerSubtotal();
        });
  }

  obtenerSubtotal(){
    var link= this.host+this.carr+"?op=3";
      this.http.get(link)
        .subscribe(data=>{
          this.subtotal=data.text();
        });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available. 
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  ir(r) {
    var page: any;
    switch (r) {
      case 'Busqueda':
        page = BusquedaPage;
        break;
      case 'login':
        page = LoginPage;
        this.toggleLeftMenu();
        break;
      case 'registro':
        page = RegistroPage;
        this.toggleLeftMenu();
        break;
      case 'home':
        page = HomePage;
        break;
      case 'inicioSession':
        page = CorrectoPage;
        break;
        
      default:
        break;
    }
    this.nav.setRoot(page);
  }

}
