import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';

const InitialPage: React.FC = () => {

    const navigate = useNavigate();

    useEffect(()=>{
        navigate("/main");
    },[])
  
    return(<><Spin /></>)
};

export default InitialPage;