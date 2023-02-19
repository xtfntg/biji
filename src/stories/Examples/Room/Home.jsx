import React from "react";
/* import "./styles.css"; */
import "./Home.scss";
import MeshList from "./MeshList";
import Perspectives from "./Perspectives";
import ShoppingCart from "./ShoppingCart";
import Nav from "./Nav";
import styled from "styled-components";
//import LoadingPage from "./LoadingPage";

export default function Home() {
  return (
    <div className="Home">
      <Nav />
      <MeshList />
      <ShoppingCart />
      {/*  <Perspectives /> */}
      {/* <LoadingPage /> */}
    </div>
  );
}
