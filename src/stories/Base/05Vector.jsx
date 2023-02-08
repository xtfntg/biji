import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import { BufferGeometry, Vector3 } from "three";

const Polyhedron = () => {
  let geometry = useMemo(() => {
    const g = new BufferGeometry();
    const points = [
      new Vector3(-1, 1, -1), //c
      new Vector3(-1, -1, 1), //b
      new Vector3(1, 1, 1), //a

      new Vector3(1, 1, 1), //a
      new Vector3(1, -1, -1), //d
      new Vector3(-1, 1, -1), //c

      new Vector3(-1, -1, 1), //b
      new Vector3(1, -1, -1), //d
      new Vector3(1, 1, 1), //a
    ];
    //通过点队列设置该 BufferGeometry 的 attribute。
    g.setFromPoints(points);
    //通过面片法向量的平均值计算每个顶点的法向量。
    g.computeVertexNormals();
    return g;
  }, []);
  useControls({
    x: {
      value: 0,
      min: -5,
      max: -1,
      step: 0.01,
      onChange: (v) => {
        //几何体attributes(属性)位置 陈列3
        geometry.attributes.position.array[3] = v;
        //几何体的属性位置 材质重新编译
        geometry.attributes.position.needsUpdate = true;
      },
    },
  });
  return (
    <mesh geometry={geometry}>
      <meshNormalMaterial />
    </mesh>
  );
};

export const Vector = () => {
  const style = { width: "600px", height: "400px", backgroundColor: "#e2e7bf" };
  return (
    <Canvas style={style} camera={{ position: [1.6, 1.7, 2] }}>
      <Polyhedron />
      <OrbitControls />
      <axesHelper args={[5]} />
      <gridHelper />
    </Canvas>
  );
};
