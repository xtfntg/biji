/* https://codesandbox.io/s/three-fiber-zoom-to-object-forked-5zhm9 ----原码位置*/
import * as THREE from "three";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useCursor, useTexture, Html } from "@react-three/drei";
import randomColor from "randomcolor";
import styled from "styled-components";

//随机位置
function RandomPos() {
  const min = 5;
  const max = -5;
  return Math.random() * (max - min) + min;
}

//瞬间

export const Content = styled.div`
  padding-top: 10px;
  transform: translate3d(50%, 0, 0);
  text-align: left;
  background: #8f8;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
`;

function Moment({ data, position, zoomToView }) {
  const meshRef = useRef();

  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hover ? "pointer" : "grab";
  }, [hover]);

  useLayoutEffect(() => {
    meshRef.current.position.x = data.position[0];
    meshRef.current.position.y = data.position[1];
    meshRef.current.position.z = data.position[2];
  });
  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => {
        setHover(true);
      }}
      onPointerOut={() => {
        setHover(false);
      }}
      onClick={() => {
        setClicked(!clicked);
        zoomToView(meshRef);
      }}
    >
      <boxBufferGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial color={data.color} />
      {hover || clicked ? (
        <Html distanceFactor={1}>
          <Content>
            赵本山
            <br />
            春晚小品
          </Content>
        </Html>
      ) : (
        ""
      )}
    </mesh>
  );
}
//云
function Cloud({ momentsData }) {
  //放大
  const [zoom, setZoom] = useState(false);
  //焦点
  const [focus, setFocus] = useState(true);
  const vec = new THREE.Vector3();

  useFrame((state) => {
    //速度
    const step = 0.05;

    zoom ? vec.set(focus.x, focus.y, focus.z + 0.2) : vec.set(0, 0, 5);

    state.camera.position.lerp(vec, step);
    state.camera.lookAt(0, 0, 0);
    state.camera.updateProjectionMatrix();
  });

  const zoomToView = (focusRef) => {
    setZoom(!zoom);
    setFocus(focusRef.current.position);
  };

  return (
    <instancedMesh>
      {momentsData.map((moment, i) => {
        return <Moment key={i} data={moment} zoomToView={zoomToView} />;
      })}
    </instancedMesh>
  );
}

export function ObjectZoom() {
  const momentsArray = [];
  for (let i = 0; i < 100; i++) {
    momentsArray.push({
      color: randomColor(),
      position: [RandomPos(), RandomPos(), RandomPos()],
    });
  }
  const style = {
    width: "500px",
    height: "400px",
    background: "#ccccd6",
    cursor: "pointer",
  };
  return (
    <Canvas
      style={style}
      linear
      camera={{ fov: 75, near: 0.01, far: 1000, position: [0, 0, 3] }}
    >
      <ambientLight />
      <directionalLight position={[150, 150, 150]} intensity={0.55} />
      <Cloud momentsData={momentsArray} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
