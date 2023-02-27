import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  MeshReflectorMaterial,
} from "@react-three/drei";
import {
  Physics,
  usePlane,
  useBox,
  useCompoundBody,
} from "@react-three/cannon";
import { Cursor, useDragConstraint } from "./Drag";

function Plane(props) {
  const [ref] = usePlane(() => ({ mass: 0, ...props }), useRef());
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[25, 25]} />
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
}

function Liqin(props) {
  const { nodes, materials } = useGLTF("/Liqin.glb");
  /* const [ref, api] = useBox(
    () => ({ args: [1, 0, 1], mass: 1, ...props }),
    useRef()
  ) */
  const [liqin] = useCompoundBody(() => ({
    mass: 54,
    linearDamping: 0.95,
    angularDamping: 0.95,
    shapes: [{ type: "Box", mass: 50, position: [0, 0, 0], args: [5, 0.5, 5] }],
    ...props,
  }));
  const bind = useDragConstraint(liqin);
  return (
    <group
      {...props}
      ref={liqin}
      {...bind}
      castShadow
      dispose={null}
      position={[0, 0, 0]}
      onPointerDown={() => api.velocity.set(0, 5, 0)}
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

export const Complex = () => {
  const style = { width: "600px", height: "400px" };
  return (
    <Canvas style={style} shadows camera={{ position: [0, 2, 2] }}>
      <color attach="background" args={["#171720"]} />
      <spotLight
        position={[2.5, 5, 5]}
        angle={Math.PI / 4}
        penumbra={0.5}
        castShadow
      />
      <Physics allowSleep={false} iterations={15} gravity={[0, -200, 0]}>
        <Liqin />
        <Plane position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} />
        <Cursor />
      </Physics>
      {/* <OrbitControls /> */}
    </Canvas>
  );
};
