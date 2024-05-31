import './Hero.scss';
import useWindowSize from "@hooks/useWindowSize";
import { AdaptiveDpr, ContactShadows, Environment } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState, Suspense } from "react";
import { suspend } from 'suspend-react'

const warehouse = import('/envMap/warehouse.hdr?url').then((module) => module.default)

function Content(props) {
    const meshRef = useRef();
    const contactShadow = useRef(null);
    const [degraded, degrade] = useState(false)
    const [scaleOffset, setScaleOffset] = useState(1);

    useFrame((state, delta) => {
        meshRef.current.rotation.x += delta * .5
        meshRef.current.rotation.z += delta * .5
    })
    return (
        <>
            <group>
                <mesh ref={meshRef}>
                    <boxGeometry args={[1, 1, 1]} position={[-1.2, 0, 0]} />
                    <meshStandardMaterial color='#789904' />
                </mesh>
                <ambientLight intensity={0.1} />
                <directionalLight />

                <ContactShadows opacity={.3} ref={contactShadow}
                    scale={[7 / scaleOffset, 7 / scaleOffset, 7 / scaleOffset]}
                    position={[0, -1 / scaleOffset, 0]}  blur={2} far={1.2} />
            </group>
            <Environment files={suspend(warehouse)} frames={degraded ? 1 : Infinity} resolution={256}/>
        </>
    )
}

function SustainHeroThree(props) {
    const { width, height } = useWindowSize();
    if (width == 0) {
        return;
    } else {
        let perspective = 5;
        let fov = 30;
        return (
            <div className="sustainable-hero-three">
                <div className="sustainable-hero-three-stick">
                    <div className="sustainable-hero-three-stick-inner">
                        <Canvas camera={{  fov: fov, near: 0.1, far: 10000, position: [0, 0, perspective], aspect: width / height }} shadows>
                            <Suspense fallback={null}>
                                <Content width={width} height={height}/>
                                <AdaptiveDpr pixelated />
                            </Suspense>
                        </Canvas>
                    </div>
                </div>
            </div>
        )
    }
}

export default SustainHeroThree;