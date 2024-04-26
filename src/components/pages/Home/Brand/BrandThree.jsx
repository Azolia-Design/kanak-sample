import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, AdaptiveDpr } from "@react-three/drei";
import useWindowSize from "@hooks/useWindowSize";
import gsap from 'gsap';
import { suspend } from 'suspend-react'
import GetModel from "../../../common/GetModel.jsx";
import { useStore } from '@nanostores/react';
import { brandIndex } from '@contexts/StoreGlobal';
function CustomMaterial({ ...props }) {
    return (<>
        <meshStandardMaterial color={props.color} roughness={props.roughness} />
    </>
    )
}
const warehouse = import('/envMap/warehouse.hdr?url').then((module) => module.default)
function Content({ ...props }) {
    const activeIndex = useStore(brandIndex);
    const [degraded, degrade] = useState(false)
    const wrap = useRef()
    const brandsWrap = useRef()
    const brands = useRef()
    useEffect(() => {
        if (activeIndex == 1) {
            gsap.to(brandsWrap.current.rotation, { x: Math.PI * 1, duration: .8 })
            if (brands.current.children[0].name == 'private-label') {
                gsap.to(brands.current.children[0].position, { x: -0.03, y: -.12, z: .14, duration: .8 })
                gsap.to(brands.current.children[0].rotation, { x: Math.PI * -2.86, y: Math.PI * .5, z: Math.PI * .01, duration: .8 })
            }
            if (brands.current.children[0].name == 'kustom-packaging-solutions') {
                gsap.to(brands.current.children[0].position, { x: .006, y: -.01, z: -.23, duration: .8 })
                gsap.to(brands.current.children[0].rotation, { x: Math.PI * -2.95, y: Math.PI * .5, z: Math.PI * .02, duration: .8 })
            }
        } else {
            gsap.to(brandsWrap.current.rotation, { x: Math.PI * 0, duration: .8 })
            if (brands.current.children[0].name == 'private-label') {
                gsap.to(brands.current.children[0].position, { x: .016, y: .02, z: .284, duration: .8 })
                gsap.to(brands.current.children[0].rotation, { x: Math.PI * 0, y: -Math.PI * .5, z: 0, duration: .8 })
            }
            if (brands.current.children[0].name == 'kustom-packaging-solutions') {
                gsap.to(brands.current.children[0].position, { x: -.05, y: .1, z: -.1, duration: .8 })
                gsap.to(brands.current.children[0].rotation, { x: Math.PI * .1, y: -Math.PI * .5, z: 0, duration: .8 })
            }
        }
    }, [activeIndex])
    const models = useMemo(() => (
        props.list.map((item, idx) => {
            if (item.data.file.url && props.top) {
                if (idx == 0) {
                    return (
                        <mesh key={idx} name={item.uid} position={[.016, .02, .284]} scale={[.8,.8,.8]} rotation={[0, -Math.PI * .5, 0]}>
                            <GetModel file='/glb/plates-80-transformed.glb' visible={props.top ? true : false}
                                scale={[.82, .82, .82]}
                                position={[-.03, 0, 0.01]}
                                rotation={[Math.PI * 0, Math.PI * .6, Math.PI * .05]}
                            />
                        </mesh>
                    )
                }
            } else {
                if (idx == 1) {
                    return (
                        <mesh key={idx} name={item.uid} position={[-.05, .1, -.1]} rotation={[Math.PI * .1, -Math.PI * .5, 0]}>
                            <GetModel file='/glb/klamshell-79-transformed.glb' visible={props.top ? false : true}
                                scale={[.86, .86, .86]}
                                position={[-.02, 0, 0]}
                                rotation={[Math.PI * 0, Math.PI * -.7, Math.PI * .05]}
                            />
                        </mesh>
                    )
                }
            }
        })
    ), [props.list])
    return (
        <>
            <group ref={wrap} position={[-.25, -.1, 0]} rotation={[Math.PI * .075, Math.PI * .05, 0]}>
                <group ref={brandsWrap} scale={[8, 8, 8]}>
                    <group ref={brands}
                        position={[0, 0, 0]}
                    >
                        {models}
                    </group>
                </group>
            </group>
            <directionalLight intensity={.2} position={[-.2, .2, .2]} lookAt={[0, 0, .3]} />
            <directionalLight intensity={.2} position={[.2, 0, .2]} lookAt={[0, 0, .3]} />
            <Environment files={suspend(warehouse)} frames={degraded ? 1 : Infinity} resolution={256} />
        </>
    )
}

function HomeBrandThree({ ...props }) {
    const { width, height } = useWindowSize();
    const activeIndex = useStore(brandIndex);
    if (width == 0) {
        return
    } else {
        let perspective = 4;
        let fov = 60;
        return (
            <>
                <div className={`home-brand-canvas-inner-item ${activeIndex == 1 ? 'blur' : ''}`}>
                    <Canvas camera={{ fov: fov, near: 0.1, far: 10000, position: [0, 0, perspective], aspect: width / height }} shadows>
                        <Content width={width} height={height} list={props.list} top={true} />
                        <AdaptiveDpr pixelated />
                    </Canvas>
                </div>
                <div className={`home-brand-canvas-inner-item ${activeIndex == 0 ? 'blur' : ''}`}>
                    <Canvas camera={{ fov: fov, near: 0.1, far: 10000, position: [0, 0, perspective], aspect: width / height }} shadows>
                        <Content width={width} height={height} list={props.list} top={false} />
                        <AdaptiveDpr pixelated />
                    </Canvas>
                </div>
            </>
        )
    }
}

export default HomeBrandThree;