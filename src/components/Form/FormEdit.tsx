import React from "react";
import Forms from "./Forms";
import {IFormInput, DataToSend} from "./Types";
import { useDispatch } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { DataType} from '../../models';
import { EmptyObject } from 'react-hook-form/dist/types';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

interface Props{
  defaultEditValues:DataType|EmptyObject;
  editedKey: number;
  setEdit:React.Dispatch<React.SetStateAction<number | null>>;
}

const FormEdit:React.FC<Props> = ({defaultEditValues, editedKey, setEdit}) => {

    //Change language i18next
    const { t }:{t:TFunction} = useTranslation();

    //redux hook dispatch
    const dispatch = useDispatch<Dispatch<AnyAction>>();

    //default values of form edit
    const defaultValues: IFormInput = {
        firstName: defaultEditValues.firstName,
        surName: defaultEditValues.surName,
        date: defaultEditValues.date,
        CV: defaultEditValues.CV,
    };

    //edit action dispatch
    const dispatchAction = async (toSend:DataToSend): Promise<void> =>{
        await dispatch({type:"edit", edit:toSend, key:editedKey})
        await setEdit(null) //Trun off form
    };

    return(
        <> 
            <Forms defaultValues={defaultValues} dispatchAction={dispatchAction} buttonMode={true} buttonWord={t("edit")} title={t("edit_form_title")}/>
        </>
    )
}

export default FormEdit;