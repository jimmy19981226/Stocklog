import { useState } from "react";
import Registration from "./Registration";
import Login from "./Login";
import StockPage from "./StockPage";
import ProfilePage from "./ProfilePage";

export default function App() {
  return (
    <div>
      <Registration />
      {/* Uncomment the below lines one by one to test other components */}
      {/* <Login /> */}
      {/* <StockPage /> */}
      {/* <ProfilePage /> */}
    </div>
  );
}
