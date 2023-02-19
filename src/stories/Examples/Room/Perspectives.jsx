/* **********视角************ */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as THREE from "three";
import "./Perspectives.scss";

export default function Perspectives() {
  const [status, setStatus] = useState(false);

  function handleClick() {
    setStatus((prevStats) => !prevStats);
  }

  function checkStatus() {
    return status ? "appear" : "hidden";
  }

  return (
    <div className={Perspectives}>
      <div class="controlbox">
        <button className={checkStatus()}>正面</button>
        <button className={checkStatus()}>背面</button>
        <button className={checkStatus()}>顶面</button>
        <button className={checkStatus()}>地面</button>
        <button className={checkStatus()}>左面</button>
        <button className={checkStatus()}>右面</button>
        <button onClick={handleClick} className={status ? "rotate" : "normal"}>
          +
        </button>
      </div>
    </div>
  );
}
