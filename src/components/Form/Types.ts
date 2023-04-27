export interface NewDate{
    day: any;
    month:number;
    year: number;
    
  }
  export interface IFormInput {
    firstName: string;
    surName: string;
    date:any;
    CV: string;
  }
  export interface DataToSend{
    firstName: string;
    surName:string;
    birth:NewDate;
    CV: string;
    date:Date;
  }

  export interface Validate{
    firstName:boolean;
    surName:boolean;
    CV:boolean;
    CVLength:number,
    date:boolean,
    buttonDisable:boolean
  }
