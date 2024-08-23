import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import AppProvider from "./context/AppProvider"; 

const App: React.FC = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
};

export default App;
