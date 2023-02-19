import * as THREE from "three";
/* !--石材 开始*/
export const MarbleMaterial = {
  //爵士白
  JazzWhiteProps: new THREE.MeshStandardMaterial({
    transparent: true,
    map: new THREE.TextureLoader().load("JazzWhite/Marble062_COL_2K.jpg"),
  }),
  //黑白根
  BlackAndWhiteRoot: new THREE.MeshStandardMaterial({
    transparent: true,
    map: new THREE.TextureLoader().load("JazzWhite/Marble062_COL_2K.jpg"),
  }),
  //意大利灰
  ItalianGrey: new THREE.MeshStandardMaterial({
    transparent: true,
    map: new THREE.TextureLoader().load(
      "ItalianGrey/Map.jpg",
      function (texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
      }
    ),
  }),
  //黑色小方砖
  smallBlackBrick: new THREE.MeshStandardMaterial({
    transparent: true,
    map: new THREE.TextureLoader().load(
      "Texture/3d66Model-647884-files-42.png",
      function (texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
      }
    ),
  }),
  // 蓝色小方砖
  smallBlueBrick: new THREE.MeshStandardMaterial({
    transparent: true,
    map: new THREE.TextureLoader().load(
      "Texture/3d66Model-647884-files-43.png",
      function (texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
      }
    ),
  }),
};
/* 石材 结束--!*/

/* !--木材 开始*/
export const WoodMaterial = {
  //深灰色木纹
  DarkGreyWoodGrain: new THREE.MeshStandardMaterial({
    transparent: true,
    map: new THREE.TextureLoader().load("wood/Map.jpg"),
  }),
  //地板灰色
  FloorGray: new THREE.MeshStandardMaterial({
    transparent: true,
    map: new THREE.TextureLoader().load("FloorGray/Map.jpg"),
  }),
};
/* 木材 结束--!*/
/* !--布料 开始*/
export const ClothMaterial = {
  //墨绿色布料
  DarkGreenFabric: new THREE.MeshStandardMaterial({
    transparent: true,
    map: new THREE.TextureLoader().load("bu/FabricFleece001_COL_VAR1_1K.jpg"),
  }),
  //深红色布料
  CrimsonFabric: new THREE.MeshStandardMaterial({
    transparent: true,
    map: new THREE.TextureLoader().load("bu/FabricFleece001_COL_VAR3_1K.jpg"),
  }),
};
/* 布料 结束--!*/
/* !--乳胶漆 开始*/
export const LatexPaintMaterial = {
  //白色乳胶漆
  WhiteLatexPaint: new THREE.MeshStandardMaterial({
    color: new THREE.Color("#ffffff"),
    transparent: true,
  }),
  //深灰色乳胶漆
  DarkGrayLatexPaint: new THREE.MeshStandardMaterial({
    color: new THREE.Color("#88807B"),
    transparent: true,
  }),
  //黑色乳胶漆
  BlackLatexPaint: new THREE.MeshStandardMaterial({
    color: new THREE.Color("#000000"),
    transparent: true,
  }),
  GreenLatexPaint: new THREE.MeshStandardMaterial({
    color: new THREE.Color("#98FB98"),
    transparent: true,
  }),
};
/* 乳胶漆 结束--!*/

/* !--自发光 开始*/
export const SelfLuminousMaterial = {
  //自发光
  SelfLuminous: new THREE.MeshBasicMaterial({
    Color: "#ff00ff",
  }),
};
/* 自发光 结束--!*/

/* !--塑料 开始*/
export const PlasticMaterial = {
  //黑色塑料
  BlackPlastic: new THREE.MeshStandardMaterial({
    color: new THREE.Color("#ffffff"),
    transparent: true,
  }),
};
/* 塑料 结束--!*/

/* !--液体 开始*/
export const LiquidMaterial = {
  //液体
  BlackPlastic: new THREE.MeshStandardMaterial({
    Color: "black",
    transparent: true,
    transmission: 0.5,
  }),
};
/* 液体 结束--!*/

/* !--沥青路面 开始*/
export const AsphaltRoadMaterial = {
  AsphaltRoad: new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load("asphaltA.jpg"),
  }),
};
/* 沥青路面 结束--!*/

/* !--玻璃 开始*/
export const grassMaterial = {
  VitreousOne: new THREE.MeshPhysicalMaterial({
    color: "rgba(26, 57, 78, 0.808);",
    transmission: 1,
    opacity: 1,
    metalness: 0,
    roughness: 0,
    ior: 1.5,
    thickness: 0.01,
    specularIntensity: 1,
    specularColor: 0xffffff,
    envMapIntensity: 1,
    lightIntensity: 1,
    exposure: 1,
  }),
};
/* 玻璃 结束--!*/
