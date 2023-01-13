import React, { Suspense, useEffect, useRef, useState } from "react";
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

import {
  Physics,
  useBox,
  useRaycastVehicle,
  usePlane,
  useCompoundBody,
  useTrimesh,
} from "@react-three/cannon";

//7.1添加斜坡
const Ramp = () => {
  const result = useLoader(GLTFLoader, "/models/ramp.glb");
  //7.2几何形状
  const geometry = result.scene.children[0].geometry;
  //7.3几何顶点 = 几何体属性位置数组
  const vertices = geometry.attributes.position.array;
  //7.4指数=几何体索引数组
  const indices = geometry.index.array;
  //7.5 参考 创建新的三角网格物理;
  const [ref] = useTrimesh(
    () => ({
      args: [vertices, indices],
      mass: 0,
      type: "Static",
    }),
    useRef(null)
  );
};

//6.1对撞正方形函数 参1 位置  参2 比例
const ColliderBox = ({ position, scale }) => {
  //6.2创造新物理实体
  useBox(() => ({
    args: scale,
    position,
    //6.2.1设置静态物体总是固定在同一个地方
    type: "Static",
  }));

  return (
    //6.3创建新的树网格
    debug && (
      // 6.3.1 位置参数
      <mesh position={position}>
        {/* 6.3.2 比例参数 */}
        <boxGeometry args={scale} />
        <meshBasicMaterial transparent={true} opacity={0.25} />
      </mesh>
    )
  );
};

//2.1使用控件函数 车辆Api 底盘Api
const useControls = (vehicleApi, chassisApi) => {
  //2.3控件状态
  let [controls, setControls] = useState({
    /*  w: boolean,
    a: boolean,
    s: boolean,
    d: boolean,
    r: boolean, */
  });
  //2.4使用效果钩子
  useEffect(() => {
    //2.4.1按键按下处理程序
    //注：L1.流程按下键盘W键
    const keyDownPressHandler = (e) => {
      //2.4.5 修改控件对象 根据触发每个事件的键 取控件对象的前一个值 返回一个新对象
      //注：L2.更新控件并设置W键
      setControls((controls) => ({
        //2.4.5.1使用之前控件内容副本
        ...controls,
        //2.4.5.2加上更新属性 按下键的小写名称 单值为true 这是一个关键事件
        [e.key.toLowerCase()]: true,
      }));
    };
    //2.4.2按键抬起处理程序
    const keyUpPressHandler = (e) => {
      setControls((controls) => ({
        ...controls,
        [e.key.toLowerCase()]: false,
      }));
    };
    //2.4.3 窗口 添加按键按下处理程序 添加按键抬起处理程序
    window.addEventListener("keydown", keyDownPressHandler);
    window.addEventListener("keyup", keyUpPressHandler);
    return () => {
      //2.4.4清理按键按下按键抬起处理程序
      window.removeEventListener("keydown", keyDownPressHandler);
      window.removeEventListener("keyup", keyUpPressHandler);
    };
  }, []);

  //3.1使用控制对象 移动汽车
  useEffect(() => {
    //3.2检查W键是否按下
    if (controls.w) {
      //3.2.1车辆接口 添加应用引擎力 汽车前轮子上添加一个力设置转向值 第二个参数索引 向前移动
      vehicleApi.applyEngineForce(150, 2);
      vehicleApi.applyEngineForce(150, 3);
      //3.3检查S键是否按下
    } else if (controls.s) {
      //3.3.1车辆接口 添加应用引擎力 汽车前轮子上添加一个反向力设置转向值 第二个参数索引 向后移动
      vehicleApi.applyEngineForce(-150, 2);
      vehicleApi.applyEngineForce(-150, 3);
      //3.4其它 车辆接口 添加应用引擎力 把力重置为0 第二个参数索引
    } else {
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
    }
    //5.1检查a键是否按下
    if (controls.a) {
      //5.1.1车辆接口 添加应用引擎力 汽车轮子上添加一个力设置转向值 正值前轮转左边 负值车轮向右转 第二个参数索引 向左移动
      vehicleApi.setSteeringValue(0.35, 2);
      vehicleApi.setSteeringValue(0.35, 3);
      vehicleApi.setSteeringValue(-0.1, 0);
      vehicleApi.setSteeringValue(-0.1, 1);
      //5.2检查d键是否按下
    } else if (controls.d) {
      //5.2.1车辆接口 添加应用引擎力 汽车轮子上添加一个力设置转向值 正值前轮转右边 负值车轮向左转 第二个参数索引 向右移动
      vehicleApi.setSteeringValue(-0.35, 2);
      vehicleApi.setSteeringValue(-0.35, 3);
      vehicleApi.setSteeringValue(0.1, 0);
      vehicleApi.setSteeringValue(0.1, 1);
      //5.3都未按各轮转向值回0
    } else {
      //5.3.1 循环4个轮子索引
      for (let i = 0; i < 4; i++) {
        //5.3.2车辆接口 添加应用引擎力 设置转向值跟索引值
        vehicleApi.setSteeringValue(0, i);
      }
    }

    if (controls.arrowdown)
      chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, +1]);

    if (controls.arrowup) chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, -1]);

    if (controls.arrowleft)
      chassisApi.applyLocalImpulse([0, -5, 0], [-0.5, 0, 0]);

    if (controls.arrowright)
      chassisApi.applyLocalImpulse([0, -5, 0], [+0.5, 0, 0]);

    if (controls.r) {
      chassisApi.position.set(-1.5, 0.5, 3);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      chassisApi.rotation.set(0, 0, 0);
    }
  }, [controls, vehicleApi, chassisApi]);
  //2.2返回状态与使用控制一起写
  return controls;
};

const debug = true;

const WheelDebug = ({ radius, wheelRef }) => {
  return (
    debug && (
      <group ref={wheelRef}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[radius, radius, 0.015, 16]} />
          <meshNormalMaterial transparent={true} opacity={0.25} />
        </mesh>
      </group>
    )
  );
};

const useWheels = (width, height, front, radius) => {
  const wheels = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const wheelInfo = {
    radius,
    directionLocal: [0, -1, 0],
    axleLocal: [1, 0, 0],
    suspensionStiffness: 60,
    suspensionRestLength: 0.1,
    frictionSlip: 5,
    dampingRelaxation: 2.3,
    dampingCompression: 4.4,
    maxSuspensionForce: 100000,
    rollInfluence: 0.01,
    maxSuspensionTravel: 0.1,
    customSlidingRotationalSpeed: -30,
    useCustomSlidingRotationalSpeed: true,
  };

  const wheelInfos = [
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [-width * 0.65, height * 0.4, front],
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

  const propsFunc = () => ({
    collisionFilterGroup: 0,
    mass: 1,
    shapes: [
      {
        args: [wheelInfo.radius, wheelInfo.radius, 0.015, 16],
        rotation: [0, 0, -Math.PI / 2],
        type: "Cylinder",
      },
    ],
    type: "Kinematic",
  });
  useCompoundBody(propsFunc, wheels[0]);
  useCompoundBody(propsFunc, wheels[1]);
  useCompoundBody(propsFunc, wheels[2]);
  useCompoundBody(propsFunc, wheels[3]);

  return [wheels, wheelInfos];
};

const Car = () => {
  let mesh = useLoader(GLTFLoader, "/models/car.glb").scene;
  const position = [-1.2, 0.5, 3];
  const width = 0.15;
  const height = 0.07;
  const front = 0.15;
  const wheelRadius = 0.05;

  const chassisBodyArgs = [width, height, front * 2];
  const [chassisBody, chassisApi] = useBox(
    () => ({
      args: chassisBodyArgs,
      mass: 150,
      position,
    }),
    useRef(null)
  );
  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);
  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos,
      wheels,
    }),
    useRef(null)
  );
  //4.1导入汽车控件
  useControls(vehicleApi, chassisApi);
  useEffect(() => {
    mesh.scale.set(0.0012, 0.0012, 0.0012);
    mesh.children[0].position.set(-365, -18, -67);
  }, [mesh]);

  return (
    <group ref={vehicle} name="vehicle">
      <mesh ref={chassisBody}>
        <boxGeometry args={chassisBodyArgs} />
        <meshBasicMaterial transparent={true} opacity={0.5} />
      </mesh>
      <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
    </group>
  );
};

const Ground = () => {
  const [ref] = usePlane(
    () => ({
      type: "Static",
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
    //1.1最简单的分配图形的方法
    //1.3给网格添加几何属性 geometry={geometry} 不是用原始结构
    <>
      <mesh geometry={geometry}>
        {/* 1.2 注释之前图形方法 */}
        {/* <primitive object={geometry} attach={"geometry"} /> */}
        <meshBasicMaterial toneMapped={false} map={colorMap} />
      </mesh>
      {/* 6.4 对撞正方形 其中的一棵树*/}
      <ColliderBox position={[1.75, 0, 0.5]} scale={[0.3, 1, 0.3]} />
      {/* 6.5 对撞正方形 添加多棵树*/}
      <ColliderBox position={[2.5, 0, -1.4]} scale={[0.3, 1, 0.3]} />
      <ColliderBox position={[0.6, 0, -3.8]} scale={[0.3, 1, 0.3]} />
      <ColliderBox position={[-1.95, 0, -5.18]} scale={[0.3, 1, 0.3]} />
      <ColliderBox position={[-5.55, 0, -3.05]} scale={[0.3, 1, 0.3]} />
      <ColliderBox position={[-4.4, 0, -1.77]} scale={[0.3, 1, 0.3]} />
      <ColliderBox position={[-7.03, 0, -0.76]} scale={[0.3, 1, 0.3]} />
      <ColliderBox position={[-4.75, 0, 2.73]} scale={[0.3, 1, 0.3]} />
      <ColliderBox position={[-3.05, 0, 3.4]} scale={[0.3, 1, 0.3]} />
      <ColliderBox position={[-0.83, 0, 3.2]} scale={[0.3, 1, 0.3]} />
      <ColliderBox position={[-1.85, 0, 0.385]} scale={[0.05, 1, 0.13]} />
      <ColliderBox position={[-1.85, 0, -0.385]} scale={[0.05, 1, 0.13]} />
      <ColliderBox position={[-2.28, 0, 0.385]} scale={[0.05, 1, 0.13]} />
      <ColliderBox position={[-2.28, 0, -0.385]} scale={[0.05, 1, 0.13]} />
      <ColliderBox position={[-4.39, 0, 1.125]} scale={[0.13, 1, 0.13]} />
      <ColliderBox position={[-4.39, 0, 1.9]} scale={[0.13, 1, 0.13]} />
      <ColliderBox position={[-2.86, 0, -0.9]} scale={[0.35, 1, 0.35]} />
      <ColliderBox position={[-3.33, 0, -0.9]} scale={[0.35, 1, 0.35]} />
      <ColliderBox position={[0.41, 0, 2]} scale={[0.35, 1, 0.35]} />
      <ColliderBox position={[-2.3, 0, -2.76]} scale={[1.37, 1, 1.09]} />
      <ColliderBox position={[-3.08, 0, 0.89]} scale={[0.36, 1, 0.03]} />
      <ColliderBox position={[-2.53, 0, 0.89]} scale={[0.36, 1, 0.03]} />
      <ColliderBox position={[-4.53, 0, -0.65]} scale={[0.1, 0.5, 0.1]} />
      <ColliderBox position={[-4.15, 0, -0.67]} scale={[0.1, 0.5, 0.1]} />
      <ColliderBox position={[-4.9, 0, -0.58]} scale={[0.1, 0.5, 0.1]} />
      <ColliderBox position={[-0.3, 0, 1]} scale={[0.1, 0.5, 0.1]} />
      {/* 7.6添加斜坡 */}
      <Ramp />
    </>
  );
};
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

export const CarControl = () => {
  const style = {
    width: "600px",
    height: "400px",
    backgroundColor: "#B3D9D9",
  };
  return (
    <Canvas style={style}>
      <Physics broadphase="SAP" gravity={[0, -2.6, 0]}>
        <RacingCar />
      </Physics>
    </Canvas>
  );
};
