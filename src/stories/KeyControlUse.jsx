import { useState, useEffect } from "react";

export const KeyControlUse = () => {
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
