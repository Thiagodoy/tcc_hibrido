import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner,BarcodeScanResult,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import {Experimento} from '../../class/experimento';
import { DatePipe } from '@angular/common' 
import { FileManagerProvider } from '../../providers/file-manger/file-manager';
import { File,FileWriterCallback,FileWriter,FileError } from '@ionic-native/file';
import { LoadingController,Loading } from 'ionic-angular';

/**
 * Generated class for the BarcodePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-barcode',
  templateUrl: 'barcode.html',
})
export class BarcodePage {

  static count:number = 10;   
  static index:number = 0;
  static init:boolean = true;
  array10:Array<String>;
  array50:Array<String>;
  experimentos:Array<Experimento> = new Array();
  static currentExperimento:Experimento = undefined;
  fileWriter:FileWriter;
  fileWriterCallBack:FileWriterCallback;
  loading:Loading;
  running:boolean = false;

  constructor(private fileManager:FileManagerProvider,private loadingProvider:LoadingController, private barcode:BarcodeScanner,public navCtrl: NavController, public navParams: NavParams, private fm:DatePipe) {

    this.loading = this.loadingProvider.create({content:'Aguarde ...',});
    
    
    
         this.fileWriterCallBack = (fr:FileWriter)=>{
          this.fileWriter = fr;
          console.log('Writer criado');
         }

         fileManager.createFile('EtapaBarcodeHibrido.csv',this.fileWriterCallBack);
    

  }

  ionViewDidLoad() {
    this.inicializarTeste100();    
  }



  inicializarTeste10(){
  
   

    if(BarcodePage.init){ 
      console.time("BARCODE - " + BarcodePage.count );    
      BarcodePage.currentExperimento = new Experimento();
      BarcodePage.currentExperimento.execution = BarcodePage.count;
      BarcodePage.currentExperimento.exp = 'y1';
      BarcodePage.currentExperimento.qtd = 10;
      BarcodePage.currentExperimento.time_init = new Date().getTime();
      BarcodePage.currentExperimento.init = this.fm.transform(new Date(),'dd/MM/yyyy hh:mm:ss');
      BarcodePage.currentExperimento.type ='barcode-128';
      BarcodePage.init = false;
    }

    if(BarcodePage.count == 0){
      BarcodePage.init = true;
      BarcodePage.count = 10;
      this.inicializarTeste100()  
      return;
    }   
    

    let options: BarcodeScannerOptions = {};      
    options.disableSuccessBeep = true;
    options.resultDisplayDuration = 500;
    options.formats = 'CODE_128';
         
     this.barcode.scan(options).then((response:BarcodeScanResult)=>{     
      
     
     
      BarcodePage.index++;

       if(BarcodePage.index == 10){
        console.timeEnd("BARCODE - " + BarcodePage.count );
         BarcodePage.index = 0;
         BarcodePage.count--;         
         BarcodePage.currentExperimento.time_end = new Date().getTime();
         BarcodePage.currentExperimento.end = this.fm.transform(new Date(),'dd/MM/yyyy hh:mm:ss');
         BarcodePage.currentExperimento.time = BarcodePage.currentExperimento.time_end - BarcodePage.currentExperimento.time_init;
         this.experimentos.push(BarcodePage.currentExperimento);
         BarcodePage.init = true;
         this.inicializarTeste10();
       }else{
        this.inicializarTeste10();
       } 

      
    }).catch((erro)=>console.log(erro));


  }


  inicializarTeste100(){  


    if(BarcodePage.init){ 
      console.time("BARCODE - " + BarcodePage.count );    
      BarcodePage.currentExperimento = new Experimento();
      BarcodePage.currentExperimento.execution = BarcodePage.count;
      BarcodePage.currentExperimento.exp = 'y2';
      BarcodePage.currentExperimento.qtd = 50;
      BarcodePage.currentExperimento.time_init = new Date().getTime();
      BarcodePage.currentExperimento.init = this.fm.transform(new Date(),'dd/MM/yyyy hh:mm:ss');
      BarcodePage.currentExperimento.type ='barcode-128';
      BarcodePage.init = false;
    }

    if(BarcodePage.count == 0){
      //BarcodePage.init = true;
     // BarcodePage.count = 10;
      this.gravarlog();        
      return;
    }   
    

    let options: BarcodeScannerOptions = {};      
    options.disableSuccessBeep = true; 
    options.resultDisplayDuration = 700;  
    options.formats = 'CODE_128';  
    
    this.barcode.scan(options).then((response:BarcodeScanResult)=>{     
      
    
      BarcodePage.index++;

       if(BarcodePage.index == 50){
        console.timeEnd("BARCODE - " + BarcodePage.count );
         BarcodePage.index = 0;
         BarcodePage.count--;         
         BarcodePage.currentExperimento.time_end = new Date().getTime();
         BarcodePage.currentExperimento.end = this.fm.transform(new Date(),'dd/MM/yyyy hh:mm:ss');
         BarcodePage.currentExperimento.time = BarcodePage.currentExperimento.time_end - BarcodePage.currentExperimento.time_init;
         this.experimentos.push(BarcodePage.currentExperimento);
         BarcodePage.init = true;
         this.inicializarTeste100();
       }else{
        this.inicializarTeste100();
       } 

      
    }).catch((erro)=>console.log(erro));


  }
  gravarlog(){
    
    console.log('Gerando log');
    console.table(this.experimentos);
    try {
      
     let log:string = "experimento,execucao,tempo,inicio,fim,time_inicio,time_fim,quantidade,tipo,etapa,plataforma\n";      
     

     this.experimentos.forEach((el:Experimento)=>{                
         log +=  `${el.exp},${el.execution},${el.time},${el.init},${el.end},${el.time_init},${el.time_end},${el.qtd},${el.type},BARCODE,PHONEGAP\n`;
     });
     this.fileWriter.write(log);     
   } catch (error) {
    console.error(error);  
   }
  }

}
