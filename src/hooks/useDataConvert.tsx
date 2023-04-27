import React from 'react';
import { DataType, ViewDataRedux, Birth } from "../models";
import { useSelector } from "react-redux";
import useBirthDateToAge from './useBirthDateToAge';

const useDataConvert = () => {
    type DatasState = { 
        datas: {
          data: DataType[];
        };
      };

    const dataRedux:DataType[] = useSelector((state: DatasState) => state.datas.data)

    const dataToTable = () => {
        const setBirthToDate: (birth: Birth) => number = useBirthDateToAge(); //hook in folder src/hooks
        let viewDataRedux:ViewDataRedux[] = []
        viewDataRedux=[];

        dataRedux.map(e=>(
            viewDataRedux.push({
                key: e.key,
                name: `${e.firstName} ${e.surName}`,
                age: setBirthToDate(e.birth),
                birthDate: `${e.birth.day}.${e.birth.month}.${e.birth.year}`,
                CV: e.CV,
                options: e.key
            })
        ))
        return viewDataRedux;
    }
    return[dataToTable]
}

export default useDataConvert;