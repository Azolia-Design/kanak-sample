
import { useRef, useEffect, useState, Suspense } from "react";
import { Environment, ContactShadows, AdaptiveDpr } from "@react-three/drei";
import useWindowSize from "@hooks/useWindowSize";
import { suspend } from 'suspend-react'
import GetModel from "@components/common/GetModel";
import { Canvas, useThree, useFrame } from "@react-three/fiber";

const warehouse = import('/envMap/warehouse.hdr?url').then((module) => module.default)
function Content(props) {
    const product = useRef();
    const [scaleOffset, setScaleOffset] = useState(1);
    const [degraded, degrade] = useState(false);

    useFrame(({ clock }, delta) => {
        if (!product.current) return;
        product.current.rotation.x += (0 - product.current.rotation.x + Math.cos(clock.getElapsedTime() / 2) * Math.PI * .02) * .08
        product.current.rotation.y += (0 - product.current.rotation.y + Math.cos(clock.getElapsedTime() / 2) * Math.PI * .02) * .08
    })

    useEffect(() => {
        if (window.innerWidth > 991) {
        } else if (window.innerWidth > 767) {
            setScaleOffset(1.3)
        } else {
            setScaleOffset(1.5)
        }
    }, []);
    return (
        <>
            <group
                position={[(window.innerWidth > 991 ? .4 : window.innerWidth > 767 ? .55 : -.2) / scaleOffset, (window.innerWidth > 991 ? -.22 : window.innerWidth > 767 ? -3 : -1.3) / scaleOffset, 0]}
                scale={[9.5 / scaleOffset, 9.5 / scaleOffset, 9.5 / scaleOffset]}
                rotation={[Math.PI * -.02, Math.PI * -.25, Math.PI * -.2]}
            >
                <group rotation={[0, Math.PI * .48, 0]}>
                    <mesh ref={product}>
                        <GetModel file='/glb/BA-CFH-700-salad-box-clean-transformed.glb' position={[0, -.02, 0]} />
                    </mesh>
                </group>
            </group>
            <spotLight intensity={1} angle={.1} penumbra={1} position={[10, 10, -5]} castShadow />
            <ContactShadows opacity={(window.innerWidth > 991 ? .18 : .12)}
                scale={[5 / scaleOffset, 10 / scaleOffset, 2 / scaleOffset]}
                position={[.15 / scaleOffset, (window.innerWidth > 991 ? -.9 : window.innerWidth > 767 ? -9 : -1.55) / scaleOffset, 0]} blur={2} far={1.2} />
            <Environment files={suspend(warehouse)} frames={degraded ? 1 : Infinity} resolution={256} />
        </>
    )
}

function KustomPackagingHeroThree(props) {
    const { width, height } = useWindowSize();
    const threeRef = useRef();
    if (width == 0) {
        return;
    } else {
        let perspective = 5;
        let fov = 30;
        return (
            <div className="kuspack-hero-three" ref={threeRef}>
                <Suspense fallback={<div className="kuspack-hero-three-loading">{props.icLoad}</div>}>
                    <Canvas camera={{ fov: fov, near: 0.1, far: 10000, position: [0, 0, perspective], aspect: width / height }} shadows>
                        <Content width={width} height={height} list={props.list} />
                        <AdaptiveDpr pixelated />
                    </Canvas>
                </Suspense>
            </div>
        )
    }
}
export default KustomPackagingHeroThree;