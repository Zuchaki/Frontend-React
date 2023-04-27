import React from "react"
import {Layout} from 'antd';
import Menu from "../components/Menu/Menu"
import style from "./LayoutComponent.module.scss"


const { Content, Footer } = Layout;

interface Props{
    content:React.ReactNode;
}

const LayoutComponent:React.FC<Props> = ({content}) => {

    return(
    <>
        <Layout className="layout">
            <Menu/>
            <Content className={style.content}>{content}</Content>
        </Layout>
    </>
    )
}

export default LayoutComponent;