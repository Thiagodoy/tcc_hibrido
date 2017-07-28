import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, } from '@angular/core';
import { Http } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ContactsPage } from '../pages/contacts/contacts';
import { LocalizacaoPage } from '../pages/localizacao/localizacao';
import { FilePage } from '../pages/file/file';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Contacts } from '@ionic-native/contacts';
import { Toast } from '@ionic-native/toast';
import { SqLiteProvider } from '../providers/sq-lite/sq-lite';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';

import { HttpProvider } from '../providers/http/http';
import { FileTransfer} from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
//import { Camera, CameraOptions } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ContactsPage,
    LocalizacaoPage,
    FilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ContactsPage,
    LocalizacaoPage,
    FilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Contacts,
    Toast,
    BackgroundGeolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SqLiteProvider,SQLite,GoogleMaps,Http,
    HttpProvider,File,FileTransfer//Camera
  ]
})
export class AppModule {}
