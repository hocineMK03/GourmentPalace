import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import NavbarFunc from './childs/landingpage/navbar';
import AdminBody from './childs/adminpage/adminbody';
import Footer from './childs/landingpage/footer';
const AdminManagement = () => {

  return (
    <div>
      <NavbarFunc />
      <AdminBody/>
    </div>
  )
}

export default AdminManagement
