import { Component,EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Log } from '../../providers/sq-lite/log-class';
import { HttpProvider } from '../../providers/http/http';

@IonicPage()
@Component({
  selector: 'page-file',
  templateUrl: 'file.html',
})
export class FilePage {

  loading:EventEmitter<boolean> = new EventEmitter();
  fileTransfer: FileTransferObject;
  fileName:string = '';
  urlUpload:string = '';
  urlDownload:string = '';

  constructor(private file:File, private http:HttpProvider,private transfer:FileTransfer,public navCtrl: NavController, public navParams: NavParams) {
     //this.fileTransfer = this.transfer.create();
  }

  ionViewDidLoad() {
  }

  upload(){
    this.loading.emit(true);
    let log:Log = new Log('UPLOAD');
    let options: FileUploadOptions = {
     fileKey: 'file',
     fileName: '',
     mimeType: this.fileName.indexOf('image') >= 0 ? 'image/jpeg': 'text/plain'
  }

    this.fileTransfer.upload(this.file.externalRootDirectory + this.fileName,this.urlUpload,options).then(response=>{
      log.setEndDate(new Date());
      this.http.saveLog(log);
    });

    this.loading.emit(false);
  }
  download(){

    this.loading.emit(true);
    let log:Log = new Log('DOWNLOAD');
      let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: '',
    }

    this.fileTransfer.download(this.urlDownload,this.file.externalRootDirectory + this.fileName).then(response=>{
      log.setEndDate(new Date());
      this.http.saveLog(log);
    });

    this.loading.emit(false);
  }

}
