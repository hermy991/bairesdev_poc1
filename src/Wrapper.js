import React from 'react';
import { Outlet } from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Grid from '@mui/material/Grid';

export function Wrapper({ mobileOpen, handleDrawerToggle }) {
  return (
    <Grid container>
      <Navbar {...{ mobileOpen, handleDrawerToggle }}/>
      <Outlet />
    </Grid>
  );
}

export default Wrapper;
