import React, {useEffect, useState} from "react";
import style from "./Views.module.scss"
import { Col, Row } from 'antd';
import useBirthDateToAge from "../../hooks/useBirthDateToAge";
import { ViewDataRedux, DataType, Birth } from "../../models";
import { useSelector } from "react-redux";
import ViewsBox from "../../components/SingleView/SingleView";

const Views:React.FC = () => {

    //States
    const [datas, setDatas] = useState<ViewDataRedux[]>([])


    //type of state.datas.data
    type DatasState = { 
        datas: {
        data: DataType[];
        };
    };

    //Redux hooks
    //set dispatch and take data from redux store
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

    //send data to view
    setDatas(viewDataRedux);
    },[dataRedux])

    return(
        <>
            <div className={style.container}>
            <Row className={style.row}>
                {datas.map(x => (
                <Col span={6} className={style.item}>
                    <ViewsBox name={x.name} age={x.age} birth={x.birthDate} cv={x.CV}/>
                </Col>
                ))}
            </Row>
            </div>
        </>
    )

}

export default Views