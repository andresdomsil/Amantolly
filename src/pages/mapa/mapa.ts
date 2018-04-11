import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {
 GoogleMaps,
 GoogleMapsEvent,
 GoogleMapOptions,
 LatLng,
 MarkerOptions,
 Marker,
 GoogleMap
} from '@ionic-native/google-maps';

declare var google;
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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public geolocation: Geolocation,
    public googleMaps: GoogleMaps
  ) {
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
        'target': {
            lat: this.corDesLat,
            lng: this.corDesLon
          },
        'tilt'    :30,
        'zoom'    :14,
        'bearing' :50
      }
    });

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(()=> this.maker(this.corDesLat,this.corDesLon) );

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
  

  /*loadMap(){
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.corDesLat,
          lng: this.corDesLon
        },
        zoom: 14,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        this.markerLocation = new LatLng(this.corDesLat, this.corDesLon);
        console.log('Map is ready!');
        
        // Now you can use all methods safely.
        this.map.addMarker({
          title: this.title,
          icon: 'green',
          animation: 'DROP',
          position: this.markerLocation,
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });
  }

  loadMap() {
    let latitude = this.corDesLat;
    let longitude = this.corDesLon;

    // create LatLng object
    let myLatLng = { lat: latitude, lng: longitude };

    // create map
    this.map = new google.maps.Map(this.map, {
      center: myLatLng,
      zoom: 14
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: this.title
      });
      this.map.classList.add('show-map');
    });
  }*/

  cerrar(){
    this.map=null;
    this.navCtrl.pop();
  }
}
