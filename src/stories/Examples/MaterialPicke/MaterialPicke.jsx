import React, { Suspense, useRef, useState, useMemo } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  useProgress,
  Environment,
  Html,
  Hud,
  OrthographicCamera,
} from "@react-three/drei";
import { TextureLoader, MathUtils } from "three";

const Room = () => {
  const { nodes, materials } = useGLTF("./Room.glb");
  return (
    <>
      <group dispose={null} position-y={0.3}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh
            geometry={nodes.room_1.geometry}
            material={materials.ground_1}
            receiveShadow
          />
          <mesh
            geometry={nodes.room_2.geometry}
            material={materials.wall_1_2}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.room_3.geometry}
            material={materials.room_5_30}
            receiveShadow
          />
          <mesh
            geometry={nodes.room_4.geometry}
            material={materials.white}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.room_5.geometry}
            material={materials.flltgrey}
            material-transparent={true}
            material-opacity={0.1}
          />
          <mesh
            geometry={nodes.room_6.geometry}
            material={materials.dkgrey}
            receiveShadow
          />
          <mesh
            geometry={nodes.room_7.geometry}
            material={materials.amber}
            castShadow
          />
          <mesh
            geometry={nodes.room_8.geometry}
            material={materials.yellow_green}
            castShadow
          />
          <mesh
            geometry={nodes.room_9.geometry}
            material={materials.flbrown}
            castShadow
          />
        </group>
      </group>
    </>
  );
};

const Button = ({ id, texture, position, roughness, setSelected }) => {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  useFrame((_, delta) => {
    ref.current.scale.y =
      ref.current.scale.x =
      ref.current.scale.z =
        MathUtils.lerp(ref.current.scale.y, hovered ? 1.5 : 1, 0.25);
    hovered && ref.current.rotateY(delta * 5);
  });
  return (
    <mesh
      ref={ref}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={() => setSelected(id)}
    >
      <sphereGeometry />
      <meshStandardMaterial
        map={texture}
        roughness={roughness}
        envMapIntensity={1.5}
      />
    </mesh>
  );
};

const MaterialMenu = ({ setSelected }) => {
  const texture = useLoader(TextureLoader, [
    "./img/fabric_pattern_05.jpg",
    "./img/leather_red.jpg",
    "./img/fabric_pattern_07.jpg",
    "./img/book_pattern.jpg",
    "./img/denim_fabric_02.jpg",
  ]);
  return (
    <Hud>
      <OrthographicCamera makeDefault position={[0, 0, 2]} zoom={50} />
      <Environment preset="forest" />
      <Button
        id={0}
        texture={texture[0]}
        position={[-5, -3.5, 0]}
        setSelected={setSelected}
      />
      <Button
        id={1}
        texture={texture[1]}
        position={[-2.5, -3.5, 0]}
        roughness={0.2}
        setSelected={setSelected}
      />
      <Button
        id={2}
        texture={texture[2]}
        position={[-0, -3.5, 0]}
        setSelected={setSelected}
      />
      <Button
        id={3}
        texture={texture[3]}
        position={[2.5, -3.5, 0]}
        roughness={0.5}
        setSelected={setSelected}
      />
      <Button
        id={4}
        texture={texture[4]}
        position={[5, -3.5, 0]}
        setSelected={setSelected}
      />
    </Hud>
  );
};

const ArmChair = () => {
  const ref = useRef();
  const [selected, setSelected] = useState(0);
  const { nodes, materials } = useGLTF("./Armchair.glb");
  const materialOverrides = useMemo(() => {
    return {
      0: materials.fabric_pattern_05,
      1: materials.red_leather,
      2: materials.fabric_pattern_7,
      3: materials.book_pattern,
      4: materials.denim_fabric_02,
    };
  }, [materials]);
  return (
    <>
      <group dispose={null} position={[1.5, 0.299, 1.5]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh
            ref={ref}
            geometry={nodes.armchair001_1.geometry}
            material={materialOverrides[selected]}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.armchair001_3.geometry}
            material={materials.wooden_legs}
            castShadow
          />
        </group>
      </group>
      <MaterialMenu setSelected={setSelected} />
    </>
  );
};

const Loader = () => {
  const { progress } = useProgress();
  return <Html center>{progress}%loaded</Html>;
};

export const MaterialPicke = () => {
  const style = { width: "600px", height: "400px", backgroundColor: "#d8e3e7" };
  return (
    <Canvas style={style} shadows camera={{ position: [2.25, 1, 2.25] }}>
      <Suspense fallback={<Loader />}>
        <Environment
          preset="dawn"
          background
          ground={{
            height: 2,
            radius: 115,
            scale: 100,
          }}
        />
        <directionalLight
          position={[5, 1.5, 3]}
          intensity={2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />

        <Room />
        <ArmChair />
        <OrbitControls
          target={[1.5, 0.8, 1.5]}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2 + Math.PI / 12}
        />
      </Suspense>
    </Canvas>
  );
};
