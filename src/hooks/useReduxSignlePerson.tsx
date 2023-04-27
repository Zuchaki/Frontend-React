import { IFormInput } from "../components/Form/Types"
import { useSelector } from "react-redux";
import { DataType } from "../models";

type DatasState = { 
    datas: {
      data: DataType[];
    };
  };

const useReduxSignlePerson = (key:number):IFormInput => {
    const selectedData = useSelector((state: DatasState) =>
        state.datas.data.filter((item) => item.key === 3)
    );
    let defaultValues:IFormInput = {
        firstName: '',
        surName: '',
        date:null,
        CV: '',
      }

    return(defaultValues);
}