import React, { useEffect, useState } from 'react';
import { Divider, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DataType, ViewDataRedux, Birth } from '../../models';
import style from "./TableDatas.module.scss"
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, AnyAction} from 'redux';
import useBirthDateToAge from '../../hooks/useBirthDateToAge';
import FormAdd from '../../components/Form/FormAdd';
import FormEdit from '../../components/Form/FormEdit';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';


const TableDatas: React.FC = () => {
  //Change language i18next
  const { t }:{t:TFunction} = useTranslation();


  //States
  const [selected, setSelected] = useState<number[]>([]); //selected rows
  const [animation, setAnimation] = useState<boolean>(false); //turn on animation on Button delete
  const [showAdd, setShowAdd] = useState<boolean>(false); //show or hidden add new person form
  const [datas, setDatas] = useState<ViewDataRedux[]>([]); //datas exported to table
  const [edit, setEdit] = useState<number|null>(null); //Edited row key
  const [editDatas, setEditDatas] = useState({}); //Edited datas

  
  //type of state.datas.data
  type DatasState = { 
    datas: {
      data: DataType[];
    };
  };

  //Redux hooks
  //set dispatch and take data from redux store
  const dispatch = useDispatch<Dispatch<AnyAction>>();
  const dataRedux:DataType[] = useSelector((state: DatasState) => state.datas.data)


  //modyfy datas (especially birth date to age) and send to table
  const setBirthToDate: (birth: Birth) => number = useBirthDateToAge(); //hook in folder src/hooks

  let viewDataRedux:ViewDataRedux[] = []
  useEffect(()=>{
    viewDataRedux=[];
    console.log(dataRedux)
    dataRedux.map(e=>(
      viewDataRedux.push({
        key: e.key,
        name: `${e.firstName} ${e.surName}`,
        age: setBirthToDate(e.birth),
        birthDate: `${e.birth.day}-${e.birth.month}-${e.birth.year}`,
        CV: e.CV,
        options: e.key
      })
    ))

    //send data to table
    setDatas(viewDataRedux);
  },[dataRedux])


  //Take datas to edit and send them to state editDatas 
  //Next set state edit as the key of the edited row
  const editActivation = async (dataIndex:number):Promise<void> => {
    await dataRedux.map(e=>(
      (e.key === dataIndex?setEditDatas(e):null)
    ))
    await setEdit(dataIndex)
  }

  
  //Set selected rows
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: ViewDataRedux[]) => {
        //Get delete rows keys
        let newSelected:number[] = []
        selectedRows.map(x=>(
          newSelected.push(x.key)
        ))

        //Turn on animation if there are selected rows
        if(selectedRows.length>selected.length){
          setAnimation(true)
          setTimeout(()=>{setAnimation(false)}, 500)
        }
      setSelected(newSelected);
    },
  };

  //AntDesign Colmns
  const columns: ColumnsType<ViewDataRedux> = [
    {
      title: t("name_col"),
      dataIndex: 'name',
      width: 20 + "%",
      key:'name'
    },
    {
      title: t("age_col"),
      dataIndex: 'age',
      width: 7+"%",
      key:'age'
    },
    {
      title: t("birth_date_col"),
      dataIndex: 'birthDate',
      width: 10+"%",
      key:'birthDate'
    },
    {
      title: t("cv_col"),
      dataIndex: 'CV',
      width: 53 + "%",
      key:'CV',
      ellipsis: true,
      render: (text: string) => <div className={style.cv}>{text}</div>,
    },
    {
      title: t("options_col"),
      dataIndex: 'options',
      width: 10+"%",
      key:'options',
      render: (dataIndex: number) => 
      <div className={style.rowCenter}>
          <div className={style.actionButton} onClick={()=>editActivation(dataIndex)}>{t("edit")}</div>
          <div className={style.actionButton} onClick={()=>{dispatch({type:"delete", selected:[dataIndex]});}}>{t("delete_button")}</div>
      </div>,
    },
  ];

  return (
    <div className={style.container}>
        {/*Add form*/}
        {showAdd?<div className={style.form}><div onClick={()=>setShowAdd(false)} className={style.close}/><FormAdd setShowAdd={setShowAdd}/></div>:<></>}

        {/*Edit form*/}
        {edit!=null?<div className={style.form}><div onClick={()=>setEdit(null)} className={style.close}/><FormEdit defaultEditValues={editDatas} setEdit={setEdit} editedKey={edit}/></div>:<></>}
        <Divider />

        {/*Table*/}
        <Table
        rowSelection={{
          ...rowSelection,
        }}
        columns={columns}
        dataSource={datas}
        className={style.table}
        pagination={{
          pageSizeOptions: ["10", "20", "50"],
          defaultPageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          locale:{
            items_per_page: `${t("number_of_elements")}`,
          }
        }}
        locale={{
          emptyText: t("no_data"), //If table is empty
        }}
        />

        {/*Butttons [add, delete]*/}
        <div className={style.options}>
            {/*Butttons add*/}
            <Button type="primary" onClick={()=>setShowAdd(true)}>{t("add_button")}</Button>

            {/*Butttons delete - disable delete button if selected is empty*/}
            {selected.length>0?
                /*Enable*/
                <Button className={animation?style.animationSelected:""}
                        type="primary" danger
                        onClick={()=>{dispatch({type:"delete", selected:selected}); setSelected([])}}>{t("delete_button")}</Button>:

                /*Disable*/
                <Button disabled>{t("delete_button")}</Button>
            }
        </div>
    </div>
  );
};

export default TableDatas;