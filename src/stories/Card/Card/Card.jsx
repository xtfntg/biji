import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import "./Card.scss";

/* 反应图像滑块轮播写法1 */
import image1 from "/shoes1.png";
import image2 from "/shoes2.png";
import image3 from "/shoes3.png";
export const Card1 = () => {
  const [selectedImage, setSelectedImage] = useState(image1);
  const [allImg, setAllImg] = useState([image1, image2, image3]);
  return (
    <body class="body">
      <div class="cont">
        <ul class="thumb">
          {allImg.map((img) => {
            return (
              <li
                style={
                  img === selectedImage
                    ? { background: "rgba(255, 255, 255, 0.5" }
                    : {}
                }
              >
                <img
                  src={img}
                  onClick={() => {
                    setSelectedImage(img);
                  }}
                />
              </li>
            );
          })}
        </ul>

        <div class="imgBox">
          <h2>耐克空气变焦</h2>
          <img src={selectedImage} class="shoess" />
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
      </div>
    </body>
  );
};
/* 反应图像滑块轮播写法2  自由度更高*/
export const Card = () => {
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
          <h2>耐克空气变焦</h2>
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
