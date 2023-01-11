import React, { useEffect, useState, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
//4.5
import * as THREE from "three";
//4.1 走的方向
let walkDirection = new THREE.Vector3();
//4.2 旋转角度
let rotateAngle = new THREE.Vector3(0, 1, 0);
//4.3 旋转四元数
let rotateQuarternion = new THREE.Quaternion();
//4.4 相机目标
let cameraTarget = new THREE.Vector3();
//3.1添加方向偏移函数
const directionOffset = ({ forward, backward, left, right }) => {
  //3.2哪一个成为中心 或起点
  var directionOffset = 0;
  //3.3如果按下前进键 来判断前进与离开 偏移量是多少
  if (forward) {
    if (left) {
      directionOffset = Math.PI / 4;
    } else if (right) {
      directionOffset = -Math.PI / 4;
    }
  } else if (backward) {
    if (left) {
      directionOffset = Math.PI / 4 + Math.PI / 2;
    } else if (right) {
      directionOffset = -Math.PI / 4 - Math.PI / 2;
    } else {
      directionOffset = Math.PI;
    }
  } else if (left) {
    directionOffset = Math.PI / 2;
  } else if (right) {
    directionOffset = -Math.PI / 2;
  }
  return directionOffset;
};
const KeyControlUse = () => {
  const [input, setInput] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    shift: false,
    jump: false,
  });
  const keys = {
    KeyW: "forward",
    KeyS: "backward",
    KeyA: "left",
    KeyD: "right",
    ShiftLeft: "shift",
    Space: "jump",
  };
  const findKey = (key) => keys[key];
  useEffect(() => {
    const handleKeyDown = (e) => {
      setInput((m) => ({ ...m, [findKey(e.code)]: true }));
    };

    const handleKeyUp = (e) => {
      setInput((m) => ({ ...m, [findKey(e.code)]: false }));
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  return input;
};

const LoadModelKeyAnimation = () => {
  const { forward, backward, left, right, shift, jump } = KeyControlUse();
  const model = useGLTF("./BoyKeyAnimation.glb");
  const { actions } = useAnimations(model.animations, model.scene);
  const currentAction = useRef();

  //1.1创建控制参考
  const controlsRef = useRef();
  //1.3创建相机位置对的镜头进入相机 状态是相机
  const camera = useThree((state) => state.camera);

  //5.1更新相机目标，让摄像机对模型
  const updateCameraTarget = (moveX, moveZ) => {
    //5.2得到相机的位置
    camera.position.x += moveX;
    camera.position.z += moveZ;
    //5.3 相机目标 根据模型更新目标
    cameraTarget.x = model.scene.position.x;
    cameraTarget.y = model.scene.position.y + 2;
    cameraTarget.z = model.scene.position.z;
    //5.4检查控制器是否在 更新目标
    if (controlsRef.current) controlsRef.current.target = cameraTarget;
  };
  useEffect(() => {
    let action = "";
    if (forward || backward || left || right) {
      action = "Walking";
      if (shift) {
        action = "Running";
      }
    } else if (jump) {
      action = "Jumping";
    } else {
      action = "Idle";
    }
    if (currentAction.current != action) {
      const nextActionToPlay = actions[action];
      const current = actions[currentAction.current];
      current?.fadeOut(0.2);
      nextActionToPlay?.reset().fadeIn(0.2).play();
      currentAction.current = action;
    }
  }, [forward, backward, left, right, shift, jump]);
  //2.1使用框架 接收状态与使用时间
  useFrame((state, delta) => {
    if (
      currentAction.current == "Running" ||
      currentAction.current == "Walking"
    ) {
      //2.2测试模型移动按一个方向移动
      /*  model.scene.position.x += 0.1; */
      //2.3朝相机方向计算 角度Y相机方向
      let angleYCameraDirection = Math.atan2(
        camera.position.x - model.scene.position.x,
        camera.position.z - model.scene.position.z
      );
      //3.4新方向偏移
      let newDirectionOffset = directionOffset({
        forward,
        backward,
        left,
        right,
      });
      //4.6旋转模型 从轴角度设置当前旋转角度
      rotateQuarternion.setFromAxisAngle(
        //4.7当前旋转角度
        rotateAngle,
        //4.8朝相机方向计算+新方向偏移 让模型在正确的角度上
        angleYCameraDirection + newDirectionOffset
      );
      model.scene.quaternion.rotateTowards(rotateQuarternion, 0.2);
      //4.9计算方向 我们要把一个向量3传递给get参数对象 摄像机方向
      camera.getWorldDirection(walkDirection);
      //4.10 方向Y为0
      walkDirection.y = 0;
      //4.11 方向归一
      walkDirection.normalize();
      //4.12 应用新的旋转角度 新的方向设定 在这个方向上增加速度 为角色移动方向添加速度
      walkDirection.applyAxisAngle(rotateAngle, newDirectionOffset);

      //4.13 添加速度 首先确定速度 有一个运行的动画角色正在奔跑 移动它 在哪个方向更快 检查速度
      const velocity = currentAction.current == "Running" ? 10 : 5;
      //4.14将速度加到字符串上,确定x与z沿的哪个方向走 速度*时间
      const moveX = walkDirection.x * velocity * delta;
      const moveZ = walkDirection.z * velocity * delta;
      //4.15模型位置 速度时间字符串
      model.scene.position.x += moveX;
      model.scene.position.z += moveZ;
      //5.5调用更新相机目标 传给移动X移动Y
      updateCameraTarget(moveX, moveZ);
    }
  });

  return (
    <>
      {/* 1.2 添加轨道控制器参考 */}
      <OrbitControls ref={controlsRef} />
      <primitive object={model.scene} />;
    </>
  );
};

export const AnimationControl = () => {
  const style = {
    width: "400px",
    height: "400px",
    backgroundColor: "#341",
  };
  return (
    <Canvas style={style} camera={{ fov: 23, position: [10, 10, 15] }} shadows>
      <ambientLight intensity={1} />
      <LoadModelKeyAnimation />
      <mesh rotation={[Math.PI / -2, 0, 0]}>
        <planeBufferGeometry args={[50, 50]} />
        <meshBasicMaterial color={"#ff6"} />
      </mesh>
    </Canvas>
  );
};
