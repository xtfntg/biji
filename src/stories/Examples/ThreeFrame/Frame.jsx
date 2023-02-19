import SceneHandler from "./SceneHandler";

const sceneHandler = new SceneHandler(sceneList);
//goTo转移语句
sceneHandler.goTo(sceneList.sceneDemoA);
import box from "./Box";
import camera from "./Camera";
import light from "./Light";
import machine from "./Machine";
import mouse from "./Mouse";
import renderer from "./Renderer";
import resize from "./Resize";
import scene from "./Scene";

scene.add(box);
scene.add(light);
camera.position.set(1, 2, 5);
camera.lookAt(box.position);
resize.start(renderer);

/* setInterval(() => {
  renderer.render(scene, camera);
}, 1000 / 30); */

machine.addCallback(() => {
  box.rotation.y += 0.01;
  renderer.render(scene, camera);
});

machine.start();

setTimeout(() => {
  machine.stop();
}, 1000 * 2);

setTimeout(() => {
  machine.start();
}, 1000 * 5);

mouse.setCanvas(document.querySelector("canvas"));
mouse.start();
