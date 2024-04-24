
import { useRef, useEffect, useState, Suspense } from "react";
import { Environment, ContactShadows, AdaptiveDpr } from "@react-three/drei";
import useWindowSize from "@hooks/useWindowSize";
import { suspend } from 'suspend-react'
import { GetModel } from "@/components/common/GetModel";
import { Canvas, useThree, useFrame } from "@react-three/fiber";

const warehouse = import('/envMap/warehouse.hdr?url').then((module) => module.default)
function Content(props) {
    const product = useRef();
    const [scaleOffset, setScaleOffset] = useState(1);
    const [degraded, degrade] = useState(false);

    useFrame(({ clock }) => {
        if (!product.current) return;
        product.current.rotation.x += (0 - product.current.rotation.x + Math.cos(clock.getElapsedTime() / 2) * Math.PI * .02) * .08
        product.current.rotation.y += (0 - product.current.rotation.y + Math.cos(clock.getElapsedTime() / 2) * Math.PI * .02) * .08
    })

    useEffect(() => {
        if (window.innerWidth > 991) {
        } else if (window.innerWidth > 767) {
            setScaleOffset(1.3)
        } else {
            setScaleOffset(2.2)
        }
    }, []);
    return (
        <>
            <group
                position={[
                    (window.innerWidth > 991 ? .16 : window.innerWidth > 767 ? .55 : -.15) / scaleOffset,
                    (window.innerWidth > 991 ? -.12 : window.innerWidth > 767 ? -.15 : -.25) / scaleOffset,
                    0]}
                scale={[6 / scaleOffset, 6 / scaleOffset, 6 / scaleOffset]}
                rotation={[Math.PI * -.08, Math.PI * -.22, Math.PI * -.25]}
            >
                <group
                    rotation={[0, Math.PI * .48, 0]}>
                    <mesh
                        ref={product}>
                        <Suspense>
                            <GetModel file='/glb/78-white-clamshells-clean-transformed.glb' position={[0, -.01, 0]} />
                        </Suspense>
                    </mesh>
                </group>
            </group>
            <spotLight intensity={1} angle={.1} penumbra={1} position={[10, 10, -5]} castShadow />
            <ContactShadows
                opacity={window.innerWidth > 991 ? .2 : window.innerWidth > 767 ? .12 : .25}
                scale={[5 / scaleOffset, 10 / scaleOffset, 2 / scaleOffset]}
                position={[0, -1 / scaleOffset, (window.innerWidth > 767 ? 0 : -.2) / scaleOffset]}
                blur={window.innerWidth > 767 ? 1.2 : 5} far={1.2} />
            <Environment files={suspend(warehouse)} frames={degraded ? 1 : Infinity} resolution={256}/>
        </>
    )
}

function PrivateHeroThree(props) {
    const { width, height } = useWindowSize();
    const threeRef = useRef();
    if (width == 0) {
        return;
    } else {
        let perspective = 5;
        let fov = 30;
        return (
            <div className="private-hero-three" ref={threeRef}>
                <Canvas camera={{ fov: fov, near: 0.1, far: 10000, position: [0, 0, perspective], aspect: width / height }} shadows>
                    <Content width={width} height={height} list={props.list}/>
                    <AdaptiveDpr pixelated />
                </Canvas>
            </div>
        )
    }
}
export default PrivateHeroThree;