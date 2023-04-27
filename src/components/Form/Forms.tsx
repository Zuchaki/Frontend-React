import {Button,DatePicker,Form,Input} from 'antd';
import React, { useEffect, useState } from 'react';
import style from "./Forms.module.scss"
import { useForm, Controller } from "react-hook-form";
import { EmptyObject, SubmitHandler } from 'react-hook-form/dist/types';
import { object, string, date } from 'yup';
import {IFormInput, DataToSend, Validate} from "./Types";
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

const { TextArea } = Input;

interface Props{
  defaultValues:IFormInput;
  dispatchAction: (toSend:DataToSend) => void;
  buttonMode:boolean;
  buttonWord:string;
  title:string;
}

const Forms:React.FC<Props> = ({defaultValues, dispatchAction, buttonMode, buttonWord, title}) => {

    //Change language i18next
    const { t }:{t:TFunction} = useTranslation();
    
    //States
    const [valid, setValid] = useState<Validate>({
      //primary boolen values
      firstName:buttonMode,
      surName:buttonMode,
      CV:true,
      date:buttonMode,

      //Verification length of CV input
      CVLength:0,

      //Button disable or enable
      buttonDisable:buttonMode
    })

  
    //Yup validation parameters - using import { object, string, date } from 'yup';
    let userSchema = object<IFormInput>({
      firstName: string().required(),
      surName: string().required(),
      date:date().default(() => new Date()),
      CV: string().max(250),
    })

    
    const { control, handleSubmit, formState: { isValid } } = useForm<IFormInput>({
      defaultValues: defaultValues //Props
    });

    //Sending datas
    const onSubmit: SubmitHandler<IFormInput> = async (data:IFormInput) => {
      //Extra technikal validation by yup
      try{
        const res:IFormInput|EmptyObject = await userSchema.validate(await data);

        //Clarifying data and conect 
        const newDate:Date = await new Date(res.date)
        const toSend:DataToSend = await {
          firstName: res.firstName,
          surName: res.surName,
          birth:{ //Date to view in table
            day:newDate.getDate(),
            month:newDate.getMonth()+1,
            year:newDate.getFullYear()
          },
          CV: res.CV,
          date:data.date  //date as JSdate
        }

        //send data to store
        await dispatchAction(toSend); //Props
      }
      catch(error:any) {
        //catch errors
        console.log(error)
      }
    }

    //Visual validation
              //Function to return boolean validate in firstName and surName there are only leters not number
              const validateInput = (input:string):boolean => {
                    const lettersAndHyphenRegex = /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż-]+$/
                    return lettersAndHyphenRegex.test(input);
                  }

              //Validate: firstName, surName, CV
              const onChange = (value:any):void => {
                let newValid:Validate = valid;

                if(value.target.name=="firstName" && value.target.value.length===0){newValid = {...newValid, firstName:false}}
                if(value.target.name=="firstName" && value.target.value.length>0){newValid = {...newValid, firstName:true}}


                if(value.target.name==="surName"&&value.target.value.length===0){newValid = {...newValid, surName:false}}
                if(value.target.name==="surName"&&value.target.value.length>0){newValid = {...newValid, surName:true}}

                if(value.target.name==="CV"&&value.target.value.length>250){newValid = {...newValid, CV:false}}
                if(value.target.name==="CV"&&value.target.value.length<250){newValid = {...newValid, CV:true}}

                if(value.target.name==="CV"){newValid = {...newValid, CVLength:value.target.value.length}}

                if(value.target.name=="firstName" && validateInput(value.target.value)===false){newValid = {...newValid, firstName:false}}
                if(value.target.name=="firstName" && validateInput(value.target.value)===true){newValid = {...newValid, firstName:true}}

                if(value.target.name=="surName" && validateInput(value.target.value)===false){newValid = {...newValid, surName:false}}
                if(value.target.name=="surName" && validateInput(value.target.value)===true){newValid = {...newValid, surName:true}}

                setValid(newValid);
                console.log(isValid);
              }

              //Validate: date
              const handleDate = (e:any):void =>{
                let newValid:Validate = valid;

                if(e.$d && typeof(e.$d)==='object'){
                  newValid = {...newValid, date:true}
                }else{
                  newValid = {...newValid, date:false}
                }
                setValid(newValid);
              }

              //Enable or disable button add
              useEffect(()=>{
                if(
                  valid.firstName===true&&
                  valid.surName===true&&
                  valid.CVLength<=250&&
                  valid.date===true){
                    let newValid:Validate = valid;
                    newValid = {...newValid, buttonDisable:true}
                    setValid(newValid);
                }else{
                    let newValid:Validate = valid;
                    newValid = {...newValid, buttonDisable:false}
                    setValid(newValid);
                }},[valid.firstName, valid.surName, valid.CVLength, valid.date])
              

    
    return(
        <>
          <div className={style.title}>{title}</div>

          <form onSubmit={handleSubmit(onSubmit)} onChange={onChange}>
            <Form
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 24 }}
              layout="vertical"
              style={{ maxWidth: 900 }}>

              {/*Name*/}
              <Form.Item 
                label={t("name")}
                hasFeedback
                validateStatus={valid.firstName?"success":""}>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => <Input {...field}/>}/></Form.Item>
              
              {/*Surname*/}
              <Form.Item
                label={t("surname")}
                hasFeedback
                validateStatus={valid.surName?"success":""} 
                name="surname">
                <Controller
                  name="surName"
                  control={control}
                  render={({ field }) => <Input {...field}/>}/></Form.Item>

              {/*Birth date*/}
              <Form.Item 
                label={t("birth_date")}
                hasFeedback
                name="date"
                validateStatus={valid.date?"success":""}>
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <DatePicker {...field}  placeholder={`${t("select_date")}`} onChange={e => {field.onChange(e); handleDate(e)}}/>
                  )}/></Form.Item>

              {/*CV*/}
              <Form.Item 
                label={`${t("cv")} ${valid.CVLength}/250`}
                name="CV"
                validateStatus={valid.CV?"success":"error"}  
                hasFeedback  
                >
                <Controller
                  name="CV"
                  control={control}
                  render={({ field }) =><TextArea rows={7} {...field}/>}/></Form.Item>


            </Form>
            {/*Button*/}
            {valid.buttonDisable?<Button type="primary" htmlType="submit">{buttonWord}</Button>:<Button disabled>{buttonWord}</Button>}
          </form>
        </>
    )
}
export default Forms;