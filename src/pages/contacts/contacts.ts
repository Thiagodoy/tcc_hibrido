import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName, ContactFieldType } from '@ionic-native/contacts';
import { Toast } from '@ionic-native/toast';
import { LoadingController,Loading } from 'ionic-angular';
import { SqLiteProvider } from '../../providers/sq-lite/sq-lite';
import { Log } from '../../providers/sq-lite/log-class';

/**
 * Generated class for the ContactsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {

  listContacts: Contact[] = [];
  loading:Loading = undefined;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private contactProvider: Contacts,
    private toastProvider: Toast,
    private loadingProvider:LoadingController,
    private sqliteProvider:SqLiteProvider) {

      this.loading = this.loadingProvider.create({content:'Aguarde ...'});

    // this.toastProvider.show('START','15000','bottom').subscribe((resul)=>{
    //   console.log();
    // });

  }

  ionViewDidLoad() {

  }
  
  visualizarContatos(){

    this.loading.present();
    let log:Log = new Log('CONTATO',new Date().getTime(),0);
    this.contactProvider.find(['displayName', 'name', 'phoneNumbers', 'emails'], { filter: "", multiple: true }).then((response) => {
      this.listContacts = response;
      log.end = new Date().getTime();
      this.sqliteProvider.salvarLog(log);
      this.loading.dismiss();
      this.toastProvider.show('SUCESSO','5000','bottom');
      console.log((log.end - log.start)/1000)
    }).catch(error => {
      this.loading.dismiss();
      this.toastProvider.show('Erro','5000','bottom');     
      
    });
  }

}
