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
//3.8使用物理钩子
import {
  Physics,
  useBox,
  useRaycastVehicle,
  usePlane,
  useCompoundBody,
} from "@react-three/cannon";

//6.1车轮创建调试控件 常数 调试
//6.5将调试变量转为true
// const debug = false;
const debug = true;
//6,2车轮调试函数 半径 车轮参考
const WheelDebug = ({ radius, wheelRef }) => {
  return (
    //6.3l参数组是不是被添加 &&
    debug && (
      //6.4组 参考 车轮参考
      <group ref={wheelRef}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          {/* 6.4.1 圆柱几何体 参数= 半径 半径 数值 数值*/}
          <cylinderGeometry args={[radius, radius, 0.015, 16]} />
          {/* 6.4.2 创建材质 透明  显示透明程度*/}
          <meshNormalMaterial transparent={true} opacity={0.25} />
        </mesh>
      </group>
    )
  );
};

//5.1使用车轮函数。长 宽 高 半径
const useWheels = (width, height, front, radius) => {
  //5.2车轮 使用参考
  const wheels = [useRef(null), useRef(null), useRef(null), useRef(null)];
  //5.3车轮信息
  const wheelInfo = {
    radius, //半径
    directionLocal: [0, -1, 0], //方向本地
    axleLocal: [1, 0, 0], //轴本地
    suspensionStiffness: 60, //悬架刚度
    suspensionRestLength: 0.1, //悬架停长度
    frictionSlip: 5, //摩擦滑动
    dampingRelaxation: 2.3, //阻尼松弛
    dampingCompression: 4.4, //阻尼压缩
    maxSuspensionForce: 100000, //最大悬架力
    rollInfluence: 0.01, //滚动影响
    maxSuspensionTravel: 0.1, //最大悬架行程
    customSlidingRotationalSpeed: -30, //自定义滑动旋转速度
    useCustomSlidingRotationalSpeed: true, //使用自定义滑动旋转速度
  };
  //5.4 多个车轮 ,
  const wheelInfos = [
    {
      //5.4.1展开车轮信息
      ...wheelInfo,
      //底盘连接车轮:车轮的位置 宽 长 高  -width * 0.65 物体到车轴的中心的写法
      chassisConnectionPointLocal: [-width * 0.65, height * 0.4, front],
      //车轮高
      isFrontWheel: true,
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [width * 0.65, height * 0.4, front],
      isFrontWheel: true,
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [-width * 0.65, height * 0.4, -front],
      isFrontWheel: false,
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [width * 0.65, height * 0.4, -front],
      isFrontWheel: false,
    },
  ];
  //5.5道具函数
  const propsFunc = () => ({
    //5.5.1碰撞筛选组
    collisionFilterGroup: 0,
    //5.5.2车速
    mass: 1,
    //5.5.3形状
    shapes: [
      {
        //5.5.4半径参数 车轮信息 圆柱的左右两边 半径 长上段的长度和个数
        args: [wheelInfo.radius, wheelInfo.radius, 0.015, 16],
        //5.5.5设置旋转 面向车外
        rotation: [0, 0, -Math.PI / 2],
        //5.5.6圆柱体
        type: "Cylinder",
      },
    ],
    //5.5.7运动学
    type: "Kinematic",
  });
  //5.6 实现复合碰撞体 车轮形状 车轮
  useCompoundBody(propsFunc, wheels[0]);
  useCompoundBody(propsFunc, wheels[1]);
  useCompoundBody(propsFunc, wheels[2]);
  useCompoundBody(propsFunc, wheels[3]);

  return [wheels, wheelInfos];
};

const Car = () => {
  let mesh = useLoader(GLTFLoader, "/models/car.glb").scene;
  //3.1车辆（正方体）在场景的位置
  const position = [-1.5, 0.5, 3];
  //3.2 正方体宽度
  const width = 0.15;
  //3.3 正方体高度
  const height = 0.07;
  //3.4 正方体长度
  const front = 0.15;
  //3.5 车轮半径
  const wheelRadius = 0.05;

  //3.6底盘主体参数;
  const chassisBodyArgs = [width, height, front * 2];
  //3.7使用物理钩子 参数1底盘主体 .参数2底盘接口  接口对象施加力或脉冲等
  const [chassisBody, chassisApi] = useBox(
    () => ({
      //3.71参数：底盘主体参数
      args: chassisBodyArgs,
      //3.72车速：150
      mass: 150,
      //3.73定位
      position,
    }),
    useRef(null)
  );
  //5.7车轮信息 = 使用车轮信息函数
  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);
  //5.8 车辆 车辆接口 = 使用投射车辆
  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      //5.8.1底盘主体
      chassisBody,
      //5.8.2车轮信息
      wheelInfos,
      //5.8.3车轮
      wheels,
    }),
    useRef(null)
  );

  useEffect(() => {
    mesh.scale.set(0.0012, 0.0012, 0.0012);
    mesh.children[0].position.set(-365, -18, -67);
  }, [mesh]);

  return (
    // 5.9 创建组 车辆
    <group ref={vehicle} name="vehicle">
      {/* 3.9注释汽车模型 */}
      {/* <primitive object={mesh} rotation-y={Math.PI} /> */}
      {/* 3.10创建方块代替车模型 引用 底盘主体 */}
      <mesh ref={chassisBody}>
        <boxGeometry args={chassisBodyArgs} />
        <meshBasicMaterial transparent={true} opacity={0.5} />
      </mesh>
      {/* 6.5 添加车轮调试 车轮引用 车轮   半径 车轮半径*/}
      <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
    </group>
  );
};

const Ground = () => {
  //4.1给地面创建一个物理对象 在地面组件添加usePlaying组件
  const [ref] = usePlane(
    () => ({
      //4.1.1实体标记为静态
      type: "Static",
      //4.1.2调整旋转平面
      rotation: [-Math.PI / 2, 0, 0],
    }),
    useRef(null)
  );

  const gridMap = useLoader(TextureLoader, "/textures/grid.png");
  const aoMap = useLoader(TextureLoader, "/textures/ground-ao.png");
  const alphaMap = useLoader(TextureLoader, "/textures/alpha-map.png");

  useEffect(() => {
    gridMap.anisotropy = 16;
  }, [gridMap]);

  const meshRef = useRef(null);

  const meshRef2 = useRef(null);

  useEffect(() => {
    var uvs = meshRef.current.geometry.attributes.uv.array;

    meshRef.current.geometry.setAttribute("uv2", new BufferAttribute(uvs, 2));

    var uvs2 = meshRef2.current.geometry.attributes.uv.array;

    meshRef2.current.geometry.setAttribute("uv2", new BufferAttribute(uvs2, 2));
  }, [meshRef.current]);
  return (
    <>
      <mesh
        ref={meshRef2}
        position={[-2.285, -0.01, -1.325]}
        rotation-x={-Math.PI * 0.5}
      >
        <planeGeometry args={[12, 12]} />

        <meshBasicMaterial
          opacity={0.325}
          alphaMap={gridMap}
          transparent={true}
          color={"white"}
        />
      </mesh>

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
          blur={[1024, 512]}
          mixBlur={3}
          mixStrength={30}
          mixContrast={1}
          resolution={1024}
          mirror={0}
          depthScale={0}
          minDepthThreshold={0.9}
          maxDepthThreshold={1}
          depthToBlurRatioBias={0.25}
          debug={0}
          reflectorOffset={0.02}
        ></MeshReflectorMaterial>
      </mesh>
    </>
  );
};

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
//1.1赛车函数分解
const RacingCar = () => {
  return (
    <Suspense fallback={null}>
      <Environment files={"/textures/envmap.hdr"} background={"both"} />
      <Track />
      <Ground />
      <Car />
      <PerspectiveCamera makeDefault position={[-6, 3.9, 6.21]} fov={40} />
      <OrbitControls target={[-2.64, -0.71, 0.03]} />
    </Suspense>
  );
};

//2.1赛车函数分解
export const AddCannon = () => {
  const style = {
    width: "600px",
    height: "400px",
    backgroundColor: "#4D6F39",
  };
  return (
    <Canvas style={style}>
      <Physics broadphase="SAP" gravity={[0, -2.6, 0]}>
        <RacingCar />
      </Physics>
    </Canvas>
  );
};
