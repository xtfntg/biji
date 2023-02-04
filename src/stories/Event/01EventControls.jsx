import React, { useRef, useState, useEffect } from "react";
/* import * as PropTypes from "prop-types"; */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

const HtmlContent = () => {
  const style = {
    height: "70px",
    padding: "3px",
    /*  borderRadius: "3px", */
    fontSize: "10px",
    border: "1px solid #888888",
    backgroundColor: "#36292f",
    color: "#f97d1c",
    lineHeight: "20px",
  };
  return (
    <Html style={style} fullscreen={true}>
      <p>
        <span>
          注:1.使用正方体移入移出动画开始与暂停,按下与抬起的颜色变化。2.两侧线框三种几何形的点击切换
          3.添加轴线帮助坐标
        </span>
        <br />
        <span>
          使用 three函数成数组的方式切换形状 与react-three/fiber 更加灵活
        </span>
      </p>
      <br />
    </Html>
  );
};

const Polyhedrom = ({ position, polyhedron }) => {
  const ref = useRef();
  const [count, setCount] = useState(1);

  useFrame((_, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += 0.5 * delta;
  });

  return (
    <mesh
      position={position}
      ref={ref}
      onPointerDown={() => {
        setCount((count + 1) % 3);
      }}
      geometry={polyhedron[count]}
    >
      <meshBasicMaterial color={"lime"} wireframe />
    </mesh>
  );
};

const Box = (props) => {
  const ref = useRef();
  const [controls, setControls] = useState(false);
  const [hovered, setHovered] = useState(false);
  useFrame(() => {
    if (!controls) {
      ref.current.rotation.x += 0.01;
    }
  });
  return (
    <mesh
      ref={ref}
      {...props}
      receiveShadow
      castShadow
      /* 1.1添加指针按下抬起事件 移入移出事件 更新信息*/
      onPointerDown={() => setHovered(true)}
      onPointerUp={() => setHovered(false)}
      onPointerOver={() => setControls(true)}
      onPointerOut={() => setControls(false)}
      onUpdate={(s) => console.log(s)}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? "#ec4e8a" : "#ef632b"} />
    </mesh>
  );
};

export const EventControls = () => {
  const polyhedron = [
    new THREE.BoxGeometry(),
    new THREE.SphereGeometry(0.7),
    new THREE.DodecahedronGeometry(0.7),
  ];

  const style = { width: "600px", height: "400px", backgroundColor: "#0eb0c9" };
  return (
    <Canvas style={style} camera={{ fov: 70, position: [8, 8, 8] }} shadows>
      <HtmlContent />
      <pointLight
        castShadow
        intensity={10}
        position={[10, 10, 10]}
        color={"#7e1671"}
      />
      <Box />
      <Polyhedrom position={[-3, 0, 0]} polyhedron={polyhedron} />
      <Polyhedrom position={[3, 0, 0]} polyhedron={polyhedron} />

      <mesh rotation={[Math.PI / -2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={"#36282b"} />
      </mesh>
      <OrbitControls />
      <axesHelper args={[5]} />
    </Canvas>
  );
};
