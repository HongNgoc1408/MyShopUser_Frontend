import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { routes } from "./routes";
import FooterComponent from "./components/home/FooterComponent";
import HeaderComponent from "./components/home/HeaderComponent";
import SearchComponent from "./components/home/SearchComponent";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const showDrawer = () => {
    setIsDrawerOpen(true);
  };

  const onClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div>
      <Router>
        <HeaderComponent showDrawer={showDrawer} />
        <SearchComponent open={isDrawerOpen} onClose={onClose} />
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.page />}
            />
          ))}
        </Routes>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
