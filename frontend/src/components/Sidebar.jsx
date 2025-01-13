// src/components/Sidebar.js
import React from 'react';
import '../styles/Sidebar.css'; 

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#clientes">Visualizador de Clientes</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;