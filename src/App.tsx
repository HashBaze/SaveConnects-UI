import React from "react";
import AppRoutes from "./AppRoutes";
import AppProvider from "./context/AppProvider"; 

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};

export default App;
