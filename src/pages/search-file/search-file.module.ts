import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchFilePage } from './search-file';

@NgModule({
  declarations: [
    SearchFilePage,
  ],
  imports: [
    IonicPageModule.forChild(SearchFilePage),
  ],
  exports: [
    SearchFilePage
  ]
})
export class SearchFilePageModule {}
