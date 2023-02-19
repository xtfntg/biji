import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import { EffectComposer, Outline } from "@react-three/postprocessing";

import { OrbitControls } from "@react-three/drei";

function Box({ onHover, ...props }) {
  const ref = useRef();
  useFrame(
    (state, delta) => (ref.current.rotation.x = ref.current.rotation.y += delta)
  );
  return (
    <mesh
      ref={ref}
      {...props}
      /*  滑入时触发事件 */
      onPointerOver={(e) => onHover(ref)}
      /*滑出时触发事件 */
      onPointerOut={(e) => onHover(null)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshLambertMaterial />
    </mesh>
  );
}

export function UseEffectsA() {
  const [hovered, onHover] = useState(null);
  const selected = hovered ? [hovered] : undefined;

  const style = {
    width: "600px",
    height: "400px",
    backgroundColor: "#c6dfc8",
  };
  return (
    <Canvas style={style} dpr={[1, 2]}>
      <Box onHover={onHover} position={[0, 0, 0]} />
      {/* 多重采样 */}
      <EffectComposer multisampling={5} autoClear={false}>
        <Outline
          blur
          selection={selected}
          visibleEdgeColor="green"
          edgeStrength={10}
          width={500}
        />
      </EffectComposer>
      <OrbitControls makeDefault />
    </Canvas>
  );
}
