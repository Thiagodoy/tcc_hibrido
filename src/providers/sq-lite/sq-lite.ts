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

private db:SQLiteObject
  constructor(private sqlite: SQLite) {
    console.log('Hello SqLiteProvider Provider');

    this.sqlite.create({
      name: 'teste_tcc.db3',
    //  location: 'default'
    })
      .then((db: SQLiteObject) => {

        this.db = db;
        this.db.executeSql('create table t_log(processo VARCHAR(32),start INTEGER,end INTEGER)', {})
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }

  salvarLog(log:Log){
    let query = `insert into t_log(processo,start,end)VALUES('${log.processo}',${log.start},${log.end})`;

    this.db.executeSql(query,{}).then(()=>console.log('Log salvo com sucesso!')).catch((error)=>{
      console.log('Erro -sqlite');
      console.log(error);
    })
  }

}
