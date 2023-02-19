import * as THREE from "three";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import CameraControls from "camera-controls";

function SampleBox(props) {
  return (
    <>
      <mesh
        castShadow
        receiveShadow
        position={[-3, 0.5, 2]}
        onClick={(e) => props.zoomToView(e.object.position)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.1} color={"#aaa"} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        position={[0, 1, 0]}
        onClick={(e) => props.zoomToView(e.object.position)}
      >
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial roughness={0.1} color={"#aaa"} />
      </mesh>

      <mesh
        castShadow
        receiveShadow
        position={[4, 0.25, -2]}
        onClick={(e) => props.zoomToView(e.object.position)}
      >
        <boxGeometry args={[2, 0.5, 2]} />
        <meshStandardMaterial roughness={0.1} color={"#aaa"} />
      </mesh>
    </>
  );
}

function Floor() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <shadowMaterial attach="material" opacity={0.4} />
      </mesh>
    </>
  );
}

CameraControls.install({ THREE });

function Controls({
  zoom,
  focus,
  pos = new THREE.Vector3(),
  look = new THREE.Vector3(),
}) {
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), []);
  return useFrame((state, delta) => {
    zoom ? pos.set(focus.x, focus.y + 3.0, focus.z + 3.0) : pos.set(0, 5, 5);
    zoom ? look.set(focus.x, focus.y - 3.0, focus.z - 3.0) : look.set(0, 0, 0);

    state.camera.position.lerp(pos, 0.5);
    state.camera.updateProjectionMatrix();

    controls.setLookAt(
      state.camera.position.x,
      state.camera.position.y,
      state.camera.position.z,
      look.x,
      look.y,
      look.z,
      true
    );
    return controls.update(delta);
  });
}

export function FromCamera() {
  const style = {
    width: "600px",
    height: "400px",
    backgroundColor: "#363433",
  };
  const [zoom, setZoom] = useState(false);
  const [focus, setFocus] = useState({});
  return (
    <Canvas
      style={style}
      linear
      colorManagement
      shadows
      camera={{ position: [0, 0, 5] }}
    >
      <ambientLight />
      <directionalLight
        castShadow
        position={[150, 150, 150]}
        intensity={0.55}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <SampleBox
        zoomToView={(focusRef) => (setZoom(!zoom), setFocus(focusRef))}
      />
      <Floor />
      <Controls zoom={zoom} focus={focus} />
    </Canvas>
  );
}
