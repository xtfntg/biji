import React, { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { Vector2, Vector3 } from "three";

const Teleport = () => {
  const ref = useRef();
  //圆形运行
  const circleRef = useRef();
  //圆形效果
  const circleEffectRef = useRef();
  const to = useMemo(() => new Vector3(0, 1, 10), []);
  //拖动
  const [dragging, setDragging] = useState(false);
  //拖动向量
  const dragVector = useMemo(() => new Vector2(), []);

  useEffect(() => {
    const onPointerDown = (e) => {
      setDragging(true);
    };

    const onPointerUp = (e) => {
      setDragging(false);
    };
    const onPointerMove = (e) => {
      dragVector.set(e.movementX, e.movementY);
      dragging &&
        (ref.current.rotation.y += ((dragVector.x / 10) * Math.PI) / 180) &&
        (ref.current.children[0].rotation.x +=
          ((dragVector.y / 10) * Math.PI) / 180);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerup", onPointerUp);
    document.addEventListener("pointermove", onPointerMove);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointermove", onPointerMove);
    };
  });

  useFrame((_, delta) => {
    ref.current.position.lerp(to, delta * 2);
    circleEffectRef.current.scale.x = circleEffectRef.current.scale.y +=
      delta * 10;
    circleEffectRef.current.material.opacity -= delta * 1;
  });

  return (
    <>
      <group ref={ref} position={[0, 1, 10]}>
        <PerspectiveCamera makeDefault />
      </group>
      <mesh
        rotation={[Math.PI / -2, 0, 0]}
        onPointerMove={({ point }) => {
          circleRef.current.position.z = point.z;
          circleRef.current.position.x = point.x;
        }}
        onClick={({ point }) => {
          to.set(point.x, 1, point.z);
          circleEffectRef.current.position.copy(circleRef.current.position);
          circleEffectRef.current.scale.set(1, 1, 1);
          circleEffectRef.current.material.opacity = 1;
        }}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={"#5555ff"} />
      </mesh>

      <mesh
        ref={circleRef}
        rotation={[Math.PI / -2, 0, 0]}
        position={[0, 0.01, 0]}
      >
        <ringBufferGeometry args={[0.3, 0.36, 64]} />
        <meshBasicMaterial
          color={"#fff"}
          transparent={true}
          opacity={0.25}
          visible={true}
        />
      </mesh>

      <mesh
        ref={circleEffectRef}
        rotation={[Math.PI / -2, 0, 0]}
        position={[0, 0.02, 0]}
      >
        <ringBufferGeometry args={[0.35, 0.36, 64]} />
        <meshBasicMaterial
          color={"#fff"}
          transparent={true}
          opacity={0.25}
          visible={true}
        />
      </mesh>
    </>
  );
};

export const FloorEvent = () => {
  const style = {
    width: "500px",
    height: "400px",
    background: "#000",
    cursor: "pointer",
  };
  return (
    <Canvas style={style} camera={{ fov: 75, position: [0, 1, 7] }} shadows>
      <Teleport />
      <Environment preset="dawn" background />
      <ambientLight intensity={0.1} />
      <pointLight
        position={[0, 2, 0]}
        color={"#fff"}
        intensity={1}
        distance={100}
      />
    </Canvas>
  );
};
