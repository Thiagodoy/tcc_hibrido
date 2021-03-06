import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SqLiteProvider } from '../../providers/sq-lite/sq-lite' 
import { DatePipe } from '@angular/common' 
import { LoadingController,Loading } from 'ionic-angular';
import { File,FileWriterCallback,FileWriter,FileError } from '@ionic-native/file';
import { FileManagerProvider } from '../../providers/file-manger/file-manager';

/**
 * Generated class for the DataBasePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-data-base',
  templateUrl: 'data-base.html',
})
export class DataBasePage {

  running:boolean = false
  quantidade:any;
  insert:boolean = true;
  experimentosL= [];
  experimentosE= [];
  loading:Loading;
  static qtd:number = 0;
  static removeElement:boolean = true;
  static expCurrent:any;
  fileWriter:FileWriter;
  fileWriterCallBack:FileWriterCallback;
  experimentosEscrita:Array<any> =[    
    {
      exp:'y8',
      type: 'escrita',
      qtd:5000
    },
    {
      exp:'y6',
      type: 'escrita',
      qtd:500
    }

  ]

  experimentosLeitura:Array<any>=[
    {
      exp:'y5',
      type: 'leitura',
      qtd:500
    },
    {
      exp:'y7',
      type: 'leitura',
      qtd:5000
    },

  ]

  constructor(private fileManager:FileManagerProvider,private loadingProvider:LoadingController,public navCtrl: NavController, public navParams: NavParams, private sql:SqLiteProvider, private fm:DatePipe) {
    this.loading = this.loadingProvider.create({content:'Aguarde ...',});
      
     this.fileWriterCallBack = (fr:FileWriter)=>{
        this.fileWriter = fr;
        console.log('Writer criado');
    }

    fileManager.createFile('EtapaSqlite.csv',this.fileWriterCallBack);
   
  }

  ionViewDidLoad() {    
  }

  iniciarTesteEscrita(){    
    console.log('teste iniciado')  
    if(!this.fileWriter){
      console.log('Writer is null')
      return;
    }


      if(!this.running){
        this.loading.present();
        this.running = true;
      }     

      DataBasePage.expCurrent = DataBasePage.removeElement ? this.experimentosEscrita.pop() : DataBasePage.expCurrent;
      
      if(!DataBasePage.expCurrent){
        this.gravarLog(this.experimentosE);
        this.loading.dismiss();
        this.running = false;
        ;
        this.iniciarTesteLeitura();
        return
      }     
        

      if(DataBasePage.qtd < 10){
      
        this.quantidade =  DataBasePage.expCurrent.qtd;

        this.sql.teste(parseInt(this.quantidade)).then(resul=>{
          
          resul.exp =  DataBasePage.expCurrent.exp;
          resul.execution = ++DataBasePage.qtd;
          resul.time = (resul.end.getTime() - resul.init.getTime());
          resul.time_init = resul.init.getTime();
          resul.time_end = resul.end.getTime();
          resul.init = this.fm.transform(resul.init,'dd/MM/yyyy hh:mm:ss')
          resul.end = this.fm.transform(resul.end,'dd/MM/yyyy hh:mm:ss')
          resul.qtd =  DataBasePage.expCurrent.qtd; 
          resul.type = DataBasePage.expCurrent.type                    
          this.experimentosE.push(resul);

          this.sql.truncateTable('PERSON').then(()=>{                      
            DataBasePage.removeElement = false;          
            this.iniciarTesteEscrita();               
          }).catch(erro=>{
            console.error(erro);
          }) 


        });
      }else{        
        DataBasePage.qtd = 0;        
        this.sql.truncateTable('PERSON').then(()=>{          
          DataBasePage.removeElement = true;          
          this.iniciarTesteEscrita();             
        }).catch(erro=>{
          console.error(erro);
        })
      }
        
  }

  gravarLog(data:Array<any>){
    this.running = false;
    try {
       
      let log:string = this.insert ? "experimento,execucao,tempo,inicio,fim,time_inicio,time_fim,quantidade,tipo,etapa,plataforma\n":"";     
      
      this.insert = false;

      data.forEach(el=>{                
          log +=  `${el.exp},${el.execution},${el.time},${el.init},${el.end},${el.time_init},${el.time_end},${el.qtd},${el.type},SQLITE,PHONEGAP\n`;
      });
      this.fileWriter.write(log);
    } catch (error) {
     console.error(error);  
    }
  }


  iniciarTesteLeitura(){

    console.log('teste iniciado')  
    if(!this.fileWriter){
      console.log('Writer is null')
      return;
    }


      if(!this.running){
        this.loading.present();
        this.running = true;
      }    

      DataBasePage.expCurrent = DataBasePage.removeElement ? this.experimentosLeitura.pop() : DataBasePage.expCurrent;
      
      if(!DataBasePage.expCurrent){
        this.gravarLog(this.experimentosL);
        this.loading.dismiss();
        return
      }         

      if(DataBasePage.qtd < 10){
      
        this.quantidade =  DataBasePage.expCurrent.qtd;

        this.sql.leitura(parseInt(this.quantidade)).then(resul=>{
          
          resul.exp =  DataBasePage.expCurrent.exp;
          resul.execution = ++DataBasePage.qtd;
          resul.time = (resul.end.getTime() - resul.init.getTime());
          resul.time_init = resul.init.getTime();
          resul.time_end = resul.end.getTime();
          resul.init = this.fm.transform(resul.init,'dd/MM/yyyy hh:mm:ss');
          resul.end = this.fm.transform(resul.end,'dd/MM/yyyy hh:mm:ss');
          resul.qtd =  DataBasePage.expCurrent.qtd; 
          resul.type = DataBasePage.expCurrent.type                    
          this.experimentosL.push(resul);
          DataBasePage.removeElement = false;          
          this.iniciarTesteLeitura();               
         
        });
      }else{        
        DataBasePage.qtd = 0;                 
        DataBasePage.removeElement = true;          
        this.iniciarTesteLeitura();             
        
      }
  }  
}
