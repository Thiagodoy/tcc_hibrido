import { Component, ViewChild,Input } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ContactsPage } from '../pages/contacts/contacts';
import { LocalizacaoPage } from '../pages/localizacao/localizacao';
import { FilePage } from '../pages/file/file';
import { LoadingController,Loading } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;


  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;
  loading:Loading = undefined;


  constructor(private loadingProvider:LoadingController,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.loading = this.loadingProvider.create({content:'Aguarde ...'});
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Contacts', component: ContactsPage },
      { title: 'Localização', component: LocalizacaoPage },
      { title: 'Arquivos', component: FilePage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  loadingToggleStatus(status:boolean){
    status ? this.loading.present() : this.loading.dismiss();
  }
}
