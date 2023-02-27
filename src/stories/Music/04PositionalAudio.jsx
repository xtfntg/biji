import React, { useRef, useState, useEffect } from "react";
import { Canvas, useThree, useLoader } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

const HtmlContent = () => {
  const style = {
    height: "50px",
    padding: "3px",
    /*  borderRadius: "3px", */
    fontSize: "10px",
    border: "1px solid #888888",
    backgroundColor: "#36292f",
    color: "#f97d1c",
    lineHeight: "20px",
  };
  return (
    <Html style={style} fullscreen={true}>
      <p>
        <span>案例 距离远近，声音清晰程度变化 音频分析器使用</span>
        <br />
        <span>
          🤸思路:1添加音乐基本构件 2在运行勾子中添加定位音频 3添加参考距离
          4添加到物体
        </span>
      </p>
      <br />
    </Html>
  );
};

const Audio = ({ url }) => {
  const sound = useRef(() => new THREE.PositionalAudio(listener));
  const { camera } = useThree();
  const [listener] = useState(() => new THREE.AudioListener());
  const buffer = useLoader(THREE.AudioLoader, url);
  useEffect(() => {
    //声音.设置缓冲
    sound.current.setBuffer(buffer);
    //声音.开始播放
    sound.current.play();
    //声音.设置音量
    sound.current.setVolume(1);
    //声音.参考距离(音频源远离听众时降低音)
    sound.current.setRefDistance(1);
    camera.add(listener);
    return () => camera.remove(listener);
  }, []);

  return <positionalAudio ref={sound} args={[listener]} />;
};

const Box = ({ url, position, color }, props) => {
  return (
    <mesh position={position} {...props}>
      <boxGeometry />
      <meshBasicMaterial color={color} />
      <Audio url={url} />
    </mesh>
  );
};

export const PositionalAudio = () => {
  const style = { width: "600px", height: "400px", backgroundColor: "#eaad1a" };
  return (
    <Canvas style={style}>
      <Box position={[-5, 0, 0]} url="/Beyond.mp3" color="#0ff" />
      <Box position={[5, 0, 0]} url="/Rxys.mp3" color="#f0f" />
      <HtmlContent />
      <OrbitControls />
    </Canvas>
  );
};
