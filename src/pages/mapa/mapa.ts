import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';

/**
 * Generated class for the MapaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  public corDesLat      : any;
  public corDesLon      : any;
  public title          : any;
  public map            : any;
  public markerLocation : LatLng;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation,public googleMaps: GoogleMaps) {
  }

  ionViewDidEnter() {
    this.corDesLat=this.navParams.get("lat");
    this.corDesLon=this.navParams.get("lng");
    this.title=this.navParams.get("title");
    console.log(this.corDesLat+' '+this.corDesLon+' '+this.title);
    
    this.geolocation.getCurrentPosition().then(() => {
      this.loadMap();
    })
    .catch(error =>{
      console.log(error);
    });
  }

  maker(lat,lon){
    this.markerLocation = new LatLng(lat,lon);
    let markerOptions   : MarkerOptions = {
      position: this.markerLocation,
      title: this.title,
      icon : "green"
    }
    this.map.addMarker(markerOptions).then((marker : Marker)=>{
      marker.showInfoWindow();
    }).catch(err => console.log(err));
  }

  loadMap(){
    let myPosition: LatLng = new LatLng(this.corDesLat,this.corDesLon);
    this.map= new GoogleMap('map',{
      'controls':{
        'compass'         : true,
        'myLocationButton': true,
        'indoorPicker'    : true,
        'zoom'            : true
      },
      'gestures':{
        'scroll'  : true,
        'tilt'    : true,
        'rotate'  : true,
        'zoom'    : true
      },
      'camera':{
        'latLng'  :myPosition,
        'tilt'    :30,
        'zoom'    :14,
        'bearing' :50
      }
    });

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(()=> this.maker(this.corDesLat,this.corDesLon) );

  }

  cerrar(){
    this.map=null;
    this.navCtrl.pop();
  }
}
