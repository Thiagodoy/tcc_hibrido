import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName, ContactFieldType } from '@ionic-native/contacts';
import { Toast } from '@ionic-native/toast';

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

  quantity:any = undefined;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private contactProvider: Contacts,
    private toastProvider: Toast,

    private sqliteProvider:SqLiteProvider) {


  }

  ionViewDidLoad() {

  }

  visualizarContatos(){


    this.contactProvider.find(['displayName', 'name', 'phoneNumbers', 'emails'], { filter: "", multiple: true }).then((response) => {
      this.listContacts = response;

    }).catch(error => {

      this.toastProvider.show('Erro','5000','bottom');
    });
  }

  inserirContatos(){


    let promises = []

    for(let i = 0; i < 2; i++){
      let contato = this.contactProvider.create();
      contato.name = new ContactName(null,'Teste','Teste' + (i+1));
      contato.phoneNumbers = [new ContactField('mobile','16999999999')];
      promises.push(contato.save());
    }

    Promise.all(promises)
    .then(response=>{
      console.log('Contatos Salvo');
      console.log(response);

     // this.sqliteProvider.salvarLog(log);

    }).catch(erro=>{
      console.log('Erro ao salvar Contatos');
      console.log(erro);

    });
  }
}
