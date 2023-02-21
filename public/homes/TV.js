/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/TV.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.TV_1.geometry} material={materials.shuLiao} />
      <mesh geometry={nodes.TV_2.geometry} material={materials.huanMian} />
    </group>
  )
}

useGLTF.preload('/TV.glb')