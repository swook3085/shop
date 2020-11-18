import React from 'react';
import Home from './Home';
import {AdminHeader, AdminMenu} from '../../../../Components';
import '../Layout/layout.css';

const AdminMain = ({match}) => {
  var path = match.params.id;
  return (
    <>
    <AdminHeader/>
    <div id='container'>
      <AdminMenu/>
      <Home path={path}/>
    </div>
    </>
  )
}
export default AdminMain;