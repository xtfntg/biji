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
    //3.1????????????????????? ???????????? ???????????????????????????????????????????????? ????????????
    if (controls.arrowdown)
      //3.2????????????(???????????????) ??????????????????
      chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, +1]);
    //3.3?????????;
    if (controls.arrowup) chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, -1]);
    //3.4?????????;??????
    if (controls.arrowleft)
      chassisApi.applyLocalImpulse([0, -5, 0], [-0.5, 0, 0]);
    //3.4?????????;
    if (controls.arrowright)
      chassisApi.applyLocalImpulse([0, -5, 0], [+0.5, 0, 0]);

    //3.5 R???????????? ???????????????
    if (controls.r) {
      //3.5.1?????????????????????
      chassisApi.position.set(-1.5, 0.5, 3);
      //3.5.2????????????
      chassisApi.velocity.set(0, 0, 0);
      //3.5.3 ??????????????????
      chassisApi.angularVelocity.set(0, 0, 0);
      //3.5.4 ????????????
      chassisApi.rotation.set(0, 0, 0);
    }
  }, [controls, vehicleApi, chassisApi]);

  return controls;
};
//2.1 ??????????????????
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
//6.1??????????????????
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

  //6.2????????????????????? ???????????????????????????
  useFrame((state) => {
    if (!thirdPerson) return;
    //6.2.1 ??????????????????
    let position = new Vector3(0, 0, 0);
    //6.2.2?????? ????????????????????? ???????????? m???????????????  ???????????? ????????????
    position.setFromMatrixPosition(chassisBody.current.matrixWorld);
    //6.3.1 ???????????????
    let quaternion = new Quaternion(0, 0, 0, 0);
    //6.3.2 ????????? ????????????  ???????????? ????????????
    quaternion.setFromRotationMatrix(chassisBody.current.matrixWorld);

    //6.4  ?????????????????? ?????????????????? ????????????????????? ?????????????????????= ?????? ???????????????
    //??????????????? ??????????????????????????? ???????????????Z?????? ???Vector3(0, 0, 1);???Vector3(0, 0, -1)
    let wDir = new Vector3(0, 0, -1);
    //6.4.1 ???????????????????????? ?????????????????????  ???????????????
    wDir.applyQuaternion(quaternion);
    //6.4.2 W?????????
    wDir.normalize();

    //6.5????????? ?????????????????????
    let cameraPosition = position
      .clone()
      //6.5.1?????????????????? ?????????????????? ????????????????????????+??????????????? +???????????????
      .add(wDir.clone().multiplyScalar(-1).add(new Vector3(0, 0.3, 0)));

    //6.5.2?????????????????????
    state.camera.position.copy(cameraPosition);
    //6.5.3 ?????????????????????????????????
    state.camera.lookAt(position);
  });

  useEffect(() => {
    mesh.scale.set(0.0012, 0.0012, 0.0012);
    mesh.children[0].position.set(-365, -18, -67);
  }, [mesh]);

  return (
    <group ref={vehicle} name="vehicle">
      {/* 1.2???????????????????????? */}
      <group ref={chassisBody} name="chassisBody">
        <primitive
          object={mesh}
          rotation-y={Math.PI}
          position={[0, -0.09, 0]}
        />
      </group>
      {/* 1.1??????????????? */}
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
  // 7.1???????????????????????????frue
  const [thirdPerson, setThirdPerson] = useState(false);
  const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21]);
  //7.2????????????
  useEffect(() => {
    //7.2.1??????????????????
    function keydownHandler(e) {
      //7.2.4 k??? ??????????????????????????? ?????????????????? ???????????????????????????????????? ????????????
      //??????????????????????????? ?????????????????? ????????????
      if (e.key == "k") {
        if (thirdPerson)
          setCameraPosition([-6, 3.9, 6.21 + Mesh.random() + 0.01]);
        setThirdPerson(!thirdPerson);
      }
    }
    //7.2.2 ??????????????????
    window.addEventListener("keydown", keydownHandler);
    //7.2.3 ??????????????????
    return () => window.removeEventListener("keydown", keydownHandler);
  }, [thirdPerson]);

  return (
    <Suspense fallback={null}>
      <Environment files={"/textures/envmap.hdr"} background={"both"} />
      <Track />
      <Ground />
      {/* 5.1 ????????????????????????????????? */}
      {/* <Car /> */}
      {/* 5.2 ????????????????????????????????? */}
      <Car thirdPerson={thirdPerson} />
      {/* 7.2 ?????????????????? position={[-6, 3.9, 6.21]} position={cameraPosition}???*/}
      <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />
      {/* 4.1 ???????????????????????????*/}
      {/* <OrbitControls target={[-2.64, -0.71, 0.03]} /> */}
      {/* 4.2 ??????????????????????????? ??????????????????*/}
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
