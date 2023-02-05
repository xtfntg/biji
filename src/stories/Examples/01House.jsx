import react, { Suspense, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { House3D } from "./01House3D";
import {
  OrbitControls,
  Environment,
  Html,
  FlyControls,
} from "@react-three/drei";
import "./styles.css";
import annotations from "./annotations.json";

const Annotations = ({ selected, gotoAnnotation }) => {
  return (
    <>
      {annotations.map((a, i) => {
        return (
          <Html key={i} position={[a.lookAt.x, a.lookAt.y, a.lookAt.z]}>
            <svg
              height="34"
              width="34"
              transform="translate(-16 -16)"
              style={{ cursor: "pointer" }}
            >
              <circle
                cx="17"
                cy="17"
                r="16"
                stroke="white"
                strokeWidth="2"
                fill="rgba(0,0,0,.66)"
                onClick={() => gotoAnnotation(i)}
              />
              <text
                x="12"
                y="22"
                fill="white"
                fontSize={17}
                fontFamily="monospace"
                style={{ pointerEvents: "none" }}
              >
                {i + 1}
              </text>
            </svg>
            {a.description && i === selected && (
              <div
                id={"desc_" + i}
                className="annotationDescription"
                dangerouslySetInnerHTML={{ __html: a.description }}
              />
            )}
          </Html>
        );
      })}
    </>
  );
};

const Buttons = ({ gotoAnnotation }) => {
  return (
    <div id="annotationsPanel">
      <ul>
        {annotations.map((a, i) => {
          return (
            <li key={i}>
              <button
                key={i}
                className="annotationButton"
                onClick={() => gotoAnnotation(i)}
              >
                {a.title}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Animate = ({ controls, lerping, to, target }) => {
  useFrame(({ camera }, delta) => {
    if (lerping) {
      camera.position.lerp(to, delta * 2);
      controls.current.target.lerp(target, delta * 2);
    }
  });
};

export const House = () => {
  const style = { width: "600px", height: "400px" };
  //添加运行挂钩
  const ref = useRef();
  //1.1添加画面事件 读取数据 设置读取数据
  const [lerping, setLerping] = useState(false);
  // 到  设置到
  const [to, setTo] = useState();
  //目标 设定目标
  const [target, setTarget] = useState();
  //选定，设置选定
  const [selected, setSelected] = useState(-1);

  //1.2到注解(身份证)
  function gotoAnnotation(idx) {
    //设置到
    setTo(annotations[idx].camPos);
    //设定目标
    setTarget(annotations[idx].lookAt);
    //设置选定(身份证)
    setSelected(idx);
    //设置读取数据(真)
    setLerping(true);
  }

  return (
    <Suspense fallback={null}>
      <Canvas
        style={style}
        camera={{ position: [8, 2, 12] }}
        onPointerDown={() => setLerping(false)}
        onWheel={() => setLerping(false)}
      >
        <OrbitControls ref={ref} target={[8, 2, 3]} />
        <Environment preset="dawn" background blur={0.75} />
        <House3D />
        <Annotations selected={selected} gotoAnnotation={gotoAnnotation} />
        <Animate controls={ref} lerping={lerping} to={to} target={target} />
      </Canvas>
      <Buttons gotoAnnotation={gotoAnnotation} />
    </Suspense>
  );
};
