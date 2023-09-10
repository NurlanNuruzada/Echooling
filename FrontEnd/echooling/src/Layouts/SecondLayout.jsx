import React from "react";
import { Outlet } from "react-router-dom";
import Header2 from "../Components/Header/Header2";
export function SecondLayout() {
  return (
    <div>
      <Header2/>
      <Outlet />
    </div>
  );
}
