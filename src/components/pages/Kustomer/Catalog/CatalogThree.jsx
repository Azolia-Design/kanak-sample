import { useRef, useEffect, useState, Suspense, Fragment, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import useWindowSize from "@hooks/useWindowSize";
import { suspend } from 'suspend-react'
import { animate, scroll } from "motion"
import { Fork } from '@pages/Home/HeroThree/Fork.jsx';
import { Environment, ContactShadows, AdaptiveDpr } from "@react-three/drei";
import { useSpring, useTransition, animated, easings } from '@react-spring/three'
import { GetModel } from "../../../common/GetModel.jsx";
import { useProductIndex } from "@contexts/StoreGlobal.js";
import * as ut from '@/js/utils.js'

const warehouse = import('/envMap/warehouse.hdr?url').then((module) => module.default)
function Content(props) {
    const wrap = useRef()
    const contactShadow = useRef(null)
    const productsWrap = useRef();
    const products = useRef();
    const [scaleOffset, setScaleOffset] = useState(1);
    const [degraded, degrade] = useState(false)
    const clock = useThree(state => state.clock);
    let isLock = false;
    useFrame((state, delta) => {
        if (!products.current) return;
        products.current.rotation.y += .006 * props.direction
    })
    const transition = useTransition(props.index, {
        from: { rotation: [0, -Math.PI * props.direction, 0], scale: [0, 0, 0], opacity: 0 },
        enter: { rotation: [0, 0, 0], scale: [1, 1, 1], opacity: 1 },
        leave: { rotation: [0, Math.PI * props.direction, 0], scale: [0, 0, 0], opacity: 0 },
        config: () => (n) => n === "opacity" && { friction: 60 }
    })

    function animThreeValRot(oldVal, newVal, prog) {
        return Math.PI * (oldVal + ((-oldVal + newVal) * prog))
    }
    function animThreeVal(oldVal, newVal, prog) {
        return oldVal + ( (-oldVal + newVal) * prog)
    }
    useEffect(() => {
        if (window.innerWidth > 991) {
        } else if (window.innerWidth > 767) {
            setScaleOffset(2)
        } else {
            setScaleOffset(1.5)
        }
    }, [scaleOffset])
    return (
        <>
            <group ref={wrap}>
                <group
                    ref={productsWrap}
                    scale={[7 / scaleOffset, 7 / scaleOffset, 7 / scaleOffset]}
                    rotation={[-1.91 * Math.PI, .33 * Math.PI, 0 * Math.PI]}
                    position={[0, -.15 / scaleOffset, 0]}
                >
                    <group ref={products}>
                        {transition(({ opacity, ...style }, currentIndex) => (
                            props.list.map((item, idx) => (
                                idx === currentIndex && (
                                    <animated.group key={idx} { ...style }>
                                        <animated.mesh
                                            material-color="white"
                                            material-opacity={opacity}>
                                            <Suspense>
                                                {item.uid == 'bowls' ? (
                                                    <GetModel file='/glb/58-bowl-clean-transformed.glb' scale={[.36,.36,.36]}/>
                                                ) : item.uid == 'plates--platters' ? (
                                                    <GetModel file='/glb/plates-80-transformed.glb' scale={[.9,.9,.9]} position={[0,.01,0]}/>
                                                ) : item.uid == 'kutlery' ? (
                                                    <GetModel file='/glb/22-wooden-fork-clean-transformed.glb'/>
                                                ) : item.uid == 'cups' ? (
                                                    <GetModel file='/glb/kup-5-transformed.glb' scale={[.76,.76,.76]} position={[0,-.02,0]}/>
                                                ) : (
                                                    <GetModel file='/glb/m_box-clean-transformed.glb' scale={[.8,.8,.8]} position={[0,.01,0]}
                                                    />
                                                )}
                                            </Suspense>
                                            <meshBasicMaterial transparent />
                                        </animated.mesh>
                                    </animated.group>
                                )
                            ))
                        ))}
                    </group>
                </group>
                <spotLight intensity={1} angle={.1} penumbra={1} position={[0, 10, 0]} castShadow />
                <ContactShadows opacity={.2} ref={contactShadow}
                    scale={[7 / scaleOffset, 7 / scaleOffset, 7 / scaleOffset]}
                    position={[0, -.4 / scaleOffset, 0]}  blur={2} far={1.2} />
            </group>
            <Environment files={suspend(warehouse)} frames={degraded ? 1 : Infinity} resolution={256}/>
        </>
    )
}

function CatalogThreeMain(props) {
    const { width, height } = useWindowSize();
    const { index, setIndex } = useProductIndex();
    const [direction, setDirection] = useState(1);
    const list = props.list.reduce((acc, curr) => acc.concat(curr.list), []);
    let perspective = 5;
    let fov = 30;
    const onChangeIndex = (dir) => {
        setDirection(dir);
        setIndex(index + dir);
    }
    return (
        <div className="kustomer-cata-card">
            <div className="kustomer-cata-card-inner">
                <div className="kustomer-cata-card-top">
                    <div className="heading h6 txt-up txt-black kustomer-cata-card-top-txt">
                        Product Kategories
                    </div>
                    <div className="kustomer-cata-card-nav">
                        <button
                            className={`kustomer-cata-card-nav-item prev${index == 0 ? ' disable' : ''}`}
                            onClick={() => onChangeIndex(-1)}>
                            <div className="ic ic-40">
                                {props.arrIcon}
                            </div>
                        </button>
                        <button
                            className={`kustomer-cata-card-nav-item next${index == list.length - 1 ? ' disable' : ''}`}
                            onClick={() => onChangeIndex(1)}>
                            <div className="ic ic-40">
                                {props.arrIcon}
                            </div>
                        </button>
                    </div>
                </div>
                <div className="kustomer-cata-card-middle">
                    <div className="kustomer-cata-card-middle-inner">
                        <div className="kustomer-cata-card-middle-inner-canvas">
                            <Canvas camera={{ fov: fov, near: 0.1, far: 10000, position: [0, 0, perspective], aspect: width / height }} shadows>
                                <Content width={width} height={height} index={index} direction={direction} list={list} />
                                <AdaptiveDpr pixelated />
                            </Canvas>
                        </div>
                    </div>
                </div>
                <div className="kustomer-cata-card-bottom">
                    <div className="kustomer-cata-card-bottom-txt-wrap">
                        {list.map((el, idx) => (
                            <div
                                key={idx}
                                className={`heading h5 txt-up txt-black kustomer-cata-card-bottom-txt${idx == index ? ' active' : ''}`}>
                                {el.name}
                            </div>
                        ))}
                    </div>
                    <div className="kustomer-cata-card-qr-wrap">
                        <div className={`kustomer-cata-card-qr`}>
                            {props.qr}
                        </div>
                        {/* {props.itemList.map((item, idx) => (
                            <div className={`kustomer-cata-card-qr${idx == index ? ' active' : ''}`} key={idx}>
                                <img src={item.data.qr.url} alt="" className="ic ic-80" />
                            </div>
                        ))} */}
                    </div>
                </div>
            </div>
            <div className='kustomer-cata-card-pagination'>
                {props.list.map((_, idx) => (
                    <button className={`kustomer-cata-card-pagination-dot${idx == index ? ' active' : ''}`} key={idx}>
                        <span></span>
                    </button>
                ))}
            </div>
        </div>
    )
}
export default CatalogThreeMain;