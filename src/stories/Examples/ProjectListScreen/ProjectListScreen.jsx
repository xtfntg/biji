import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useLayoutEffect,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  useTexture,
  PointerLockControls,
  PerspectiveCamera,
  Line,
  QuadraticBezierLine,
  Html,
} from "@react-three/drei";
import * as THREE from "three";
import { Vector3, Raycaster } from "three";
function Box(props) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => {
        setActive(!active);
      }}
      onPointerOver={(e) => {
        setHover(true);
      }}
      onPointerOut={(e) => {
        setHover(false);
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "green" : "yellow"} />
    </mesh>
  );
}

function Plane(props) {
  const [coords, setCoords] = useState(new THREE.Vector2(0, 0));
  const mouse = useRef([0, 0]);
  const handleMouseMove = (e) => {
    e.preventDefault();
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    const pos = (mouse.current = [x, y]);
    setCoords(pos);
  };

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshPhongMaterial color="hotpink" />
      </mesh>
      <Html>
        <div
          style={{
            position: "absolute",
            backgroundColor: "white",
            padding: "0.5rem",
          }}
        >
          {" "}
          {`x: ${coords.x} , y: ${coords.y}`}
        </div>
      </Html>
    </group>
  );
}

function Reticle() {
  const ref = useRef();
  const vertices = useMemo(() => [
    [0, 0.1, 0],
    [0, -0.1, 0],
    [0, 0, 0],
    [0.1, 0, 0],
    [-0.1, 0, 0],
  ]);
  useEffect(() => {
    ref.current.geometry.setFromPoints(
      vertices.map((point) => new THREE.Vector3(...point))
    );
  });
  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color="black" />
    </line>
  );
}
/* ProjectListScreen*/
export function ProjectListScreen() {
  //控制活动s
  const controlsRef = useRef();
  //锁定
  const isLocked = useRef(false);
  const style = { width: "600px", height: "400px", backgroundColor: "#C7EA46" };
  return (
    <Canvas style={style}>
      <Camera />
      <MouseReticle />
      <PointerLockControls
        onUpdate={() => {
          if (controlsRef.current) {
            controlsRef.current.addEventListener("lock", () => {
              console.log("lock");
              isLocked.current = true;
            });
            controlsRef.current.addEventListener("unlock", () => {
              console.log("unlock");
              isLocked.current = false;
            });
          }
        }}
        ref={controlsRef}
      />
      <ambientLight />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <Plane />
      <OrbitControls />
    </Canvas>
  );
}

function Camera() {
  const mouseReticle = useRef();
  const { camera, mouse } = useThree();
  useEffect(() => {
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return (
    <PerspectiveCamera makeDefault position={[0, 5, 5]} near={0.1} far={10}>
      <group position={[0, 0, -1]}>
        <Reticle />
      </group>
    </PerspectiveCamera>
  );
}

function MouseReticle() {
  const { camera, mouse } = useThree();
  const mouseReticle = useRef();

  useFrame(() => {
    if (mouseReticle.current) {
      const vector = new Vector3(mouse.x, mouse.y, 0.8).unproject(camera);
      mouseReticle.current.position.set(...vector.toArray());
    }
  });

  return (
    <mesh ref={mouseReticle}>
      <sphereBufferGeometry args={[0.02, 100, 100]} />
      <meshBasicMaterial color="red" />
    </mesh>
  );
}
