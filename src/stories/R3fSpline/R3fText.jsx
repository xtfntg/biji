import React from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
function SimpleText() {
  var TextLoader = new THREE.FontLoader();
  TextLoader.load("./RobotoRegular.json", function (font) {
    var xMid, text;

    var color = 0xffffff;

    var matLite = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
    });
    var message = inputText;

    var shapes = font.generateShapes(message, fontSize);

    var geometry = new THREE.ShapeBufferGeometry(shapes);

    geometry.computeBoundingBox();

    xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

    geometry.translate(xMid, 0, 0);

    // make shape ( N.B. edge view not visible )

    text = new THREE.Mesh(geometry, matLite);
    text.position.z = z;
    text.position.y = y;
    text.position.x = x;
    text.rotation.x = -Math.PI * 0.5;

    scene.add(text);
  });
}

export const R3fText = () => {
  const style = { width: "600px", height: "400px", backgroundColor: "#eaad1a" };
  return (
    <Canvas style={style}>
      <SimpleText />
      <mesh>
        <boxGeometry />
        <meshBasicMaterial />
      </mesh>
    </Canvas>
  );
};
