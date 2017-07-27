import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-localizacao',
  templateUrl: 'localizacao.html',
})
export class LocalizacaoPage {

  keyAndroid: string = 'AIzaSyBIGC55nEQXfUsjDaKG0u2tWrQB6idtLRQ';
  location: any;
  constructor(private googleMaps: GoogleMaps, public navCtrl: NavController, public navParams: NavParams, private geolocationProvider: BackgroundGeolocation) {

    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 5,
      stationaryRadius: 20,
      distanceFilter: 30,
      debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: true, // enable this to clear background location settings when the app terminates
      interval: 60000,
      startForeground: false,
      notificationTitle: 'Localização'
    };
    this.geolocationProvider.configure(config).subscribe((location: BackgroundGeolocationResponse) => {
      this.location = location;
      console.log('Location RUNNING');
      console.log(location);
    });

    this.geolocationProvider.start();
    setTimeout(() => {
      this.geolocationProvider.stop();
      console.log('Location STOP');
    }, 60000 * 5);
  }

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    // make sure to create following structure in your view.html file
    // and add a height (for example 100%) to it, else the map won't be visible
    // <ion-content>
    //  <div #map id="map" style="height:100%;"></div>
    // </ion-content>

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');
debugger;
    let map: GoogleMap = this.googleMaps.create(element);

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        console.log('Map is ready!');
        // Now you can add elements to the map like the marker
      }
    );

    // create CameraPosition
    let position: CameraPosition = {
      target: {
        lat: 43.0741904,
        lng: -89.3809802
      },
      zoom: 18,
      tilt: 30
    };

    // move the map's camera to position
    map.moveCamera(position);

    // create new marker
    let markerOptions: MarkerOptions = {
      position: {
        lat: 123123,
        lng: 123
      },
      title: 'Ionic'
    };

    map.addMarker(markerOptions)
      .then((marker: Marker) => {
        marker.showInfoWindow();
      });
  }

}
