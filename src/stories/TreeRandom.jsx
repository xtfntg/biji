import React, { useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

//1.2添加参数 边界 数量{ boundary, count }
const TreeRandom = ({ boundary, count }) => {
  const model = useLoader(GLTFLoader, "/Tree.glb");
  //1.1树的状态 需要一棵树与一组数 使用是空数组
  const [trees, setTrees] = useState([]);
  model.scene.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
    }
  });
  //5.1盒子相交函数  多个参数返回值是真或假盒子是否重叠
  const boxIntersect = (
    minAx,
    minAz,
    maxAx,
    maxAz,
    minBx,
    minBz,
    maxBx,
    maxBz
  ) => {
    let aLeftOfB = maxAx < minBx;
    let aRightOfB = minAx > maxBx;
    let aAboveB = minAz > maxBz;
    let aBelowB = maxAz < minBz;
    return !(aLeftOfB || aRightOfB || aAboveB || aBelowB);
  };

  //4.1检验重叠函数 索引 树 树组
  const isOverlapping = (index, tree, trees) => {
    //4.2最小的XY目标 树定位-树盒子  最大的XY目标树定位+树盒子
    const minTargetX = tree.position.x - tree.box / 2;
    const maxTargetX = tree.position.x + tree.box / 2;
    const minTargetZ = tree.position.z - tree.box / 2;
    const maxTargetZ = tree.position.z + tree.box / 2;
    //4.3为每个子元素添加4个变量
    for (let i = 0; i < index; i++) {
      let minChildX = trees[i].position.x - trees[i].box / 2;
      let maxChildX = trees[i].position.x + trees[i].box / 2;
      let minChildZ = trees[i].position.x - trees[i].box / 2;
      let maxChildZ = trees[i].position.x + trees[i].box / 2;
      //5.2检查会得到一个真或假的值 真表示重叠
      if (
        boxIntersect(
          minTargetX,
          minTargetZ,
          maxTargetX,
          maxTargetZ,
          minChildX,
          minChildZ,
          maxChildX,
          maxChildZ
        )
      ) {
        console.log("内容框重叠!", tree.position);
        return true;
      }
    }
    return false;
  };
  //3.2函数新定位 重叠 在一个方框中，整个边界 所有的树在哪里生成
  const newPosition = (box, boundary) => {
    return (
      //3.3盒子在整个边界中也在盒子里，给个随机的位置
      boundary / 2 -
      box / 2 -
      (boundary - box) * (Math.round(Math.random() * 100) / 100)
    );
  };
  //2.1 更新每棵树的位置 创建新函数调用  接收树新数组，边界
  const updatePosition = (treeArray, boundary) => {
    //2.3 树新数组  forEach每个元素调用一个函数 对于每棵树索引
    treeArray.forEach((tree, index) => {
      /*  2.4 更新每棵树的位置 给个随机方法
      tree.position.x = Math.random() * 100;
      tree.position.z = Math.random() * 100;*/
      /*3.4树定位 新的定位 树 盒子 边界
      tree.position.x = newPosition(tree.box, boundary);
      tree.position.z = newPosition(tree.box, boundary);*/
      //5.3树定位，如果有重叠（值，树，树组）再重新定位
      do {
        tree.position.x = newPosition(tree.box, boundary);
        tree.position.z = newPosition(tree.box, boundary);
      } while (isOverlapping(index, tree, treeArray));
    });
    //集合树的树组
    setTrees(treeArray);
  };

  //1.4 添加效果钩子 使用效果启动项 每次改变边界与计数
  useEffect(() => {
    const tempTrees = [];
    //1.5循环树的数量 临时树增加新项末尾 定位{X，Y} 盒子1,现在位置都一样
    for (let i = 0; i < count; i++) {
      tempTrees.push({ position: { x: 0, z: 0 }, box: 1 });
    }
    //2.2调用更新定位函数 临时树 边界
    updatePosition(tempTrees, boundary);
    //1.6控制台查看数组位置{临时树}
    console.log(tempTrees);
  }, [boundary, count]);

  return (
    <group>
      {/* 2.5树 映射 树的索引值 定位 树X定位 树Y定位 树Z定位*/}
      {trees.map((tree, index) => {
        return (
          <object3D
            key={index}
            position={[tree.position.x, 0, tree.position.z]}
          >
            {/* 3.1 比例.树 不重叠 */}
            <mesh scale={[tree.box, tree.box, tree.box]}>
              <boxGeometry />
              <meshBasicMaterial color={"#118600"} wireframe />
            </mesh>
            <primitive object={model.scene.clone()} />
          </object3D>
        );
      })}
    </group>
  );
};

export const TreeRandoms = () => {
  const style = { width: "400px", height: "300px", backgroundColor: "#ff0" };
  return (
    <Canvas style={style} camera={{ fov: 23, position: [0, 100, -80] }}>
      <ambientLight intensity={10} />
      <spotLight
        castShadow
        intensity={10}
        angle={0.1}
        position={[-200, 220, -100]}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.000001}
      />
      {/* 1.3指定边界标明区域与树的数量 */}
      <TreeRandom boundary={100} count={20} />
      <group position={[0, -0.5, 0]} rotation={[Math.PI / -2, 0, 0]}>
        <mesh>
          <planeGeometry args={[100, 100]} DoubleSide />
          <meshBasicMaterial color={"#ff0"} />
        </mesh>
      </group>
      <OrbitControls />
    </Canvas>
  );
};
