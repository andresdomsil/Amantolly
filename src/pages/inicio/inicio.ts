import { ListPage } from './../list/list';
import { GoogleCloudTranslateServiceProvider } from './../../providers/google-cloud-translate-service/google-cloud-translate-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { TranslateService } from '@ngx-translate/core';
import { GoogleCloudVisionServiceProvider } from '../../providers/google-cloud-vision-service/google-cloud-vision-service';

/**
 * Generated class for the InicioPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {

  public respuestas:any[];
  public resp2:any;

  constructor(
    public translate: TranslateService, 
    public e: Events, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public camera: Camera,
    private vision: GoogleCloudVisionServiceProvider,
    private trad: GoogleCloudTranslateServiceProvider
  ) {
  }

  abrirCamara(){
    let opciones: CameraOptions = {
      quality: 100,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    this.camera.getPicture(opciones).then((imageData)=>{
      this.vision.getLabels(imageData).subscribe((result) => {
        this.trad.traducir(result.json().responses[0].labelAnnotations[0].description).subscribe((res)=>{
          this.respuestas=res.json().data.translations[0].translatedText;
          this.navCtrl.setRoot(ListPage,{
            busqueda: this.respuestas
          });
        }, err=>{
          alert('Error de google traductor: '+err);
        });
      }, err => {
        alert('Error de google Vision: '+err);
      });
    }).catch(err=>alert('Error camara: '+err));
    
  }

  /*abrirCamara(){
    this.e.publish("camara");
  }*/

}
