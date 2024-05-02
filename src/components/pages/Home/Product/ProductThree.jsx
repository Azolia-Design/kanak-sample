import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import useWindowSize from "@hooks/useWindowSize";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { useProductIndex } from '@contexts/StoreGlobal';
import GetModel from "@/components/common/GetModel";
import { animate, scroll } from "motion";
function CustomMaterial({...props}) {
    return (
        <meshStandardMaterial color={props.color} roughness={props.roughness}/>
    )
}
function Content({...props}) {
    const wrap = useRef()
    const productsWrap = useRef()
    const products = useRef()
    const { index, setIndex } = useProductIndex();
    const clock = useThree(state => state.clock);

    useFrame((state, delta) => {
        if (!products.current) return
        products.current.rotation.x = Math.cos(clock.elapsedTime / 2) * Math.PI * .02
        products.current.rotation.y += .2 * delta
    })

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger)
        const triggerTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-prod-title-wrap',
                start: 'bottom bottom',
                onEnter: () => setIndex(0),
                onLeaveBack: () => setIndex(0)
            }
        })
    }, [])
    return (
        <>
            <group ref={wrap}>
                <group ref={productsWrap} scale={[7,7,7]} position={[0,-props.height * .00015,0]} rotation={[Math.PI * .09, 0,0]}>
                        <group ref={products}>
                            {props.list.map((item, idx) => {
                                if (item.data.file.url) {
                                    return (
                                        <mesh key={idx}
                                            scale={idx == 0 ? [1,1,1] : [0,0,0]}
                                            position={item.uid == 'kups' ? [0,-.04,0] : item.uid == 'klamshells' ? [0,-.01,0] : [0,0,0]}
                                        >
                                            {item.uid == 'bowls' ? (
                                                <GetModel file='/glb/bowls-65-transformed.glb'/>
                                            ) : item.uid == 'plates-platters' ? (
                                                <GetModel file='/glb/plates-80-transformed.glb'/>
                                            ) : item.uid == 'soup-containers' ? (
                                                <GetModel file='/glb/soup-6-transformed.glb'/>
                                            ) : item.uid == 'kutlery' ? (
                                                <GetModel file='/glb/kutlery-spoon-transformed.glb'/>
                                            ) : item.uid == 'kups' ? (
                                                <GetModel file='/glb/kup-5-transformed.glb'/>
                                            ) : item.uid == 'klamshells' ? (
                                                <GetModel file='/glb/klamshell-79-transformed.glb'/>
                                            ) : (
                                                <GetModel file={item.data.file.url}
                                                    material={<CustomMaterial color='#EAD6B3' needsUpdate={true} isActive={idx == index}
                                                />} />
                                            )}

                                        </mesh>
                                    )
                                }

                            })}
                        </group>
                </group>
            </group>
            <ambientLight intensity={1.5} />
            <directionalLight intensity={1.5}/>
            <directionalLight intensity={1.15} position={[props.width * .25, 0,100]}/>
            <directionalLight intensity={1.15} position={[-props.width * .25, 0,100]}/>
        </>
    )
}
function HomeProductThree(props) {
    const { width, height } = useWindowSize();
    let perspective = height / 100;
    let fov = ((Math.atan(height / 10 / perspective) * 2) * 180 / Math.PI) / 10;
    return (
        <Canvas camera={{ fov: fov, near: 0.1, far: 10000, position: [0, 0, perspective], aspect: width / height }} shadows="soft">
            <Content width={width} height={height} list={props.list}/>
        </Canvas>
    )
}
export default HomeProductThree