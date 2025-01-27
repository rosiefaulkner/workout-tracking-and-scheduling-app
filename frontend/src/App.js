import React from 'react';
import AppRoutes from './routes';
import { HeroUIProvider } from "@heroui/react";
import { AppProvider } from './AppContext/AppContext';
import './output.css';


const App = () => {
  return (
    <HeroUIProvider>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </HeroUIProvider>
  );
};

export default App;
