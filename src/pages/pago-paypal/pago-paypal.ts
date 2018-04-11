import { PedidosPage } from './../pedidos/pedidos';
import { TranslateService } from '@ngx-translate/core';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

@IonicPage()
@Component({
  selector: 'page-pago-paypal',
  templateUrl: 'pago-paypal.html',
})
export class PagoPaypalPage {

  public precio:any;
  public alert:any;
  public user:any;
  public host="http://sedely.mx/amantolly";
  public carr="/controllers/carritoControllersinSession.php";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public payPal: PayPal,
    public e: Events,
    public http: Http,
    public translate: TranslateService,
    public storage: Storage
  ) {
    this.translate.get('ALERT1').subscribe(val=>{
      this.alert=val;
      this.obtenerSubtotal();
    });
  }

  obtenerSubtotal(){
    var link=this.host+this.carr+"?op=3";
      this.http.get(link)
        .subscribe(data=>{
          this.precio=data.text();
          this.pago();
        });
  }

  pago(){
    this.payPal.init({
      PayPalEnvironmentProduction: 'Af4vIawJBrVU58AeAC-_NCWKsJlfErqr9ZBjxKobd_7T5HyCH7sBTVwAtPdoESVIQgf-rH_ctfv81yWu',
      PayPalEnvironmentSandbox: 'AagMdXRXeZPqloXGAvrOzN1ij_kqTPo3wHqaafxtlcvYYaj-gBY3eKTb_PaIXbWxDwvS2ggHzlZOoqTR'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(this.precio, 'MXN', 'Compra de artesanias Amantolly Souvenirs', 'sale',);
        this.payPal.renderSinglePaymentUI(payment).then(() => {
          var dom=this.navParams.get('id');
          this.storage.get('iduser').then(val=>{
            this.user=val;
            var link= this.host+this.carr+"?op=6&user="+this.user+"&dom="+dom.id;
            this.http.get(link)
              .subscribe(data=>{
                alert('Gracias por su compra!!');
                this.navCtrl.setRoot(PedidosPage);
              });
          });
        }, (err) => {
          alert(this.alert);// Error or render dialog closed without being successful
        });
      }, (err) => {
        alert(this.alert);// Error in configuration
      });
    }, (err) => {
      alert(this.alert);// Error in initialization, maybe PayPal isn't supported or something else
    });
  }

  ionViewDidLoad() {
    
  }

}
