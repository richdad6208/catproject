import { Outlet } from "react-router-dom";
import Header from "../components/Header";
// import { useDispatch } from "react-redux";
// import { inputUser, loggedOut } from "../app/userSlice";
// import { useEffect } from "react";
function Home() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Home;
