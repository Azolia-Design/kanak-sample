/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 PC6200.glb --transform 
Files: PC6200.glb [2.21MB] > /Users/mac/Dropbox/Code Assets/kanak/public/PC6200-transformed.glb [114.84KB] (95%)
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function ModelFork(props) {
  const { nodes, materials } = useGLTF('/PC6200-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Ivory_ForkIvory_Fork.geometry} material={materials.StingrayPBS1} />
    </group>
  )
}

useGLTF.preload('/PC6200-transformed.glb')
