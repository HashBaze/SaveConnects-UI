import React from "react";
import AppRoutes from "./AppRoutes";
import AppProvider from "./context/AppProvider";
import "aos/dist/aos.css";

const App: React.FC = () => {

  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};

export default App;
