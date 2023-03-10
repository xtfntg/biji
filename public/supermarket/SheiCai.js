/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/sheiCai.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.qaiMian_1.geometry} material={materials.quanMianBaiShe} />
      <mesh geometry={nodes.qaiMian_2.geometry} material={materials.muShiMian} />
      <mesh geometry={nodes.qaiMian_3.geometry} material={materials.daLieShiTaoMian} />
      <mesh geometry={nodes.qaiMian_4.geometry} material={materials.quanMianLaiSheZhuan} />
      <mesh geometry={nodes.qaiMian_5.geometry} material={materials.sheiCaiZhi} />
      <mesh geometry={nodes.qaiMian_6.geometry} material={materials.buXuGuao} />
      <mesh geometry={nodes.qaiMian_7.geometry} material={materials.__50_22} />
      <mesh geometry={nodes.qaiMian_8.geometry} material={materials.shei} />
      <mesh geometry={nodes.qaiMian_9.geometry} material={materials.boLi} />
    </group>
  )
}

useGLTF.preload('/sheiCai.glb')
