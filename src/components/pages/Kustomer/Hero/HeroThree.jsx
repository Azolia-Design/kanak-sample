import { Suspense, useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import useWindowSize from "@hooks/useWindowSize";
import GetModel from "@components/common/GetModel";
import { suspend } from 'suspend-react'
import { Environment, ContactShadows, AdaptiveDpr } from "@react-three/drei";

const warehouse = import('/envMap/warehouse.hdr?url').then((module) => module.default)

function Content(props) {
    const products = useRef();
    const [degraded, degrade] = useState(false)
    const [scaleOffset, setScaleOffset] = useState(1);
    const [lerpDistance, setLerpDistance] = useState(1);

    const mapIndex = useMemo(() => props.list.map((_, idx) => idx - props.currentIdx), [props.list, props.currentIdx]);
    const lerp = (a, b, t = 0.08) => {
        return a + (b - a) * t;
    }
    useFrame(() => {
        if (!products.current) return;
        let currentEl = products.current.children[props.currentIdx];
        currentEl.rotation.x += (0 - currentEl.rotation.x) * .08
        currentEl.rotation.y += .006

        products.current.children.forEach((el, idx) => {
            products.current.children[idx].position.x = lerp(products.current.children[idx].position.x, (mapIndex[idx] * .2 ) / scaleOffset, lerpDistance)
            let local_scale = idx == props.currentIdx ? 1 : .7;
            products.current.children[idx].scale.x = lerp(products.current.children[idx].scale.x, local_scale / scaleOffset, lerpDistance)
            products.current.children[idx].scale.y = lerp(products.current.children[idx].scale.y, local_scale / scaleOffset, lerpDistance)
            products.current.children[idx].scale.z = lerp(products.current.children[idx].scale.z, local_scale / scaleOffset, lerpDistance)
        })
    })

    useEffect(() => {
        requestAnimationFrame(() => setLerpDistance(.05))
        if (window.innerWidth > 991) {
        } else if (window.innerWidth > 767) {
            // setScaleOffset()
        } else {
            setScaleOffset(.85)
        }
    }, []);

    return (
        <>
            <group
                position={[0, -.8 / scaleOffset, 0]}
                scale={[20 / scaleOffset, 20 / scaleOffset, 20 / scaleOffset]}
                rotation={[Math.PI * .1, 0, 0]}
            >
                <group ref={products}>
                {props.list.map(({ url, ...props }, idx) => (
                    <group key={idx}>
                        <mesh {...props}>
                            <GetModel file={url}/>
                        </mesh>
                    </group>
                ))}
                </group>
                <spotLight intensity={1} angle={.1} penumbra={1} position={[0, 10, 0]} castShadow />
                <ContactShadows opacity={.2}
                        scale={[7 / scaleOffset, 7 / scaleOffset, 7 / scaleOffset]}
                        position={[0, -.4 / scaleOffset, 0]}  blur={2} far={1.2} />
            </group>
            <Environment files={suspend(warehouse)} frames={degraded ? 1 : Infinity} resolution={256}/>
        </>
    )
}

function KustomerHeroThree(props) {
    const { width, height } = useWindowSize();
    if (width === 0) return;
    let perspective = 15;
    let fov = 12;

    return (
        <Suspense fallback={<div className="kustomer-hero-slide-loading">{props.icLoad}</div>}>
            <Canvas camera={{ fov: fov, near: 0.1, far: 10000, position: [0, 0, perspective], aspect: width / height }} shadows>
                <Content width={width} height={height} { ...props } />
                <AdaptiveDpr pixelated />
            </Canvas>
        </Suspense>
    )
}
export default KustomerHeroThree;