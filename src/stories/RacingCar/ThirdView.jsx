import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  Environment,
  MeshReflectorMaterial,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import {
  BufferAttribute,
  NotEqualDepth,
  Quaternion,
  Vector3,
  Mesh,
} from "three";

import {
  Physics,
  useBox,
  useRaycastVehicle,
  usePlane,
  useCompoundBody,
  useTrimesh,
} from "@react-three/cannon";

const Ramp = () => {
  const result = useLoader(GLTFLoader, "/models/ramp.glb");

  const geometry = result.scene.children[0].geometry;

  const vertices = geometry.attributes.position.array;

  const indices = geometry.index.array;

  const [ref] = useTrimesh(
    () => ({
      args: [vertices, indices],
      mass: 0,
      type: "Static",
    }),
    useRef(null)
  );
};

const ColliderBox = ({ position, scale }) => {
  useBox(() => ({
    args: scale,
    position,

    type: "Static",
  }));

  return (
    debug && (
      <mesh position={position}>
        <boxGeometry args={scale} />
        <meshBasicMaterial transparent={true} opacity={0.25} />
      </mesh>
    )
  );
};

const useControls = (vehicleApi, chassisApi) => {
  let [controls, setControls] = useState({
    /*  w: boolean,
    a: boolean,
    s: boolean,
    d: boolean,
    r: boolean, */
  });

  useEffect(() => {
    const keyDownPressHandler = (e) => {
      setControls((controls) => ({
        ...controls,
        [e.key.toLowerCase()]: true,
      }));
    };

    const keyUpPressHandler = (e) => {
      setControls((controls) => ({
        ...controls,
        [e.key.toLowerCase()]: false,
      }));
    };

    window.addEventListener("keydown", keyDownPressHandler);
    window.addEventListener("keyup", keyUpPressHandler);
    return () => {
      window.removeEventListener("keydown", keyDownPressHandler);
      window.removeEventListener("keyup", keyUpPressHandler);
    };
  }, []);

  useEffect(() => {
    if (controls.w) {
      vehicleApi.applyEngineForce(150, 2);
      vehicleApi.applyEngineForce(150, 3);
    } else if (controls.s) {
      vehicleApi.applyEngineForce(-150, 2);
      vehicleApi.applyEngineForce(-150, 3);
    } else {
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
    }

    if (controls.a) {
      vehicleApi.setSteeringValue(0.35, 2);
      vehicleApi.setSteeringValue(0.35, 3);
      vehicleApi.setSteeringValue(-0.1, 0);
      vehicleApi.setSteeringValue(-0.1, 1);
    } else if (controls.d) {
      vehicleApi.setSteeringValue(-0.35, 2);
      vehicleApi.setSteeringValue(-0.35, 3);
      vehicleApi.setSteeringValue(0.1, 0);
      vehicleApi.setSteeringValue(0.1, 1);
    } else {
      for (let i = 0; i < 4; i++) {
        vehicleApi.setSteeringValue(0, i);
      }
    }
    //3.1车上坡动作设置 添加箭头 会产生局部的脉冲，作用物体上的力 箭头向下
    if (controls.arrowdown)
      //3.2本地脉冲(方向与强度) 车尾施加脉冲
      chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, +1]);
    //3.3箭头上;
    if (controls.arrowup) chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, -1]);
    //3.4箭头左;侧翻
    if (controls.arrowleft)
      chassisApi.applyLocalImpulse([0, -5, 0], [-0.5, 0, 0]);
    //3.4箭头右;
    if (controls.arrowright)
      chassisApi.applyLocalImpulse([0, -5, 0], [+0.5, 0, 0]);

    //3.5 R键重置位 设置空状态
    if (controls.r) {
      //3.5.1设置回空闲状态
      chassisApi.position.set(-1.5, 0.5, 3);
      //3.5.2重置速度
      chassisApi.velocity.set(0, 0, 0);
      //3.5.3 车的角的速度
      chassisApi.angularVelocity.set(0, 0, 0);
      //3.5.4 车的旋转
      chassisApi.rotation.set(0, 0, 0);
    }
  }, [controls, vehicleApi, chassisApi]);

  return controls;
};
//2.1 关闭调试注释
//const debug = true;
const debug = false;

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
//6.1添回参数属性
const Car = ({ thirdPerson }) => {
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

  useControls(vehicleApi, chassisApi);

  //6.2修改相机的位置 添回执行回调的钩子
  useFrame((state) => {
    if (!thirdPerson) return;
    //6.2.1 创建位置向量
    let position = new Vector3(0, 0, 0);
    //6.2.2位置 将此向量设置为 变换矩阵 m的位置元素  汽车当前 矩阵界面
    position.setFromMatrixPosition(chassisBody.current.matrixWorld);
    //6.3.1 创建四元素
    let quaternion = new Quaternion(0, 0, 0, 0);
    //6.3.2 四元素 旋转矩阵  汽车当前 矩阵界面
    quaternion.setFromRotationMatrix(chassisBody.current.matrixWorld);

    //6.4  汽车追踪方向 汽车指向哪里 汽车向前行驶时 向量车对的轴向= 向量 创徤新向量
    //汽车移动时 正在向负方向移动时 而不在正的Z轴上 把Vector3(0, 0, 1);改Vector3(0, 0, -1)
    let wDir = new Vector3(0, 0, -1);
    //6.4.1 生成汽车向量方法 指向面对的方向  应用四元数
    wDir.applyQuaternion(quaternion);
    //6.4.2 W键方向
    wDir.normalize();

    //6.5小修正 设置相机的位置
    let cameraPosition = position
      .clone()
      //6.5.1为了达到哪里 需要车的位置 汽车面对的方向与+相返的向量 +轴的偏移量
      .add(wDir.clone().multiplyScalar(-1).add(new Vector3(0, 0.3, 0)));

    //6.5.2设置汽车的位置
    state.camera.position.copy(cameraPosition);
    //6.5.3 对着镜头，看到车的中心
    state.camera.lookAt(position);
  });

  useEffect(() => {
    mesh.scale.set(0.0012, 0.0012, 0.0012);
    mesh.children[0].position.set(-365, -18, -67);
  }, [mesh]);

  return (
    <group ref={vehicle} name="vehicle">
      {/* 1.2取销汽车模型注释 */}
      <group ref={chassisBody} name="chassisBody">
        <primitive
          object={mesh}
          rotation-y={Math.PI}
          position={[0, -0.09, 0]}
        />
      </group>
      {/* 1.1注释占位符 */}
      {/*  <mesh ref={chassisBody}>
        <boxGeometry args={chassisBodyArgs} />
        <meshBasicMaterial transparent={true} opacity={0.5} />
      </mesh> */}
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
    <>
      <mesh geometry={geometry}>
        {/* <primitive object={geometry} attach={"geometry"} /> */}
        <meshBasicMaterial toneMapped={false} map={colorMap} />
      </mesh>

      <ColliderBox position={[1.75, 0, 0.5]} scale={[0.3, 1, 0.3]} />

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

      <Ramp />
    </>
  );
};
const RacingCar = () => {
  // 7.1第三人称初始化改为frue
  const [thirdPerson, setThirdPerson] = useState(false);
  const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21]);
  //7.2添加效果
  useEffect(() => {
    //7.2.1按键处理程序
    function keydownHandler(e) {
      //7.2.4 k键 检查第三人称是真的 关闭相机位置 新状态打开或关闭第三人称 翻转变量
      //关闭后指定相机位置 重置相机位置 随机位置
      if (e.key == "k") {
        if (thirdPerson)
          setCameraPosition([-6, 3.9, 6.21 + Mesh.random() + 0.01]);
        setThirdPerson(!thirdPerson);
      }
    }
    //7.2.2 添加处理程序
    window.addEventListener("keydown", keydownHandler);
    //7.2.3 删除处理程序
    return () => window.removeEventListener("keydown", keydownHandler);
  }, [thirdPerson]);

  return (
    <Suspense fallback={null}>
      <Environment files={"/textures/envmap.hdr"} background={"both"} />
      <Track />
      <Ground />
      {/* 5.1 添加前手动更新相机位置 */}
      {/* <Car /> */}
      {/* 5.2 添加后手动更新相机位置 */}
      <Car thirdPerson={thirdPerson} />
      {/* 7.2 修改位置状态 position={[-6, 3.9, 6.21]} position={cameraPosition}改*/}
      <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />
      {/* 4.1 添加前注释窗口控制*/}
      {/* <OrbitControls target={[-2.64, -0.71, 0.03]} /> */}
      {/* 4.2 添加后切换第三角度 从上面跟着车*/}
      {!thirdPerson && <OrbitControls target={[-2.64, -0.71, 0.03]} />}
    </Suspense>
  );
};

export const ThirdView = () => {
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
