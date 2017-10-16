import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { C } from '../../app/c';
import {Experimento} from '../../class/experimento';
import { DatePipe } from '@angular/common' 
import { FileManagerProvider } from '../../providers/file-manger/file-manager';
import { File,FileWriterCallback,FileWriter,FileError } from '@ionic-native/file';
import { LoadingController,Loading } from 'ionic-angular';



/**
 * Generated class for the SearchFilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search-file',
  templateUrl: 'search-file.html',
})
export class SearchFilePage {

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

  constructor(private loadingProvider:LoadingController,private fileManager:FileManagerProvider,private file:File,public navCtrl: NavController, public navParams: NavParams,private fm:DatePipe) {
     this.array10 = C.palavras10;
     this.array50 = C.getPalavras50;
     this.loading = this.loadingProvider.create({content:'Aguarde ...',});



     this.fileWriterCallBack = (fr:FileWriter)=>{
      this.fileWriter = fr;
      console.log('Writer criado');
  }

  fileManager.createFile('EtapaSearchFile.csv',this.fileWriterCallBack);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchFilePage');
  }

  initTest10(index:number=0){

    if(!this.running){
      this.loading.present();
      this.running = false;
    }

    let word:String =  this.array10[index];
    let file = word.substr(0,1).toUpperCase() + '.txt';


    if(SearchFilePage.init){ 
          
      SearchFilePage.currentExperimento = new Experimento();
      SearchFilePage.currentExperimento.execution = SearchFilePage.count;
      SearchFilePage.currentExperimento.exp = 'y1';
      SearchFilePage.currentExperimento.qtd = 10;
      SearchFilePage.currentExperimento.time_init = new Date().getTime();
      SearchFilePage.currentExperimento.init = this.fm.transform(new Date(),'dd/MM/yyyy hh:mm:ss');
      SearchFilePage.currentExperimento.type ='';
      SearchFilePage.init = false;
    }

    if(SearchFilePage.count == 0){
      SearchFilePage.init = true;
      SearchFilePage.count = 10;
     this.initTest100()
      console.log('finalizando experimento 1 ')    
      return;
    }   
    

    this.file.readAsText(this.file.applicationDirectory,file).then((conteudo)=>{      
      
      let regex = new RegExp('^\\r?\\n(?:.+\\r?\\n)*.*\\b\\\\*?\s?\\\\*'+word+'\\\\*\\b.*\\r?\\n(?:.+\\r?\\n)*(?=\\r?\\n)','gm');      
      let ok = regex.test(conteudo)
      
                 if(!ok)
                 console.log(word)
    
      SearchFilePage.index++;

       if(SearchFilePage.index == this.array10.length){
         
         SearchFilePage.index = 0;
         SearchFilePage.count--;         
         SearchFilePage.currentExperimento.time_end = new Date().getTime();
         SearchFilePage.currentExperimento.end = this.fm.transform(new Date(),'dd/MM/yyyy hh:mm:ss');
         SearchFilePage.currentExperimento.time = SearchFilePage.currentExperimento.time_end - SearchFilePage.currentExperimento.time_init;
         this.experimentos.push(SearchFilePage.currentExperimento);
         SearchFilePage.init = true;
         this.initTest10();
       }else{
        this.initTest10(SearchFilePage.index);
       } 

      
    }).catch((erro)=>console.log(erro));
      
  }

  initTest100(index:number=0){
    

    if(!this.running){
      this.loading.present();
      this.running = false;
    }

    
      try{
        let word:String =  this.array50[index];
        let file = word.substr(0,1).toUpperCase() + '.txt';
    
    
        if(SearchFilePage.init){      
          SearchFilePage.currentExperimento = new Experimento();
          SearchFilePage.currentExperimento.execution = SearchFilePage.count;
          SearchFilePage.currentExperimento.exp = 'y4';
          SearchFilePage.currentExperimento.qtd = 100;
          SearchFilePage.currentExperimento.time_init = new Date().getTime();
          SearchFilePage.currentExperimento.init = this.fm.transform(new Date(),'dd/MM/yyyy hh:mm:ss');
          SearchFilePage.currentExperimento.type ='';
          SearchFilePage.init = false
        }
    
        if(SearchFilePage.count == 0){
          this.gravarlog();
          this.loading.dismiss();
          console.log('finalizando experimento 2 ')
          
          return;
        }   
        
    
        this.file.readAsText(this.file.applicationDirectory,file).then((conteudo)=>{      
          
          let regex = new RegExp('^\\r?\\n(?:.+\\r?\\n)*.*\\b\\\\*?\s?\\\\*'+word+'\\\\*\\b.*\\r?\\n(?:.+\\r?\\n)*(?=\\r?\\n)','gm');      
          let ok = regex.test(conteudo)
          
                     if(ok)
                      console.log(word);
        
          SearchFilePage.index++;
    
           if(SearchFilePage.index == this.array50.length){    
             SearchFilePage.index = 0;
             SearchFilePage.count--;             
             SearchFilePage.currentExperimento.time_end = new Date().getTime();
             SearchFilePage.currentExperimento.end = this.fm.transform(new Date(),'dd/MM/yyyy hh:mm:ss');
             SearchFilePage.currentExperimento.time = SearchFilePage.currentExperimento.time_end - SearchFilePage.currentExperimento.time_init;
             this.experimentos.push(SearchFilePage.currentExperimento);
             SearchFilePage.init = true;
             this.initTest100();
           }else{
            this.initTest100(SearchFilePage.index);
           } 
    
          
        }).catch((erro)=>console.log(erro));
      }catch(e){
        console.log(e);
      }
          
      }

      gravarlog(){
        
        console.log('Gerando log')
        debugger;
        try {
          
         let log:string = "experimento,execucao,tempo,inicio,fim,time_inicio,time_fim,quantidade,tipo,etapa,plataforma\n";      
         
   
         this.experimentos.forEach((el:Experimento)=>{                
             log +=  `${el.exp},${el.execution},${el.time},${el.init},${el.end},${el.time_init},${el.time_end},${el.qtd},${el.type},SEARCHFILE,PHONEGAP\n`;
         });
         this.fileWriter.write(log);
       } catch (error) {
        console.error(error);  
       }
      }
}
