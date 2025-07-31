import React from 'react';
import { useHistory } from 'react-router-dom';
import './dashboard.css'; // Ensure the CSS file is correctly imported

const Dashboard = () => {
  const history = useHistory();

  const handleAdminClick = () => {
    history.push('/registration');
  };

  const handleEmployeeClick = () => {
    history.push('/view');
  };

  return (
      <div className="full">
        <button onClick={handleAdminClick}>Create new Employe</button>
        <button onClick={handleEmployeeClick}>View Employes</button>
      </div>
  );
};

export default Dashboard;
