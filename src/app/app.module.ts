import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, } from '@angular/core';
import { Http } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ContactsPage } from '../pages/contacts/contacts';
import { LocalizacaoPage } from '../pages/localizacao/localizacao';
import { DataBasePage } from '../pages/data-base/data-base';
import { FilePage } from '../pages/file/file';
import { BarcodePage } from '../pages/barcode/barcode';
import { SearchFilePage } from '../pages/search-file/search-file';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Contacts } from '@ionic-native/contacts';
import { Toast } from '@ionic-native/toast';
import { SqLiteProvider } from '../providers/sq-lite/sq-lite';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';

import { HttpProvider } from '../providers/http/http';
import { DatePipe } from '@angular/common' 
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { FileManagerProvider } from '../providers/file-manger/file-manager';
//import { FileTransfer} from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
//import { Camera, CameraOptions } from '@ionic-native/camera';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ContactsPage,
    LocalizacaoPage,
    FilePage,
    DataBasePage,
    BarcodePage,
    SearchFilePage
    
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
    FilePage,
    DataBasePage,
    BarcodePage,
    SearchFilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Contacts,
    Toast,
    BackgroundGeolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SqLiteProvider,SQLite,GoogleMaps,Http,
    HttpProvider,
    File,    
    DatePipe,
    AndroidPermissions,
    FileManagerProvider,
    BarcodeScanner
  ]
})
export class AppModule {}
