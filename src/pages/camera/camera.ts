import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the CameraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {

  //options: CameraOptions = undefined;
  base64Image:string;
  constructor( public navCtrl: NavController, public navParams: NavParams) {

    // this.options = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE
    // }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }
  makePhoto() {
    // this.camera.getPicture(this.options).then((imageData) => {
    //   this.base64Image = 'data:image/jpeg;base64,' + imageData;
    // }, (err) => {

    // });
  }
}
