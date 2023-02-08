import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Vector3 } from "three";
import { useControls, button } from "leva";
import DataAnnotations from "./DataAnnotations.json";

const Arena = ({ controls, lerping, setLerping }) => {
  const { scene } = useGLTF("./CollisionWorld.glb");
  const [to, setTo] = useState(new Vector3(10, 10, 10));
  const [target, setTarget] = useState(new Vector3(0, 1, 0));

  useControls("Camera", () => {
    console.log("creating buttons");

    // using forEach
    // const _buttons = {}
    // annotations.forEach((a) => {
    //   _buttons[a.title] = button(() => {
    //     setTo(a.position)
    //     setTarget(a.lookAt)
    //     setLerping(true)
    //   })
    // })
    // return _buttons

    // using reduce
    const _buttons = DataAnnotations.reduce(
      (acc, a) =>
        Object.assign(acc, {
          [a.title]: button(() => {
            setTo(a.position);
            setTarget(a.lookAt);
            setLerping(true);
          }),
        }),
      {}
    );
    return _buttons;
  });

  useFrame(({ camera }, delta) => {
    if (lerping) {
      camera.position.lerp(to, delta);
      controls.current.target.lerp(target, delta);
    }
  });
  return (
    <>
      <primitive
        object={scene.children[0]}
        castShadow
        receiveShadow
        material-envMapIntensity={0.4}
        onDoubleClick={(e) => {
          setTo(e.camera.position.clone());
          setTarget(e.intersections[0].point.clone());
          setLerping(true);
        }}
      />
      ;
    </>
  );
};

export const CameraExample = () => {
  const style = { width: "600px", height: "400px", backgroundColor: "#363433" };
  const ref = useRef();
  const [lerping, setLerping] = useState(false);
  return (
    <Canvas style={style} camera={{ position: [10, 10, 10] }} shadows>
      <directionalLight
        intensity={1}
        castShadow
        shadow-bias={-0.0002}
        shadow-mapSize={[2048, 2048]}
        position={[85.0, 80.0, 70.0]}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      <Environment preset="dawn" background />
      <OrbitControls ref={ref} target={[0, 1, 0]} />
      <Arena controls={ref} lerping={lerping} setLerping={setLerping} />
    </Canvas>
  );
};
