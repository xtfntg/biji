import * as THREE from "three";
import React, {
  useRef,
  useMemo,
  useEffect,
  forwardRef,
  useLayoutEffect,
} from "react";

import {
  Canvas,
  extend,
  useThree,
  useFrame,
  useLoader,
} from "@react-three/fiber";

import {
  Mesh,
  OrthographicCamera,
  PlaneBufferGeometry,
  Scene,
  ShaderMaterial,
  UniformsUtils,
  Vector2,
} from "three";

import { Pass } from "three/examples/jsm/postprocessing/Pass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";
/* import { OrbitControls } from "three-stdlib"; */
import { OrbitControls } from "@react-three/drei";
//水着色器;统一 绕道 tex 时间 因子 决议
var WaterShader = {
  uniforms: {
    byp: { value: 0 }, //apply the glitch ?
    tex: { type: "t", value: null },
    time: { type: "f", value: 0.0 },
    factor: { type: "f", value: 0.0 },
    resolution: { type: "v2", value: null },
  },
  //顶点着色器
  vertexShader: `varying vec2 vUv;
    void main(){  
      vUv = uv; 
      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * modelViewPosition;
    }`,
  //片段着色器
  fragmentShader: `uniform int byp; //should we apply the glitch ?
    uniform float time;
    uniform float factor;
    uniform vec2 resolution;
    uniform sampler2D tex;
    
    varying vec2 vUv;
    
    void main() {  
      if (byp<1) {
        vec2 uv1 = vUv;
        vec2 uv = gl_FragCoord.xy/resolution.xy;
        float frequency = 6.0;
        float amplitude = 0.015 * factor;
        float x = uv1.y * frequency + time * .7; 
        float y = uv1.x * frequency + time * .3;
        uv1.x += cos(x+y) * amplitude * cos(y);
        uv1.y += sin(x-y) * amplitude * cos(y);
        vec4 rgba = texture2D(tex, uv1);
        gl_FragColor = rgba;
      } else {
        gl_FragColor = texture2D(tex, vUv);
      }
    }`,
};
//水通道 规模
var WaterPass = function (dt_size) {
  //通道调用
  Pass.call(this);
  //水的着色器===未定义
  if (WaterShader === undefined)
    console.error("THREE.WaterPass relies on THREE.WaterShader");
  //着色器=水的着色器 自身.均匀= 均匀的利用; 克隆 (着色器.均匀)
  var shader = WaterShader;
  this.uniforms = UniformsUtils.clone(shader.uniforms);
  //判断 规模 ===未定义  规模=64， 自身.均匀 [决议].值 = 向量 规模 规模
  //自身.材质=着色器材料 均匀：自身.均匀   顶点着色器=着色器。顶点着色器 片段着色器=着色器。片段着色器
  if (dt_size === undefined) dt_size = 64;
  this.uniforms["resolution"].value = new Vector2(dt_size, dt_size);
  this.material = new ShaderMaterial({
    uniforms: this.uniforms,
    vertexShader: shader.vertexShader,
    fragmentShader: shader.fragmentShader,
  });
  //相机是正交相机 场景是新建场景 四边形平面 截锥体剔除 因子 时间
  this.camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  this.scene = new Scene();
  this.quad = new Mesh(new PlaneBufferGeometry(2, 2), null);
  this.quad.frustumCulled = false; //避免被剪掉
  this.scene.add(this.quad);
  this.factor = 0;
  this.time = 0;
};
//水的着色器 原型=  对象.分配( 对象.创建 (通道.原型) 构造函数:水通道
WaterPass.prototype = Object.assign(Object.create(Pass.prototype), {
  constructor: WaterPass,
  //渲染:渲染器，写缓冲区，读取缓冲区，增量时间，遮蔽活动
  //因子大小 自身.均匀=因子  自身.均匀=读取缓冲区  自身.均匀=增量时间   自身.均匀=因子
  //自身。时间+=0.05  自身四边形材质=自身材质
  //判断 (自身 渲染到屏幕){渲染器.设置渲染目标}渲染器.渲染( 自身场景，自身相机) 渲染器.设置渲染目标（写缓冲区）判断（自身 清晰）渲染器.清晰 渲染器.渲染( 自身场景，自身相机)）
  render: function (renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
    const factor = Math.max(0, this.factor);
    this.uniforms["byp"].value = factor ? 0 : 1;
    this.uniforms["tex"].value = readBuffer.texture;
    this.uniforms["time"].value = this.time;
    this.uniforms["factor"].value = this.factor;
    this.time += 0.05;
    this.quad.material = this.material;
    if (this.renderToScreen) {
      renderer.setRenderTarget(null);
      renderer.render(this.scene, this.camera);
    } else {
      renderer.setRenderTarget(writeBuffer);
      if (this.clear) renderer.clear();
      renderer.render(this.scene, this.camera);
    }
  },
});

/* export { WaterPass }; */

//延伸 （效果器 着色器通道 渲染通道 水通道 虚幻绽放通道 电影通道）
extend({
  EffectComposer,
  ShaderPass,
  RenderPass,
  /* WaterPass, */
  UnrealBloomPass,
  FilmPass,
});
//效果
const Effects = () => {
  const composer = useRef();
  const { scene, gl, size, camera } = useThree();
  const aspect = useMemo(() => new THREE.Vector2(512, 512), []);
  //空间 创作 目标 大小
  useEffect(
    () => void composer.current.setSize(size.width, size.height),
    [size]
  );
  //创作 目标 渲染
  useFrame(() => composer.current.render(), 1);
  return (
    //效果器
    <effectComposer ref={composer} args={[gl]}>
      {/* 渲染通道 */}
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      {/* <waterPass attachArray="passes" factor={1.5} /> */}
      {/* 虚幻绽放通道 */}
      <unrealBloomPass attachArray="passes" args={[aspect, 2, 1, 0]} />
    </effectComposer>
  );
};
const Text = forwardRef((props) => {
  return (
    <group>
      <mesh {...props}>
        <textGeometry size={10} />
        <meshBasicMaterial />
      </mesh>
    </group>
  );
});
export const UseEffectsB = () => {
  const style = { width: "600px", height: "400px", backgroundColor: "#eaad1a" };
  return (
    <Canvas style={style}>
      <Text>222</Text>

      <OrbitControls />
    </Canvas>
  );
};
