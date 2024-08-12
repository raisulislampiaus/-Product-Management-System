import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Divider } from '@mui/material';

const sidebarStyle = {
  width: '250px',
  background: '#2c3e50',  // Darker background color
  color: '#ecf0f1',        // Light text color
  padding: '20px',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
};

const listItemStyle = {
  padding: '10px 15px',
};

const linkStyle = {
  color: '#ecf0f1',
  textDecoration: 'none',
  fontSize: '16px',
};

const linkHoverStyle = {
  color: '#3498db',
};

const Sidebar = () => {
  return (
    <div style={sidebarStyle}>
      <h2 style={{ color: '#ecf0f1', margin: '0 0 20px' }}>Admin Dashboard</h2>
      <List>
        <ListItem button style={listItemStyle}>
          <ListItemText>
            <Link to="/" style={linkStyle} onMouseOver={e => e.target.style.color = linkHoverStyle.color} onMouseOut={e => e.target.style.color = linkStyle.color}>
              Dashboard
            </Link>
          </ListItemText>
        </ListItem>
        <ListItem button style={listItemStyle}>
          <ListItemText>
            <Link to="/users" style={linkStyle} onMouseOver={e => e.target.style.color = linkHoverStyle.color} onMouseOut={e => e.target.style.color = linkStyle.color}>
              Users
            </Link>
          </ListItemText>
        </ListItem>
        <ListItem button style={listItemStyle}>
          <ListItemText>
            <Link to="/products" style={linkStyle} onMouseOver={e => e.target.style.color = linkHoverStyle.color} onMouseOut={e => e.target.style.color = linkStyle.color}>
              Products
            </Link>
          </ListItemText>
        </ListItem>
        <ListItem button style={listItemStyle}>
          <ListItemText>
            <Link to="/orders" style={linkStyle} onMouseOver={e => e.target.style.color = linkHoverStyle.color} onMouseOut={e => e.target.style.color = linkStyle.color}>
              Orders
            </Link>
          </ListItemText>
        </ListItem>
      </List>
      
    </div>
  );
};

export default Sidebar;
