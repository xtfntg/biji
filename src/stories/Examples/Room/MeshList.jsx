/* **********模型列表************ */
import React, { useState } from "react";
import "./MeshList.scss";
import meshData from "./mesh.json";
/* 
const mesh = require("/public/mesh.json");
console.log(mesh); */

export default function MeshList() {
  const [toggleState, setToggleState] = useState(1);
  const [show, setShow] = useState(false);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  const meshDesks = meshData.desks;
  const meshWindows = meshData.windows;
  const meshChair = meshData.chair;
  const meshPictures = meshData.pictures;
  return (
    <div className="MeshList">
      <div className="containerBox">
        <div className="leftbox">
          <button class="B1" onClick={() => toggleTab(1)}></button>
          <button class="B2" onClick={() => toggleTab(2)}></button>
          <button class="B3" onClick={() => toggleTab(3)}></button>
          <button class="B4" onClick={() => toggleTab(4)}></button>
        </div>

        <div className="rightbox">
          {meshDesks.map((movie, index) => {
            return (
              <>
                <ul
                  className={
                    toggleState === 1 ? "content active-content " : "content "
                  }
                >
                  <h3>{movie.type}</h3>
                  <img src={movie.image} alt={movie.name} />
                  <li>
                    <h4>{movie.name}</h4>
                    <p>{movie.title}</p>
                    <span>{movie.describe}</span>
                  </li>
                </ul>
              </>
            );
          })}

          {meshWindows.map((movie, index) => {
            return (
              <>
                <ul
                  className={
                    toggleState === 2 ? "content active-content" : "content"
                  }
                >
                  <h3>{movie.type}</h3>
                  <img src={movie.image} alt={movie.name} />
                  <li>
                    <h4>{movie.name}</h4>
                    <p>{movie.title}</p>
                    <span>{movie.describe}</span>
                  </li>
                </ul>
              </>
            );
          })}

          {meshChair.map((movie, index) => {
            return (
              <>
                <ul
                  className={
                    toggleState === 3 ? "content active-content" : "content"
                  }
                >
                  <h3>{movie.type}</h3>
                  <img src={movie.image} alt={movie.name} />
                  <li>
                    <h4>{movie.name}</h4>
                    <p>{movie.title}</p>
                    <span>{movie.describe}</span>
                  </li>
                </ul>
              </>
            );
          })}

          {meshPictures.map((movie, index) => {
            return (
              <>
                <ul
                  className={
                    toggleState === 4 ? "content active-content" : "content"
                  }
                >
                  <h3>{movie.type}</h3>
                  <img src={movie.image} alt={movie.name} />
                  <li>
                    <h4>{movie.name}</h4>
                    <p>{movie.title}</p>
                    <span>{movie.describe}</span>
                  </li>
                </ul>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
