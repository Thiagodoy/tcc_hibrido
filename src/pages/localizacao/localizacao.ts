import { Component,EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { HttpProvider } from '../../providers/http/http';
import { Log } from '../../providers/sq-lite/log-class';

@IonicPage()
@Component({
  selector: 'page-localizacao',
  templateUrl: 'localizacao.html',
})
export class LocalizacaoPage {

  keyAndroid: string = 'AIzaSyBIGC55nEQXfUsjDaKG0u2tWrQB6idtLRQ';
  location: any;
  config: BackgroundGeolocationConfig;
  map: GoogleMap;
  locations:BackgroundGeolocationResponse[];
  static count: number = 0;
  loading:EventEmitter<boolean> = new EventEmitter();

  constructor(private googleMaps: GoogleMaps, public navCtrl: NavController, public navParams: NavParams, private geolocationProvider: BackgroundGeolocation) {

    this.config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 30,
      debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: true, // enable this to clear background location settings when the app terminates
      interval: 1000,
      startForeground: false,
      notificationTitle: 'Localização'
    };

  }

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {

    let element: HTMLElement = document.getElementById('map');
    this.map = this.googleMaps.create(element);
    let log:Log = undefined;

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      // inicializa a Geolocaização
      log = new Log('GEO');
      this.geolocationProvider.configure(this.config).subscribe((location: BackgroundGeolocationResponse) => {
        this.location = location;
        this.putMarker(location);
      });

      this.geolocationProvider.start();
      // Finaliza após um determinado tempo.
      setTimeout(() => {
        this.geolocationProvider.stop();
        log.setEndDate(new Date());
        this.loading.emit(true);
       // this.http.saveLog(log);
        this.loading.emit(false);
      }, 60000 * 5);
    }
    );
  }

  putMarker(location: BackgroundGeolocationResponse) {

    // // create CameraPosition
    // let position: CameraPosition = {
    //   target: {
    //     lat: location.latitude,
    //     lng: location.longitude
    //   },
    //   zoom: 18,
    //   tilt: 30
    // };

    // move the map's camera to position
    // this.map.moveCamera(position);

    // create new marker
    let markerOptions: MarkerOptions = {
      position: {
        lat: location.latitude,
        lng: location.longitude
      },
      title: 'HIBRIDO_POS_' + ++LocalizacaoPage.count

    };
    this.map.addMarker(markerOptions)
      .then((marker: Marker) => {
        marker.showInfoWindow();
      });
  }

}
