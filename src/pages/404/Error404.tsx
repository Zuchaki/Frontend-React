import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

const Error404: React.FC = () => {
  
  //Change language i18next
  const { t }:{t:TFunction} = useTranslation();

  return(
  <Result
    status="404"
    title="404"
    subTitle={t("404_message")}
    extra={<Button type="primary"><Link to="/main" style={{textDecoration:"none"}}>{t("404_button")}</Link></Button>}
  />)
};

export default Error404;