import { forwardRef } from "react";
import { RoundedBox } from "@react-three/drei";
//阻塞   促发
export const Block = forwardRef(
  (
    {
      children,
      transparent = false,
      opacity = 0.5,
      color = "white",
      args = [1, 1, 1],
      ...props
    },
    ref
  ) => {
    return (
      <RoundedBox args={args} receiveShadow castShadow ref={ref} {...props}>
        <meshStandardMaterial
          color={color}
          transparent={transparent}
          opacity={opacity}
        />
        {children}
      </RoundedBox>
    );
  }
);
