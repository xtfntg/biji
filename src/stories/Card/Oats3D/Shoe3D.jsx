import React, { useState, useRef, useEffect, Fragment, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  Html,
  Hud,
  OrthographicCamera,
  PerspectiveCamera,
} from "@react-three/drei";
import { TextureLoader, MathUtils } from "three";
import "./Oats.scss";

const ShoppingCart = () => {
  return (
    <mesh>
      <boxGeometry />
      <meshBasicMaterial color={"red"} />
    </mesh>
  );
};
const Init = () => {
  return (
    <Html transform center>
      <div class="imgBoxOats">
        <h2>耐克 旅游鞋11111</h2>
        <ul class="size">
          <span>型号</span>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
      </div>
    </Html>
  );
};

const Button = ({ id, texture, position, roughness, setSelected }) => {
  const ref = useRef();
  const { nodes, materials } = useGLTF("/ShoeA.glb");
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    ref.current.scale.y =
      ref.current.scale.x =
      ref.current.scale.z =
        MathUtils.lerp(ref.current.scale.y, hovered ? 0.7 : 0.5, 0.25);
    /* hovered && ref.current.rotateY(delta * 1); */
  });
  return (
    <>
      <mesh
        ref={ref}
        scale={[0.5, 0.5, 0, 5]}
        position={position}
        rotation={[0, Math.PI / 1, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerDown={() => setSelected(id)}
        geometry={nodes.shoe001.geometry}
      >
        <meshStandardMaterial
          map={texture}
          roughness={roughness}
          envMapIntensity={1.5}
        />
      </mesh>
      {/* <mesh position={position}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshBasicMaterial />
      </mesh> */}
    </>
  );
};

const CustomerService = ({ position, props }) => {
  return (
    <mesh {...props} position={position}>
      <boxGeometry args={[2.2, 2.2, 2]} />
      <meshBasicMaterial />
    </mesh>
  );
};

const OpenAI = ({ position }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[2.2, 1.6, 1]} />
      <meshBasicMaterial />
    </mesh>
  );
};

const MaterialMenu = ({ setSelected }) => {
  const texture = useLoader(TextureLoader, [
    "./ShoeX0.png",
    "./ShoeX1.png",
    "./ShoeX2.png",
  ]);
  return (
    <Hud>
      <OrthographicCamera makeDefault position={[0, 0, 2]} zoom={50} />
      <Environment preset="forest" />
      <Button
        id={0}
        texture={texture[0]}
        position={[-2.5, 2, 0]}
        /* roughness={0.2} */
        setSelected={setSelected}
      />
      <Button
        id={1}
        texture={texture[1]}
        position={[-2.5, 0.5, 0]}
        setSelected={setSelected}
      />
      <Button
        id={2}
        texture={texture[2]}
        position={[-2.5, -1, 0]}
        /* roughness={0.2} */
        setSelected={setSelected}
      />
      <CustomerService position={[2.5, 0.8, 0]} />
      <OpenAI position={[2.5, -1.2, 0]} />
      <Init />
      <ShoppingCart />
    </Hud>
  );
};
export const Shoe3D = () => {
  const ref = useRef();
  const [selected, setSelected] = useState(0);
  const { nodes, materials } = useGLTF("/ShoeA.glb");

  const materialOverrides = useMemo(() => {
    return {
      0: materials.patch1,
      1: materials.patch2,
      2: materials.patch3,
    };
  }, [materials]);

  useFrame((_, delta) => (ref.current.rotation.y += 1 * delta));

  return (
    <Fragment>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <Environment preset="forest" />
      <group ref={ref} dispose={null} position={[0, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.shoe001.geometry}
          material={materialOverrides[selected]}
        />
        <MaterialMenu setSelected={setSelected} />
      </group>
    </Fragment>
  );
};
