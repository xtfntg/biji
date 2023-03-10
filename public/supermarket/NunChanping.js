/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/nunChanping.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.nunChanping_1.geometry} material={materials.buXuGuao} />
      <mesh geometry={nodes.nunChanping_2.geometry} material={materials.muShiMian} />
      <mesh geometry={nodes.nunChanping_3.geometry} material={materials.daLieShiTaoMian} />
      <mesh geometry={nodes.nunChanping_4.geometry} material={materials.__501} />
    </group>
  )
}

useGLTF.preload('/nunChanping.glb')
