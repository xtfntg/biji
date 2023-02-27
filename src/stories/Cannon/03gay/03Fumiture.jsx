//使用球体，使用圆柱体，使用距离约束，使用点对点约束，
import { useCompoundBody } from "@react-three/cannon";
import { useDragConstraint } from "./03Drag";
import { Block } from "./03Block";

export function Table(props) {
  const [table] = useCompoundBody(() => ({
    mass: 54,
    linearDamping: 0.95,
    angularDamping: 0.95,
    shapes: [
      { type: "Box", mass: 50, position: [0, 0, 0], args: [5, 0.5, 5] },
      { type: "Box", mass: 1, position: [2, -2.25, 2], args: [0.5, 4, 0.5] },
      { type: "Box", mass: 1, position: [-2, -2.25, -2], args: [0.5, 4, 0.5] },
      { type: "Box", mass: 1, position: [-2, -2.25, 2], args: [0.5, 4, 0.5] },
      { type: "Box", mass: 1, position: [2, -2.25, -2], args: [0.5, 4, 0.5] },
    ],
    ...props,
  }));
  //绑定 使用拖动约束
  const bind = useDragConstraint(table);
  return (
    <group ref={table} {...bind}>
      <Block scale={[5, 0.5, 5]} position={[0, 0, 0]} />
      <Block scale={[0.5, 4, 0.5]} position={[2, -2.25, 2]} />
      <Block scale={[0.5, 4, 0.5]} position={[-2, -2.25, -2]} />
      <Block scale={[0.5, 4, 0.5]} position={[-2, -2.25, 2]} />
      <Block scale={[0.5, 4, 0.5]} position={[2, -2.25, -2]} />
    </group>
  );
}

export function Sphere(props) {
  const [sphere] = useCompoundBody(() => ({
    mass: 54,
    linearDamping: 0.95,
    angularDamping: 0.95,
    shapes: [{ type: "Box", mass: 50, position: [0, 0, 0], args: [5, 0.5, 5] }],
    ...props,
  }));
  const bind = useDragConstraint(sphere);
  return (
    <mesh ref={sphere} {...bind}>
      <sphereGeometry args={[2, 32]} />
      <meshMatcapMaterial />
    </mesh>
  );
}
