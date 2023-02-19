/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/ZhuPing.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.ZhuPIng.geometry} material={materials.ZhuPIng} />
    </group>
  )
}

useGLTF.preload('/ZhuPing.glb')
