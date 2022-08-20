import React from 'react';
import {BrowserRouter,Routes as Switch,Route, Navigate} from "react-router-dom";
import App from './App';
import HospitalRegistration from './Pages/Hospital_Registration/HospitalRegistration';


export default function Routes() {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/" element={<App/>} /> 
            <Route path="/hospital/register" element={<HospitalRegistration />} />
        </Switch>
    </BrowserRouter>
  )
}