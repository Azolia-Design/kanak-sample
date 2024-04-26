import { useRef, useEffect, useState, Suspense } from "react";
import { Environment, ContactShadows, AdaptiveDpr } from "@react-three/drei";
import useWindowSize from "@hooks/useWindowSize";
import { suspend } from 'suspend-react'
import GetModel from "@components/common/GetModel.jsx";
import { Canvas, useThree } from "@react-three/fiber";
import { normalize } from "@utils/parse";

const warehouse = import('/envMap/warehouse.hdr?url').then((module) => module.default)
function Content(props) {
    const product = useRef();
    const productInner = useRef();
    const [scaleOffset, setScaleOffset] = useState(1);
    const [degraded, degrade] = useState(false);
    const { clock } = useThree();

    let mousePos = { x: 0, y: 0 };
    useEffect(() => {
        if (window.innerWidth > 991) {
        } else if (window.innerWidth > 767) {
            // setScaleOffset()
        } else {
            setScaleOffset(.8)
        }
    }, []);

	const lerp = (a, b, n = 0.07) => (1 - n) * a + n * b;
    const mousePosAnim = (ref) => {
        let getX = ref.current.rotation.x;
        let targetX = (mousePos.x * Math.PI) / 15;

        let getY = ref.current.rotation.y;
        let targetY = (mousePos.x * Math.PI) / -80;

        let getZ = ref.current.rotation.z;
        let targetZ = (-mousePos.y * Math.PI) / 10;
        ref.current.rotation.set(
            lerp(getX, targetX),
            lerp(getY, targetY),
            lerp(getZ, targetZ))
    }

    let requestId;
    const animateProduct = () => {
        requestId = undefined;
        start();
        if (!productInner.current) return;

        mousePosAnim(productInner);
        product.current.rotation.x += (0 - product.current.rotation.x + Math.cos(clock.elapsedTime / 2) * Math.PI * .02) * .08
        product.current.rotation.y += (0 - product.current.rotation.y + Math.cos(clock.elapsedTime / 2) * Math.PI * .02) * .08
    }
    const start = () => {
        if (!requestId) {
            requestId = window.requestAnimationFrame(animateProduct)
        }
    }
    const stop = () => {
        if (requestId) {
            window.cancelAnimationFrame(requestId);
            requestId = undefined;
        }
    }

    useEffect(() => {
        const awardSection = document.querySelector(".kustomer-award-product")
        const observerSection = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    start();
                }
                else {
                    stop();
                }
            });
        observerSection.observe(awardSection);

        const getMousePos = (e) => {
            mousePos.x = normalize(e.clientX, props.width) * -1;
            mousePos.y = normalize(e.clientY, props.height);
        }
		window.addEventListener("pointermove", getMousePos);
		return () => window.removeEventListener("pointermove", getMousePos);
    }, []);

    return (
        <>
            <group
                scale={[8 / scaleOffset, 8 / scaleOffset, 8 / scaleOffset]}
                rotation={[0, Math.PI * .5, Math.PI * .5]}>
                <group ref={product}>
                    <mesh ref={productInner}>
                        <Suspense>
                            <GetModel file="/glb/plates-80-transformed.glb"/>
                        </Suspense>
                    </mesh>
                </group>
            </group>
            <spotLight intensity={1} angle={.1} penumbra={1} position={[10, 10, -5]} castShadow />
            <ContactShadows opacity={.8}
                        scale={[5 / scaleOffset, 10 / scaleOffset, 2 / scaleOffset]}
                        position={[0, -1.2 / scaleOffset, 0]}  blur={5} far={1.2} />
            <Environment files={suspend(warehouse)} frames={degraded ? 1 : Infinity} resolution={256}/>
        </>
    )
}
function KustomerAwardThree(props) {
    const { width, height } = useWindowSize();
    let perspective = 15;
    let fov = 12;

    return (
        <div className="kustomer-award-product">
            <div className="kustomer-award-product-img">
                <div
                    className="kustomer-award-product-img-three">
                    <Canvas camera={{ fov: fov, near: 0.1, far: 10000, position: [0, 0, perspective], aspect: width / height }} shadows>
                        <Content width={width} height={height} { ...props } />
                        <AdaptiveDpr pixelated />
                    </Canvas>
                </div>
            </div>
            <div className="kustomer-award-product-qr">
                <div className="kustomer-award-product-qr-wrap">
                    <img src={props.qr.url} alt={props.qr.alt} />
                </div>
            </div>
        </div>
    )
}
export default KustomerAwardThree;