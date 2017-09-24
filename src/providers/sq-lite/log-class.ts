export class Log {
    plataforma:string;
    module:string;
    start_date:string;
    end_date:string;
    start_battery:string;
    end_battery:string;

    constructor(module:string){
      this.plataforma = 'HIBRIDO';
      this.start_date = this.generateDateSql(new Date());
      this.module = module;
    }

    private generateDateSql(date:Date){
      return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`
    }

    setEndDate(date:Date){
      this.end_date = this.generateDateSql(date);
    }
}
