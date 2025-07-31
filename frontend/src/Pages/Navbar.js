import React from 'react';
import { Link } from 'react-router-dom';
import { Text } from "@chakra-ui/react";
import Footer from "../Pages/Footer";
import logo from '../MiNT.jpg';
import './nav2.css';

function Navbar() {
  return (
    <div className="page-container">
      <div className='navbar'>
        <div className="leftSide">
          <img src={logo} alt="MiNT Logo" />
        </div>
        <div className="rightSide">
          <Link  className="right" to="/">HOME</Link>
          <Link className="right"  to="/admin">LOGIN</Link>
        </div>
      </div>
      <Text fontSize="xl">
        <h1 className='text'>  WELCOME TO MINISTRY OF INNOVATION AND TECHNOLOGY EMPLOYEE ROOM CHAT MANAGEMENT SYSTEM</h1>
      </Text>
      <Footer />
    </div>
  );
}
export default Navbar;
