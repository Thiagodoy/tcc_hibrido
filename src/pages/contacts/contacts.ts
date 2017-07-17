import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName,ContactFieldType } from '@ionic-native/contacts';
import { Toast } from '@ionic-native/toast';

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

  listContacts:Contact[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private contactProvider:Contacts,
    private toastProvider:Toast) {

  }

  ionViewDidLoad() {
    //    this.contactProvider.find(['displayName', 'name', 'phoneNumbers', 'emails'], {filter: "", multiple: true}).then((response)=>{
    //    this.listContacts = response;
    //    this.toastProvider.showLongCenter('Contatos carregados com sucesso!');
    // }).catch(error=>{
    //   this.toastProvider.showLongCenter('Erro ao carregar os contatos!');
    // });
  }

}
