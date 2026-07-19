import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./components/common/Toast";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import DefaultRoutes from "./routes/DefaultRoutes";

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
            <DefaultRoutes />
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
