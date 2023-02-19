import box from "./Box";
import camera from "./Camera";
import light from "./Light";
import machine from "./Machine";
import renderer from "./Renderer";
import resize from "./Resize";
import scene from "./Scene";
import resize from "./Resize";
import MasterScene from "./MasterScene";
import { AmmoPhysics } from "three-stdlib";

//场景演示A 主场景
class SceneDemoA extends MasterScene {
  //打开
  open() {
    scene.add(light);
    scene.add(box);
    box.position.y = 0.5;
    camera.position.set(1, 2, 3);
    camera.lookAt(box.position);
    resize.start(renderer);
    initPhysics();
    addGround();
    addPhysicBox();

    const clock = new THREE.Clock();

    machine.addCallback(() => {
      const deltaTime = clock.getDelta();
      updatePhysics(deltaTime);

      let speed = 0.01;
      let x, y, z;
      x = y = z = 0;

      if (keyListener.isPressed(87)) z = speed;
      if (keyListener.isPressed(83)) z = -speed;
      if (keyListener.isPressed(65)) x = speed;
      if (keyListener.isPressed(68)) x = -speed;
      if (x != 0 || z != 0) {
        let body = rigidBodies[0].userData.physicsBody;
        body.addlyImpulse(new Ammo.btVector3(x, y, z));
      }
      camera.lookAt(box.position);
      renderer.render(scene, camera);
    });
    machine.start();
  }
  //关闭
  close() {
    console.log(`thScene ${this.instanceName} is clossing`);
  }
}
const sceneDemoA = new SceneDemoA();
export default sceneDemoA;
