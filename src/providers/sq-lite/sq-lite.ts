import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Log } from './log-class';

/*
  Generated class for the SqLiteProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SqLiteProvider {

  private db: SQLiteObject
  constructor(private sqlite: SQLite) {
    console.log('Hello SqLiteProvider Provider');

    this.sqlite.create({
      name: 'tcc_teste.db3',
      location: 'default',
      createFromLocation: 1
    })
      .then((db: SQLiteObject) => {

        this.db = db;



        this.db.executeSql('create table person(name VARCHAR(99),last_name VARCHAR(99),age INTEGER)', {})
          .then(() => {          
            this.initDataLeitura(db);
            console.log('Executed SQL')})
          .catch(e => {
            
            this.initDataLeitura(db); 
            console.log(e)});
      })
      .catch(e => console.log(e));
  }

  salvarLog(log: Log) {
    // let query = `insert into t_log(processo,start,end)VALUES('${log.processo}',${log.start},${log.end})`;

    // this.db.executeSql(query,{}).then(()=>console.log('Log salvo com sucesso!')).catch((error)=>{
    //   console.log('Erro -sqlite');
    //   console.log(error);
    // })
  }
  truncateTable(table: string): Promise<any> {
    return this.db.executeSql(`DELETE FROM ${table};`, {})
  }
  teste(count: number): Promise<any> {

    let promises = new Array<any>();
    let init = new Date();
    let end = undefined;
    let error = undefined;

    while (count >= 0) {          
      promises.push(this.db.executeSql('INSERT INTO PERSON VALUES (?,?,?)', ['LOREM' + count, 'LOREM' + count, count]));
      --count;
    }
    return Promise.all(promises).then(response=>{      
      end = new Date();
      return { init, end, error }
    }).catch(e=>{
      error = e;
      end = new Date();
      return { init, end, error }
    });
  }

  leitura(dtq): Promise<any> {
    let count = dtq;
    let init = new Date();
    let end = undefined;
    let error = undefined;  
    
      if (dtq == 500) {
        return this.db.executeSql(`select * from person limit ${dtq};`, {}).then(() => {
          end = new Date();
          return { init, end, error }
        }).catch((e) => {
          error = e;
          end = new Date();
          return { init, end, error }
        })
      } else {
        return this.db.executeSql(`select * from person limit ${dtq};`, {}).then(() => {
          end = new Date();
          return { init, end, error }
        }).catch((e) => {
          error = e;
          end = new Date();
          return { init, end, error }
        })
      }
    
  }

  initDataLeitura(db:SQLiteObject):Promise<any>{
    debugger;

    let promises = []
    let init = new Date();
    let end = undefined;
    let error = undefined;
    let count = 5000

    while (count >= 0) {
      let query = `insert into person(name,last_name,age)VALUES('${'Lorem ' + count}','${'Lorem ' + count}',${count})`;
      promises.push(db.executeSql(query, {}));
      count--;
    }

    return Promise.all(promises).then(() => {
      end = new Date();
      return { init, end, error }
    }).catch((e) => {
      error = e;
      end = new Date();
      return { init, end, error }
    });
  }
}
