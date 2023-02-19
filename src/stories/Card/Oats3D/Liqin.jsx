import React, { useRef, useEffect, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Html, ContactShadows } from "@react-three/drei";
import "./Oats.scss";

const Annotations = () => {
  const style = {
    cursor: "pointer",
    outline: "none",
    border: "none",
    fontSize: " 8px",
    fontWeight: "300",
    background: "black",
    padding: " 2px 10px",
    borderRadius: "20px",
    letterSpacing: "1px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
  };
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
    <Html position={[-12.16, 25.2, 1]} distanceFactor={20}>
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
    </Html>
  );
};

function Li(props) {
  const { nodes, materials } = useGLTF("/Liqin.glb");
  const ref = useRef();

  useFrame((_, delta) => {
    ref.current.rotation.y += 0.5 * delta;
  });
  return (
    <group
      {...props}
      /* {...spring} */
      ref={ref}
      dispose={null}
      onPointerDown={() => {
        /*  setSelected(!selected); */
        console.log("Down");
      }}
      onPointerOver={() => {
        console.log("Over");
      }}
      onPointerOut={() => {
        console.log("Out");
      }}
      position={[-12.16, 0.7, 1]}
    >
      <group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.yuamhuan002.geometry}
          material={materials.jiang}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.yuamhuan002_1.geometry}
          material={materials.red}
        />
      </group>
    </group>
  );
}

export function Liqin() {
  return (
    <>
      <Li scale={[10, 10, 10]} />
      <Annotations />
    </>
  );
}

useGLTF.preload("/Liqin.glb");
