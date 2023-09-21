import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Slide from "../components/Slide/Slide";

function Home() {
  return (
    <>
      <Header />
      <Outlet />
      <Slide />
    </>
  );
}

export default Home;
