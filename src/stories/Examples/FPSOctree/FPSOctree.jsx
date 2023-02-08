import React, { useRef, useEffect, useMemo } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Octree } from "three/examples/jsm/math/Octree";
import { OctreeHelper } from "three/examples/jsm/helpers/OctreeHelper";
import { Capsule } from "three/examples/jsm/math/Capsule.js";
import { useControls } from "leva";
import {
  Environment,
  PointerLockControls,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { Sphere, Vector3 } from "three";

//常量 Gravity重力  ballCount球数  radius半径  balls多个球   frameSteps框架步骤;
const Gravity = 30;
const ballCount = 100;
const radius = 0.2;
const balls = [...Array(ballCount)].map(() => ({
  position: [Math.random() * 50 - 25, 20, Math.random() * 50 - 25],
}));
const v1 = new Vector3();
const v2 = new Vector3();
const v3 = new Vector3();
const frameSteps = 5;

//使用八叉助手
const useOctreeHelper = (octree) => {
  const { scene } = useThree();
  useEffect(() => {
    const helper = new OctreeHelper(octree, "hotpink");
    helper.name = "octreeHelper";
    scene.add(helper);
    return () => {
      scene.remove(helper);
    };
  }, [octree, scene]);

  useControls("Octree Helper", {
    visible: {
      value: false,
      //字段的内容时调用函数场景对象名显示=V
      onChange: (v) => {
        scene.getObjectByName("octreeHelper").visible = v;
        //判断文档ID名 文档失去焦点
        if (document.getElementById("Octree Helper.visible"))
          document.getElementById("Octree Helper.visible").blur();
      },
    },
  });
};

//使用八叉
const useOctree = (scene) => {
  const octree = useMemo(() => {
    /* console.log("new Octree"); */
    return new Octree().fromGraphNode(scene);
  }, [scene]);
  return octree;
};

//使用键盘
function useKeyboard() {
  const keyMap = useRef({});

  useEffect(() => {
    const onDocumentKey = (e) => {
      keyMap.current[e.code] = e.type === "keydown";
    };
    document.addEventListener("keydown", onDocumentKey);
    document.addEventListener("keyup", onDocumentKey);
    return () => {
      document.removeEventListener("keydown", onDocumentKey);
      document.removeEventListener("keyup", onDocumentKey);
    };
  });

  return keyMap.current;
}
//播放
const GRAVITY = 30;
const STEPS_PER_FRAME = 5;
//模型调用游戏>播放
const Player = ({ octree, colliders, ballCount }) => {
  const playerOnFloor = useRef(false);
  const playerVelocity = useMemo(() => new Vector3(), []);
  const playerDirection = useMemo(() => new Vector3(), []);
  const capsule = useMemo(
    () => new Capsule(new Vector3(0, 10, 0), new Vector3(0, 11, 0), 0.5),
    []
  );
  const { camera } = useThree();
  let clicked = 0;

  const onPointerDown = () => {
    throwBall(camera, capsule, playerDirection, playerVelocity, clicked++);
  };
  useEffect(() => {
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  });

  useEffect(() => {
    //console.log('adding reference to this capsule collider')
    colliders[ballCount] = { capsule: capsule, velocity: playerVelocity };
  }, [colliders, ballCount, capsule, playerVelocity]);

  const keyboard = useKeyboard();

  function getForwardVector(camera, playerDirection) {
    camera.getWorldDirection(playerDirection);
    playerDirection.y = 0;
    playerDirection.normalize();
    return playerDirection;
  }

  function getSideVector(camera, playerDirection) {
    camera.getWorldDirection(playerDirection);
    playerDirection.y = 0;
    playerDirection.normalize();
    playerDirection.cross(camera.up);
    return playerDirection;
  }

  function controls(
    camera,
    delta,
    playerVelocity,
    playerOnFloor,
    playerDirection
  ) {
    const speedDelta = delta * (playerOnFloor ? 25 : 8);
    keyboard["KeyA"] &&
      playerVelocity.add(
        getSideVector(camera, playerDirection).multiplyScalar(-speedDelta)
      );
    keyboard["KeyD"] &&
      playerVelocity.add(
        getSideVector(camera, playerDirection).multiplyScalar(speedDelta)
      );
    keyboard["KeyW"] &&
      playerVelocity.add(
        getForwardVector(camera, playerDirection).multiplyScalar(speedDelta)
      );
    keyboard["KeyS"] &&
      playerVelocity.add(
        getForwardVector(camera, playerDirection).multiplyScalar(-speedDelta)
      );
    if (playerOnFloor) {
      if (keyboard["Space"]) {
        playerVelocity.y = 15;
      }
    }
  }

  function updatePlayer(
    camera,
    delta,
    octree,
    capsule,
    playerVelocity,
    playerOnFloor
  ) {
    let damping = Math.exp(-4 * delta) - 1;
    if (!playerOnFloor) {
      playerVelocity.y -= GRAVITY * delta;
      damping *= 0.1; // small air resistance
    }
    playerVelocity.addScaledVector(playerVelocity, damping);
    const deltaPosition = playerVelocity.clone().multiplyScalar(delta);
    capsule.translate(deltaPosition);
    playerOnFloor = playerCollisions(capsule, octree, playerVelocity);
    camera.position.copy(capsule.end);
    return playerOnFloor;
  }

  function throwBall(camera, capsule, playerDirection, playerVelocity, count) {
    const { sphere, velocity } = colliders[count % ballCount];

    camera.getWorldDirection(playerDirection);

    sphere.center
      .copy(capsule.end)
      .addScaledVector(playerDirection, capsule.radius * 1.5);

    velocity.copy(playerDirection).multiplyScalar(50);
    velocity.addScaledVector(playerVelocity, 2);
  }

  function playerCollisions(capsule, octree, playerVelocity) {
    const result = octree.capsuleIntersect(capsule);
    let playerOnFloor = false;
    if (result) {
      playerOnFloor = result.normal.y > 0;
      if (!playerOnFloor) {
        playerVelocity.addScaledVector(
          result.normal,
          -result.normal.dot(playerVelocity)
        );
      }
      capsule.translate(result.normal.multiplyScalar(result.depth));
    }
    return playerOnFloor;
  }

  function teleportPlayerIfOob(camera, capsule, playerVelocity) {
    if (camera.position.y <= -100) {
      playerVelocity.set(0, 0, 0);
      capsule.start.set(0, 10, 0);
      capsule.end.set(0, 11, 0);
      camera.position.copy(capsule.end);
      camera.rotation.set(0, 0, 0);
    }
  }

  useFrame(({ camera }, delta) => {
    controls(
      camera,
      delta,
      playerVelocity,
      playerOnFloor.current,
      playerDirection
    );
    const deltaSteps = Math.min(0.05, delta) / STEPS_PER_FRAME;
    for (let i = 0; i < STEPS_PER_FRAME; i++) {
      playerOnFloor.current = updatePlayer(
        camera,
        deltaSteps,
        octree,
        capsule,
        playerVelocity,
        playerOnFloor.current
      );
    }
    teleportPlayerIfOob(camera, capsule, playerVelocity);
  });
};

const SphereCollider = ({
  id,
  radius,
  octree,
  position,
  colliders,
  checkSphereCollisions,
  children,
}) => {
  const ref = useRef();
  //球体
  const sphere = useMemo(
    () => new Sphere(new Vector3(...position), radius),
    [position, radius]
  );
  //速度
  const velocity = useMemo(() => new Vector3(), []);
  //对撞机
  useEffect(() => {
    console.log("adding reference to this sphere collider");
    colliders[id] = { sphere: sphere, velocity: velocity };
  }, [colliders, id, sphere, velocity]);

  //更新球体
  function updateSphere(delta, octree, sphere, velocity) {
    //球体中心 添加缩放向量（速度，delta增量）
    sphere.center.addScaledVector(velocity, delta);
    //结果
    const result = octree.sphereIntersect(sphere);
    //判断结果
    //结果是 -因素 标准 点 速度
    //速度 添加缩放向量  结果.标准, 因素*1.5
    //球体中心 添加 因素 标准  倍增标量 因素深度
    if (result) {
      const factor = -result.normal.dot(velocity);
      velocity.addScaledVector(result.normal, factor * 1.5);

      sphere.center.add(result.normal.multiplyScalar(result.depth));
    } else {
      //速度y -= 重力*增量
      velocity.y -= Gravity * delta;
    }
    //衰减=数学指数
    //速度y 添加缩放向量  (速度,衰减)
    const damping = Math.exp(-1.5 * delta) - 1;
    velocity.addScaledVector(velocity, damping);
    //检查球体碰撞(球体,速度)
    checkSphereCollisions(sphere, velocity);
    //运行钩子，当前，定位 复制 （球体,中心）
    ref.current.position.copy(sphere.center);
  }
  //渲染时 增量步骤=最小 0.05 增量/框架步骤
  //更新球体  增量步骤 八叉树 球体 速度
  useFrame((_, delta) => {
    const deltaSteps = Math.min(0.05, delta) / frameSteps;
    for (let i = 0; i < frameSteps; i++) {
      updateSphere(deltaSteps, octree, sphere, velocity);
    }
  });
  return <group ref={ref}>{children}</group>;
};

//模型调用游戏>球体
const Ball = ({ radius }) => {
  return (
    <mesh castShadow>
      <sphereGeometry args={[radius]} />
      <meshStandardMaterial />
    </mesh>
  );
};

//模型调用游戏
const Game = () => {
  const { nodes, scene } = useGLTF("./SceneTransformed.glb");
  //八叉树 八叉树助手
  const octree = useOctree(scene);
  useOctreeHelper(octree);
  const colliders = useRef([]);
  //检查球体碰撞
  function checkSphereCollisions(sphere, velocity) {
    for (let i = 0, length = colliders.current.length; i < length; i++) {
      const c = colliders.current[i];

      if (c.sphere) {
        const d2 = sphere.center.distanceToSquared(c.sphere.center);
        const r = sphere.radius + c.sphere.radius;
        const r2 = r * r;

        if (d2 < r2) {
          const normal = v1
            .subVectors(sphere.center, c.sphere.center)
            .normalize();
          const impact1 = v2.copy(normal).multiplyScalar(normal.dot(velocity));
          const impact2 = v3
            .copy(normal)
            .multiplyScalar(normal.dot(c.velocity));
          velocity.add(impact2).sub(impact1);
          c.velocity.add(impact1).sub(impact2);
          const d = (r - Math.sqrt(d2)) / 2;
          sphere.center.addScaledVector(normal, d);
          c.sphere.center.addScaledVector(normal, -d);
        }
      } else if (c.capsule) {
        const center = v1
          .addVectors(c.capsule.start, c.capsule.end)
          .multiplyScalar(0.5);
        const r = sphere.radius + c.capsule.radius;
        const r2 = r * r;
        for (const point of [c.capsule.start, c.capsule.end, center]) {
          const d2 = point.distanceToSquared(sphere.center);
          if (d2 < r2) {
            const normal = v1.subVectors(point, sphere.center).normalize();
            const impact1 = v2
              .copy(normal)
              .multiplyScalar(normal.dot(c.velocity));
            const impact2 = v3
              .copy(normal)
              .multiplyScalar(normal.dot(velocity));
            c.velocity.add(impact2).sub(impact1);
            velocity.add(impact1).sub(impact2);
            const d = (r - Math.sqrt(d2)) / 2;
            sphere.center.addScaledVector(normal, -d);
          }
        }
      }
    }
  }
  return (
    <>
      <group dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Suzanne007.geometry}
          material={nodes.Suzanne007.material}
          position={[1.74, 1.04, 24.97]}
        />
      </group>
      {/*  球体对撞机  */}
      {balls.map(({ position }, i) => (
        <SphereCollider
          key={i}
          id={i}
          radius={radius}
          octree={octree}
          position={position}
          colliders={colliders.current}
          checkSphereCollisions={checkSphereCollisions}
        >
          <Ball radius={radius} />
        </SphereCollider>
      ))}

      {/*播放器*/}
      <Player
        ballCount={ballCount}
        octree={octree}
        colliders={colliders.current}
      />
    </>
  );
};

//WASD按键方向封面介绍 重新盖上
const Overlay = () => {
  const DivStyle = {
    color: "white",
    position: "absolute",
    left: "260px",
    top: "10px",
    fontFamily: "monospace",
    textShadow: "1px 1px 2px black",
  };
  return (
    <div style={DivStyle}>
      W,A,S,D 移动.
      <br />
      跳跃的空间.
      <br />
      鼠标点击射击.
    </div>
  );
};

//总页面
export const FPSOctree = () => {
  const style = { width: "600px", height: "400px", backgroundColor: "#eaad1a" };
  return (
    <>
      <Canvas style={style} shadows>
        <directionalLight
          intensity={1}
          castShadow={true}
          shadow-bias={-0.00015}
          shadow-radius={4}
          shadow-blur={10}
          shadow-mapSize={[2048, 2048]}
          position={[85.0, 80.0, 70.0]}
          shadow-camera-left={-30}
          shadow-camera-right={30}
          shadow-camera-top={30}
          shadow-camera-bottom={-30}
        />
        <Environment preset="dawn" background />
        <Game />
        <OrbitControls />
        <PointerLockControls />
      </Canvas>
      <Overlay />
    </>
  );
};
