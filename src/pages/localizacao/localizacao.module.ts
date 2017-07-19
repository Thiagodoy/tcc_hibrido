import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocalizacaoPage } from './localizacao';

@NgModule({
  declarations: [
    LocalizacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(LocalizacaoPage),
  ],
  exports: [
    LocalizacaoPage
  ]
})
export class LocalizacaoPageModule {}
