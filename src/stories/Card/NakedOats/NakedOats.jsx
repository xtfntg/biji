import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import "./NakedOats.scss";

export const NakedOats = () => {
  const imgs = [
    { id: 0, value: "shoes1.png" },
    { id: 1, value: "shoes2.png" },
    { id: 2, value: "shoes3.png" },
  ];
  const [sliderData, setSliderData] = useState(imgs[0]);
  function handleClick(index) {
    console.log(index);
    const slider = imgs[index];
    setSliderData(slider);
  }
  return (
    <body class="body">
      <div class="cont">
        <ul class="thumb">
          {imgs.map((data, i) => {
            return (
              <li
                style={
                  imgs === sliderData
                    ? { background: "rgba(255, 255, 255, 0.5" }
                    : {}
                }
              >
                <img
                  key={data.id}
                  src={data.value}
                  onClick={() => {
                    handleClick(i);
                  }}
                />
              </li>
            );
          })}
        </ul>

        <div class="imgBox">
          <h2>阴山优麦.沽之源莜面</h2>
          <img src={sliderData.value} class="shoess" />
          {/* <img src={selectedImage} class="shoess" /> */}
          <ul class="size">
            <span>型号</span>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
          <a href="#" class="btn">
            添加到购物车
          </a>
        </div>

        <div class="RLabel">
          <div class="CustomerService">
            <img src="line3D.png" />
          </div>
          <div class="OnenAI">
            <p>OpenAI对话窗口</p>
          </div>
        </div>
      </div>
    </body>
  );
};
/* export const Card = () => {
   const style = {
    width: "600px",
    height: "400px",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "url(bg.jpg)",
    backgroundSize: "cover",
  };  
  return (
    <Canvas>
      <Cards />
    </Canvas>
  );
};*/
