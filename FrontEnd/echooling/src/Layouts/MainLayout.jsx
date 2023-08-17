import React from "react";
import { Outlet } from "react-router-dom";
import  Footer  from "../Pages/Footer";
export function MainLayout() {
  return (
    <div>
      <div style={{ backgroundColor: "bisque" ,fontSize:"20px" ,padding:"10px" }}>Header</div>
      <Outlet />
      <Footer />
    </div>
  );
}
