import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

/* import { OrbitControls } from "@react-three/drei"; */

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const clock = new THREE.Clock();

// idle | pointer-down | look | move && 空闲 | 向下指针 | 看 | 移动
var state = "idle";
//Canvas.style.cursor = "pointer";
//移动目标
var moveTarget = new THREE.Vector2();
//经 纬度
var [lat, lon] = [0, -Math.PI / 2];

//使用控件函数
const useControls = () => {
  let [controls, setControls] = useState({});
  useEffect(() => {
    const onMouseDown = (e) => {
      state = "pointer-down";
    };
    const onMouseUp = (e) => {
      Canvas.style.cursor = "pointer";
      if (state == "pointer-down") {
        state = "move";
        ring.visible = false;
        moveTarget.set(ring.position.x, ring.position.z);
      }

      if (state == "look") {
        state = "idle";
      }
    };
    const onMouseMove = (e) => {
      if (state === "pointer-down") {
        state = "look";
        ring.visible = false;
      }

      if (state == "look") {
        canvas.style.cursor =
          'url("https://cdn.glitch.com/57a4091e-0523-4d9a-b8e2-60e3176cb15e%2Ficons8-hand-rock-25.png?v=1622746546186"), default';

        lat += event.movementY * 0.005;
        lon -= event.movementX * 0.005;
        const R = 10;
        const [x, z, y] = [
          R * Math.cos(lat) * Math.cos(lon),
          R * Math.cos(lat) * Math.sin(lon),
          R * Math.sin(lat),
        ];

        camera.lookAt(new THREE.Vector3(x, y, z).add(camera.position));
      }

      if (state === "idle") {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
      }
    };
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);
  return controls;
};

/* const jianhu=()=>{
useFrame(() => {
    const dt = clock.getDelta();
    requestAnimationFrame(update);

    if (state === "idle") {
      raycaster.setFromCamera(mouse, camera);
      const intersect = raycaster.intersectObject(plane);
      if (intersect.length > 0) {
        const inter = intersect[0];
        ring.visible = true;
        ring.position.set(inter.point.x, 0.05, inter.point.z);
      } else {
        ring.visible = false;
      }
    }

    if (state == "move") {
      const current = new THREE.Vector2(camera.position.x, camera.position.z);
      const speed = 6;

      if (current.distanceTo(moveTarget) < 0.05) {
        state = "idle";
        ring.visible = false;
        return;
      }

      const step = moveTarget
        .clone()
        .sub(current)
        .normalize()
        .multiplyScalar(speed * dt);
      camera.position.add(new THREE.Vector3(step.x, 0, step.y));
    }
  });
} */

//创业跟随环3.1
const Ring = () => {
  //3.2 视口=画布 3d 单位(米)
  const { viewport } = useThree();
  //3.3 使用信息钩子
  const ref = useRef();
  //3.4 使用框架  鼠标
  useFrame(({ mouse }) => {
    /*  const x = (mouse.x / viewport.width) * 2 - 1;
    const y = (mouse.y / viewport.width) * 2 + 1; */
    //3.5位置  鼠标X*视口.高/2 鼠标y*视口.宽/2
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    //3.6信息当前位置.
    ref.current.position.set(x, y, 0);
    ref.current.rotation.set(-y, x, 0);
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / -2, 0, 0]} position={[0, 0.01, 0]}>
      <ringBufferGeometry args={[0.3, 0.36, 64]} />
      <meshBasicMaterial
        color={"#fff"}
        transparent={true}
        opacity={0.5}
        //visible={false}
        visible={true}
      />
    </mesh>
  );
};
//创建平面2.1
const FloorMesh = () => {
  return (
    <mesh rotation={[Math.PI / -2, 0, 0]}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color={"#5555ff"} />
    </mesh>
  );
};

export const FloorInteractive = () => {
  const style = {
    width: "500px",
    height: "400px",
    backgroundColor: "#000",
  };
  return (
    <Canvas style={style} camera={{ fov: 75, position: [0, 1, 7] }} shadows>
      <ambientLight intensity={0.1} />
      <pointLight
        position={[0, 2, 0]}
        color={"#fff"}
        intensity={1}
        distance={100}
      />
      <FloorMesh />
      <Ring />
    </Canvas>
  );
};
