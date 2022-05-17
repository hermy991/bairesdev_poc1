import React from "react";
import { useNavigate } from "react-router-dom";


import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { navbarItems } from "./consts/navbarItems";
import { navbarStyles } from "./navbarStyles";


const Navbar = ({ drawerWidth, mobileOpen, handleDrawerToggle }) => {
  const navigate = useNavigate();

  const drawer = (
  <div>
    <Toolbar />
      <Divider />
      <List>
        {navbarItems.map((item) => (
          <ListItem
              button
              key={item.id}
              onClick={() => {handleDrawerToggle(); navigate(item.route);}}>
            
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemButton>

            <ListItemText
              sx={navbarStyles.text}
              primary={item.label}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
  </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}>
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open>
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar