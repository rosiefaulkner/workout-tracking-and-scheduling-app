import React from 'react';
import AppRoutes from './routes';
import { NextUIProvider } from "@nextui-org/react";
import { AppProvider } from './AppContext/AppContext';
import './output.css';


const App = () => {
  return (
    <NextUIProvider>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </NextUIProvider>
  );
};

export default App;
