import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Facebook } from '@ionic-native/facebook';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MapaPage } from '../pages/mapa/mapa';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';
import { PedidosPage } from '../pages/pedidos/pedidos';
import { CarritoPage } from '../pages/carrito/carrito';
import { InicioPage } from '../pages/inicio/inicio';
import { ConfigPage } from '../pages/config/config';
import { CorrectoPage } from '../pages/correcto/correcto';
import { BusquedaPage } from '../pages/busqueda/busqueda';
import { DireccionesPage } from '../pages/direcciones/direcciones';
import { FormdireccionesPage } from '../pages/formdirecciones/formdirecciones';
import { InfoProductoPage } from '../pages/info-producto/info-producto';
import { InfoUserPage } from '../pages/info-user/info-user';
import { InfoCompraPage } from '../pages/info-compra/info-compra';
import { PagoPaypalPage } from '../pages/pago-paypal/pago-paypal';
import { HttpModule, Http } from "@angular/http";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Camera } from '@ionic-native/camera';
import { GooglePlus } from '@ionic-native/google-plus';
import { PayPal } from '@ionic-native/paypal';
import { GoogleCloudVisionServiceProvider } from '../providers/google-cloud-vision-service/google-cloud-vision-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    InfoProductoPage,
    MapaPage,
    LoginPage,
    RegistroPage,
    PedidosPage,
    CarritoPage,
    BusquedaPage,
    AboutPage,
    ConfigPage,
    InicioPage,
    CorrectoPage,
    DireccionesPage,
    InfoUserPage,
    InfoCompraPage,
    PagoPaypalPage,
    FormdireccionesPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MapaPage,
    AboutPage,
    LoginPage,
    RegistroPage,
    PedidosPage,
    CarritoPage,
    BusquedaPage,
    InfoProductoPage,
    ConfigPage,
    InicioPage,
    CorrectoPage,
    DireccionesPage,
    InfoUserPage,
    InfoCompraPage,
    PagoPaypalPage,
    FormdireccionesPage
  ],
  providers: [
    StatusBar,
    Facebook,
    SplashScreen,
    Geolocation,
    GoogleMaps,
    GooglePlus,
    Camera,
    MyApp,
    PayPal,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GoogleCloudVisionServiceProvider
  ]
})
export class AppModule {}

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
