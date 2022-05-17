import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Wrapper } from './Wrapper';
import { CardDescriptor } from './pages/CardDescriptor/CardDescriptor';

const drawerWidth = 240;

export function App() {
  const [mobileOpen, setMobileOpen] = React.useState(true);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const cprops = { drawerWidth, mobileOpen, handleDrawerToggle };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapper {...cprops}/>}>
          <Route path="page-card-descriptor" element={<CardDescriptor {...cprops}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
