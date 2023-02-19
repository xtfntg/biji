import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrthographicCamera, OrbitControls, useGLTF } from "@react-three/drei";
/* import { Vector2, Vector3 } from "three"; */
import * as THREE from "three";

const Gesture = ({ portal, ...props }) => {
  const { nodes, materials } = useGLTF("./Hand1.glb");
  const v = new THREE.Vector3();
  const wheel = useRef(0);
  const hand = useRef();
  const [clicked, click] = useState(false);

  useFrame((state) => {
    v.copy({ x: state.pointer.x, y: state.pointer.y, z: 0 });
    v.unproject(state.camera);
    hand.current.rotation.x = THREE.MathUtils.lerp(
      hand.current.rotation.x,
      clicked ? -0.7 : -0.5,
      0.2
    );
    hand.current.position.lerp(
      { x: v.x - 100, y: wheel.current + v.y, z: v.z },
      0.4
    );
    state.camera.zoom = THREE.MathUtils.lerp(
      state.camera.zoom,
      clicked ? 0.9 : 0.7,
      clicked ? 0.025 : 0.15
    );
    state.camera.position.lerp(
      { x: -state.pointer.x * 400, y: -state.pointer.y * 200, z: 1000 },
      0.1
    );
    state.camera.lookAt(0, 0, 0);
    state.camera.updateProjectionMatrix();
  });

  return (
    <group {...props} dispose={null}>
      <group ref={hand}>
        <points>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["12683_hand_v1_FINAL"].geometry}
            /* material={materials.chazhi} */
            rotation={[-1.68, -Math.PI / 2, -Math.PI / 1]}
            scale={[2, 2, 2]}
          />
          <pointsMaterial size={0.02} sizeAttenuation />
        </points>
      </group>
    </group>
  );
};

const Octahedron = (props) => {
  const ref = useRef();
  return (
    <>
      <mesh onClick={(e) => console.log("click")}>
        <circleGeometry args={[100, 32]} />
        <meshBasicMaterial color={"blue"} />
      </mesh>

      <mesh {...props}>
        <octahedronGeometry args={[100, 0]} />
        <meshBasicMaterial color={"#980"} />
      </mesh>
    </>
  );
};

const Circle = (props) => {
  const ref = useRef();
  return (
    <>
      <mesh onClick={(e) => console.log("click")}>
        <circleGeometry args={[100, 32]} />
        <meshBasicMaterial color={"blue"} />
      </mesh>

      <mesh {...props}>
        <octahedronGeometry args={[100, 0]} />
        <meshBasicMaterial color={"#980"} />
      </mesh>
    </>
  );
};

export const R3fSpline = () => {
  const container = useRef();
  const style = {
    position: "relative",
    width: "600px",
    height: "400px",
    backgroundColor: "#59191F",
    margin: "0",
    padding: "0",
    cursor: " none",
  };
  return (
    <div ref={container} style={style}>
      <Canvas
        shadows
        flat
        linear
        style={{ pointerEvents: "none" }}
        eventSource={container}
        eventPrefix="page"
      >
        <OrthographicCamera
          makeDefault={true}
          far={100000}
          near={-100000}
          position={[0, 0, 1000]}
        />
        <Circle />
        <Gesture />
        <Octahedron />

        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
};
