import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Vector3, Color, MathUtils } from "three";
import { Environment, Center } from "@react-three/drei";

const black = new Color("black");

const Button = (props) => {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);
  const colorTo = useMemo(
    () => new Color(Math.floor(Math.random() * 16777216)),
    []
  );
  useFrame(() => {
    ref.current.rotation.x = hovered
      ? MathUtils.lerp(ref.current.rotation.x, -Math.PI * 2, 0.025)
      : MathUtils.lerp(ref.current.rotation.x, 0, 0.025);

    ref.current.position.z = selected
      ? MathUtils.lerp(ref.current.position.z, 0, 0.025)
      : MathUtils.lerp(ref.current.position.z, -3, 0.025);

    ref.current.material.color.lerp(selected ? colorTo : black, 0.025);
  });
  return (
    <mesh
      {...props}
      ref={ref}
      onPointerDown={() => {
        setSelected(!selected);
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <icosahedronGeometry />
      <meshPhysicalMaterial
        roughness={0}
        metalness={0}
        thickness={3.12}
        ior={1.74}
        transmission={1.0}
      />
    </mesh>
  );
};

const vec = new Vector3();

const Rig = () => {
  return useFrame(({ camera, mouse }) => {
    vec.set(mouse.x * 2, mouse.y * 2, camera.position.z);
    camera.position.lerp(vec, 0.025);
    camera.lookAt(0, 0, 0);
  });
};

export const LerpEvent = () => {
  const style = {
    width: "600px",
    height: "400px",
  };
  return (
    <Canvas style={style}>
      <Environment preset="dawn" background />
      <Center>
        {[...Array(5).keys()].map((x) =>
          [...Array(3).keys()].map((y) => (
            <Button key={x + y * 5} position={[x * 2.5, y * 2.5, 0]} />
          ))
        )}
      </Center>
      <Rig />
    </Canvas>
  );
};
