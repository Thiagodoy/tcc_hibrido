import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';

/**
 * Generated class for the LocalizacaoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-localizacao',
  templateUrl: 'localizacao.html',
})
export class LocalizacaoPage {


  location: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocationProvider: BackgroundGeolocation) {

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocalizacaoPage');
  }




}
