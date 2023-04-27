import React from "react";
import Forms from "./Forms";
import {IFormInput, DataToSend} from "./Types";
import { useDispatch } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

interface Props{
  setShowAdd:React.Dispatch<React.SetStateAction<boolean>>
}
const FormAdd:React.FC<Props> = ({setShowAdd}) => {

    //Change language i18next
    const { t }:{t:TFunction} = useTranslation();

    //redux hook dispatch
    const dispatch = useDispatch<Dispatch<AnyAction>>();

    //default values of form add
    const defaultValues:IFormInput = {
        firstName: '',
        surName: '',
        date:null,
        CV: '',
      }
      
      //add action dispatch
      const dispatchAction = async (toSend: DataToSend): Promise<void> => {
        await dispatch({ type: "add", add: toSend });
        await setShowAdd(false); //Trun off form
      };




    return(
        <> 
            <Forms defaultValues={defaultValues} dispatchAction={dispatchAction} buttonMode={false} buttonWord={t("add_button")} title={t("add_form_title")}/>
        </>
    )
}

export default FormAdd;