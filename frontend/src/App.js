import React from 'react';
import AppRoutes from '../src/routes';
import { NextUIProvider } from "@nextui-org/react";
import './output.css';


const App = () => {
  return (
    <NextUIProvider>
      <AppRoutes />
    </NextUIProvider>
  );
};

export default App;
