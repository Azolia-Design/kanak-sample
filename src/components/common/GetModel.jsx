import { useGLTF } from '@react-three/drei'
let path;

export function GetModel(props) {
  path = props.file
  const { nodes } = useGLTF(props.file)
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

useGLTF.preload(path)
