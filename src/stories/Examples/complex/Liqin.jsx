import React, { useRef, useEffect, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Html, ContactShadows } from "@react-three/drei";
import { Physics, usePlane, useCompoundBody } from "@react-three/cannon";
import { useDragConstraint } from "./Drag";

/* export function Liqin(props) {
  const { nodes, materials } = useGLTF("/Liqin.glb");
  const ref = useRef();

  useFrame((_, delta) => {
    ref.current.rotation.y += 0.5 * delta;
  });
  const [li] = useCompoundBody(() => ({
    mass: 54,
    linearDamping: 0.95,
    angularDamping: 0.95,
    shapes: [{ type: "Box", mass: 50, position: [0, 0, 0], args: [5, 0.5, 5] }],
    ...props,
  }));
  const bind = useDragConstraint(li);
  return (
    <group
      {...props}
      {...bind}
      ref={ref}
      dispose={null}
      onPointerDown={() => {
        setSelected(!selected);
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
} */

function Li(props) {
  const [li] = useCompoundBody(() => ({
    mass: 54,
    linearDamping: 0.95,
    angularDamping: 0.95,
    shapes: [{ type: "Box", mass: 50, position: [0, 0, 0], args: [5, 0.5, 5] }],
    ...props,
  }));
  const bind = useDragConstraint(li);
  return (
    <mesh ref={li} {...bind} {...props}>
      <sphereGeometry args={[1, 32]} />
      <meshMatcapMaterial />
    </mesh>
  );
}

const Floor = (props) => {
  const [ref] = usePlane(() => ({ type: "static", ...props }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <MeshReflectorMaterial
        color="#878790"
        blur={[400, 400]}
        resolution={1024}
        mixBlur={1}
        mixStrength={3}
        depthScale={1}
        minDepthThreshold={0.85}
        metalness={0}
        roughness={1}
      />
    </mesh>
  );
};

export const Liqin = () => {
  return (
    <>
      <Li />
      <Floor position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]} />
    </>
  );
};
