
export interface DataType {
    key: number;
    firstName:string;
    surName:string;
    birth: {
      day:number;
      month:number;
      year:number;
    };
    CV: string;
    date:Date;
    options: number;
  }

 export interface ViewDataRedux{
    key: number;
    name: string;
    age: number;
    birthDate: string;
    CV: string;
    options: number;
  }
  
  export interface Birth{
    day:number;
    month:number;
    year:number;
  };