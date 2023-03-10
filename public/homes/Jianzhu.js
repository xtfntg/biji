/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/jianzhu.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.jianzhu.geometry} material={materials.jianzhu} position={[-51.06, 2.49, -26.86]} />
    </group>
  )
}

useGLTF.preload('/jianzhu.glb')
