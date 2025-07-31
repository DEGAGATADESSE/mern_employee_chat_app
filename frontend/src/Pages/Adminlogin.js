import React from 'react';
import { useHistory } from 'react-router-dom';
import './admin.css'; // Ensure the CSS file is correctly imported

const Login = () => {
  const history = useHistory();

  const handleAdminClick = () => {
    history.push('/admindash');
  };

  const handleEmployeeClick = () => {
    history.push('/log');
  };

  return (
      <div className="full">
        <button onClick={handleAdminClick}>Admin</button>
        <button onClick={handleEmployeeClick}>Employee</button>
      </div>
  );
};

export default Login;
