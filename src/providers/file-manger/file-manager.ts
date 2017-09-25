import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { File,FileWriterCallback } from '@ionic-native/file';

/*
  Generated class for the FileMangerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FileManagerProvider {

  path:string;
  constructor(private file:File) {
      this.path = this.file.externalApplicationStorageDirectory;
  }

  createFile(name:string,fileWriter:FileWriterCallback){
    this.file.createFile(this.path,name,true).then(response=>{
      response.createWriter(fileWriter,null);
    }).catch(error=>{
      console.log('Erro ao criar arquivo')
      console.log(error)
    });    
  }
}
