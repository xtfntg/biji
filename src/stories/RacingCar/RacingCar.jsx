import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  Environment,
  MeshReflectorMaterial,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { BufferAttribute } from "three";

//4.1
const Car = () => {
  //4.2
  let mesh = useLoader(GLTFLoader, "/models/car.glb").scene;
  //4.4
  useEffect(() => {
    mesh.scale.set(0.0012, 0.0012, 0.0012);
    mesh.children[0].position.set(-365, -18, -67);
  }, [mesh]);
  //4.3
  return <primitive object={mesh} rotation-y={Math.PI} />;
};

//3.1加载地面
const Ground = () => {
  const gridMap = useLoader(TextureLoader, "/textures/grid.png");
  const aoMap = useLoader(TextureLoader, "/textures/ground-ao.png");
  const alphaMap = useLoader(TextureLoader, "/textures/alpha-map.png");
  //3.2
  useEffect(() => {
    gridMap.anisotropy = 16;
  }, [gridMap]);
  //3.3网格参考
  const meshRef = useRef(null);
  //3.10网格参考2
  const meshRef2 = useRef(null);
  //3.5
  useEffect(() => {
    //3.6 uv贴图 网格参考当前的几何体 属性数组
    var uvs = meshRef.current.geometry.attributes.uv.array;
    //3.7 网格参考当前的几何体 设置属性 贴图2 新建缓冲区属性()
    meshRef.current.geometry.setAttribute("uv2", new BufferAttribute(uvs, 2));
    //3.11 uv贴图 网格参考当前的几何体 属性数组
    var uvs2 = meshRef2.current.geometry.attributes.uv.array;
    //3.12 网格参考当前的几何体 设置属性 贴图2 新建缓冲区属性()
    meshRef2.current.geometry.setAttribute("uv2", new BufferAttribute(uvs2, 2));
  }, [meshRef.current]);
  return (
    <>
      {/* 3.8 */}
      <mesh
        ref={meshRef2}
        position={[-2.285, -0.01, -1.325]}
        rotation-x={-Math.PI * 0.5}
      >
        <planeGeometry args={[12, 12]} />
        {/* 3.9创建混合材质 */}
        <meshBasicMaterial
          opacity={0.325}
          alphaMap={gridMap}
          transparent={true}
          color={"white"}
        />
      </mesh>
      {/* 3.4 */}
      <mesh
        ref={meshRef}
        position={[-2.285, -0.015, -1.325]}
        rotation-x={-Math.PI * 0.5}
        rotation-z={-0.079}
      >
        <circleGeometry args={[6.12, 50]} />
        <MeshReflectorMaterial
          aoMap={aoMap}
          alphaMap={alphaMap}
          transparent={true}
          color={[0.5, 0.5, 0.5]}
          envMapIntensity={0.35}
          metalness={0.05}
          roughness={0.4}
          dithering={true}
          blur={[1024, 512]} // 模糊地面反射（宽度、高度），0 跳过模糊
          mixBlur={3} //有多少模糊与表面粗糙度混合（默认 = 1）
          mixStrength={30} // 反射强度
          mixContrast={1} // 反光对比
          resolution={1024} // 非缓冲分辨率，较低 = 更快，较高 = 质量更好，更慢
          mirror={0} // 镜像环境，0 = 纹理颜色，1 = 拾取环境颜色
          depthScale={0} // 缩放深度因子（0 = 无深度，默认值 = 0）
          minDepthThreshold={0.9} // 深度纹理插值的下边缘（默认值 = 0）
          maxDepthThreshold={1} // 深度纹理插值的上边缘（默认值 = 0）
          depthToBlurRatioBias={0.25} // 在计算模糊量 [bl
          debug={0}
          reflectorOffset={0.02} // 偏移投射反射的虚拟相机。 反光的时候有用
        ></MeshReflectorMaterial>
      </mesh>
    </>
  );
};

//2.1加载轨道
const Track = () => {
  const result = useLoader(GLTFLoader, "/models/track.glb");

  const colorMap = useLoader(TextureLoader, "/textures/track.png");

  useEffect(() => {
    colorMap.anisotropy = 16;
  }, [colorMap]);

  let geometry = result.scene.children[0].geometry;
  return (
    <mesh>
      <primitive object={geometry} attach={"geometry"} />
      <meshBasicMaterial toneMapped={false} map={colorMap} />
    </mesh>
  );
};
//1.1赛车函数
export const RacingCar = () => {
  const style = {
    width: "600px",
    height: "400px",
    backgroundColor: "#658",
  };
  return (
    <Canvas style={style} camera={{ fov: 23, position: [10, 10, 15] }} shadows>
      <Suspense fallback={null}>
        <Environment files={"/textures/envmap.hdr"} background={"both"} />
        <Track />
        <Ground />
        <Car />
        <PerspectiveCamera makeDefault position={[-6, 3.9, 6.21]} fov={40} />
        <OrbitControls target={[-2.64, -0.71, 0.03]} />
      </Suspense>
    </Canvas>
  );
};
