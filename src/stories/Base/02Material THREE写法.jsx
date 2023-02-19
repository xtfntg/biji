/* !--石材 开始*/
import * as THREE from "three";
export function MarbleMaterial() {
  //爵士白特性
  const JazzWhiteProps = useTexture({
    map: new THREE.TextureLoader().load("denim/denimDiff.jpg"),
    displacementMap: new THREE.TextureLoader().load("denim/denimDisp.png"),
    normalMap: new THREE.TextureLoader().load("denim/denimRough.jpg"),
  });
  //爵士白
  const JazzWhite = new THREE.MeshLambertMaterial({ ...JazzWhiteProps });

  //黑白根特性
  const BlackAndWhiteRootProps = useTexture({
    map: "./denim/denimDiff.jpg",
    displacementMap: "./denim/denimDisp.png",
    normalMap: "./denim/denimRough.jpg",
    roughnessMap: "Marble062_REFL_2K.jpg",
  });
  //黑白根
  let BlackAndWhiteRoot = new THREE.MeshPhysicalMaterial({
    ...BlackAndWhiteRootProps,
  });
}
/* 石材 结束--!*/

/* !--木材 开始*/
function WoodMaterial() {
  //深灰色木纹特性
  const DarkGreyWoodGrainProps = useTexture({
    map: "./denim/denimDiff.jpg",
    displacementMap: "./denim/denimDisp.png",
    normalMap: "./denim/denimRough.jpg",
    roughnessMap: "Marble062_REFL_2K.jpg",
  });
  //深灰色木纹
  const DarkGreyWoodGrain = new THREE.MeshLambertMaterial({
    ...DarkGreyWoodGrainProps,
  });
}
/* 木材 结束--!*/

/* !--布料 开始*/
function ClothMaterial() {
  //墨绿色布料特性
  const DarkGreenFabricProps = useTexture({
    map: "./denim/denimDiff.jpg",
    displacementMap: "./denim/denimDisp.png",
    normalMap: "./denim/denimRough.jpg",
    roughnessMap: "Marble062_REFL_2K.jpg",
  });
  //墨绿色布料
  const DarkGreenFabric = new THREE.MeshLambertMaterial({
    ...DarkGreenFabricProps,
  });

  //深红色布料特性
  const CrimsonFabricProps = useTexture({
    map: "./denim/denimDiff.jpg",
    displacementMap: "./denim/denimDisp.png",
    normalMap: "./denim/denimRough.jpg",
    roughnessMap: "Marble062_REFL_2K.jpg",
  });
  //深红色布料
  const CrimsonFabric = new THREE.MeshLambertMaterial({
    ...CrimsonFabricProps,
  });
}
/* 布料 结束--!*/

/* !--乳胶漆 开始*/
function LatexPaintMaterial() {
  //白色乳胶漆
  const WhiteLatexPaint = new THREE.MeshStandardMaterial({ color: "#fff" });

  //深灰色乳胶漆
  const DarkGrayLatexPaint = new THREE.MeshStandardMaterial({ color: "#f0f" });
}
/* 乳胶漆 结束--!*/

/* !--塑料 开始*/
function PlasticMaterial() {
  //黑色塑料
  let BlackPlastic = new THREE.MeshStandardMaterial({ Color: "#040404" });
}
/* 塑料  结束--!*/

/* !--液体 开始*/
function LiquidMaterial() {
  //液体
  let Liquid = new THREE.MeshStandardMaterial({
    Color: "black",
    transparent: true,
    transmission: 0.5,
  });
}
/* 液体  结束--!*/
