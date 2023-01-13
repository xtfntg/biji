import React, { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";

const KeyControlUse = () => {
  //1.1输入状态 设置状态 前后左右 shift 跳为默认状态
  const [input, setInput] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    shift: false,
    jump: false,
  });
  //1.3键映射
  const keys = {
    KeyW: "forward",
    KeyS: "backward",
    KeyA: "left",
    KeyD: "right",
    ShiftLeft: "shift",
    Space: "jump",
  };
  //2.1  函数 值 返回对对象值 键与正确的的值返回字符串 更新正确的布尔值
  const findKey = (key) => keys[key];
  //3.1创建效果 数组为空时
  useEffect(() => {
    //3.4布尔的变量是真还是假 打开或关闭哪个变量
    //使用findKey键事件中传递e e中的值
    const handleKeyDown = (e) => {
      //3.5.我们把整个设置状态 ([input,setI... jump: false)
      //>提取现有的状态{ ...m,}
      //>找键值findKey
      //>哪里的字符串等于关键代码(e.code)>
      //>如输入W键 键映射 意识到它需要前进 状态forward为真
      setInput((m) => ({ ...m, [findKey(e.code)]: true }));
    };
    //3.6键抬起  状态forward为假
    const handleKeyUp = (e) => {
      setInput((m) => ({ ...m, [findKey(e.code)]: false }));
    };
    //3.3添加事件监听器 添加键按下 抬起键 两个事件将起动
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    //3.7清理工作再使用效果 删除事件侦听器
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
    //3.2数组为空时 添加事件监听器
  }, []);
  //1.2返回实际输入本身
  return input;
};

const LoadModelKeyAnimation = () => {
  //4.1使用状态
  const { forward, backward, left, right, shift, jump } = KeyControlUse();
  const model = useGLTF("./BoyAnimation.glb");
  //console.log(model);
  const { actions } = useAnimations(model.animations, model.scene);

  //5.1按下相关的键切换动画,需要知道当前进行的动作是什么 创建新变量 当前的操作
  //当前动画函数 使用useRef参考钩子 初始化为空字符串
  const currentAction = useRef();
  useEffect(() => {
    //4.2 注销播放
    /*  actions?.Walking?.play(); */
    //4.4添加控制台测试 通过判断键 做为字符串"forard"  然后实际的布尔变量forward 检查在给定时间内的状态
    //4.5现在我们知道可以获得用户输入
    //4.6注释测试
    /* console.log("forard", forward);
    console.log("backward", backward);
    console.log("left", left);
    console.log("right", right);
    console.log("shift", shift);
    console.log("jump", jump); */
    //4.3数组中添加依赖项[]想让物体运动 每次变量值发生变化
    //6.1创建新变量 动画为空
    let action = "";
    //6.2走路检查 如果前后左右动画是走路,如果不走路我们动画为空闲,如果是跳跃动画为跳跃 在走路检查shift被按下 将动画设置为跑
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
    //6.3 当前动做是否正确 参考当前值与动画值确实不相等
    if (currentAction.current != action) {
      //6.4创建变量 =它会抓取动画 如果走路是下一个动作 设置为步行
      const nextActionToPlay = actions[action];
      //6.5当前的动画基本上就是动作
      const current = actions[currentAction.current];
      //6.6淡出之前
      current?.fadeOut(0.2);
      //6.7重新开始播放新的
      nextActionToPlay?.reset().fadeIn(0.2).play();
      //6.8更新引用当前操作
      currentAction.current = action;
    }
  }, [forward, backward, left, right, shift, jump]);
  return <primitive object={model.scene} />;
};

export const KeyControl = () => {
  const style = {
    width: "600px",
    height: "400px",
    backgroundColor: "#620",
  };
  return (
    <Canvas style={style} camera={{ fov: 23, position: [10, 10, 15] }} shadows>
      <ambientLight intensity={1} />
      <LoadModelKeyAnimation />
      <OrbitControls />
    </Canvas>
  );
};
