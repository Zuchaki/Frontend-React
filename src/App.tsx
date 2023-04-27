import React, {useEffect} from 'react';
import './App.css';
import LayoutComponent from './LayoutComponent/LayoutComponent';
import {BrowserRouter as Router, Link, Route, Routes, useNavigate, useParams} from 'react-router-dom';
import TableDatas from './pages/Table/TableDatas';
import Error404 from './pages/404/Error404';
import InitialPage from './pages/InitialPage/InitialPage';
import Views from './pages/Views/Views';
import { useTranslation } from 'react-i18next';
import { TFunction, changeLanguage } from 'i18next';

const content = (
  <div>
    <Routes>
      <Route path="*" element={<Error404/>}/>
      <Route path="/" element={<InitialPage/>}/>
      <Route path="/main" element={<TableDatas/>}/>
      <Route path="/views" element={<Views/>}/>
    </Routes>
  </div>
)

const  App:React.FC = () => {
  const { t }:{t:TFunction} = useTranslation();
  return (
    <Router>
      <div className="App">
        <LayoutComponent content={content}/>
      </div>
    </Router>
  );
}

export default App;
