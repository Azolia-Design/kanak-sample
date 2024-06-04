import { useGLTF } from '@react-three/drei'
import { memo } from 'react';
let path;
function GetModel(props) {
  path = props.file
  const { nodes } = useGLTF(props.file);
  return (
    <group {...props} dispose={null}>
      {nodes.Scene.children.map((item, idx) => (
        <mesh castShadow geometry={item.geometry} name={props.name} material={!props.material && item.material} key={idx}>
          {props.material && props.material}
        </mesh>
      ))}
    </group>
  )
}

export default memo(GetModel)

useGLTF.preload(path)
