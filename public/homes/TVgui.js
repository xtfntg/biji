/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/TVgui.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.TVgui.geometry} material={materials.muShe} />
    </group>
  )
}

useGLTF.preload('/TVgui.glb')
