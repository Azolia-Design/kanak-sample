import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image } from '@react-three/drei'
import {DoubleSide} from "three";
import useWindowSize from "@hooks/useWindowSize";
import { suspend } from 'suspend-react'
import { animate, timeline, inView } from "motion";
import { Fork } from '@pages/Home/HeroThree/Fork.jsx';
import { Environment, ContactShadows, AdaptiveDpr } from "@react-three/drei";
import { useTransition, animated } from '@react-spring/three'
import GetModel from "@components/common/GetModel.jsx";
import { useCatalogIndex } from "@contexts/StoreGlobal.js";
import cn from 'clsx';

const warehouse = import('/envMap/warehouse.hdr?url').then((module) => module.default)
function CustomMaterial({...props}) {
    return (<meshStandardMaterial color={props.color} roughness={props.roughness}/>)
}
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
        return oldVal + ((-oldVal + newVal) * prog)
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
                            props.list.map(({ product_feature }, idx) => (
                                idx === currentIndex && (
                                    <animated.group key={idx} {...style}>
                                        <animated.mesh material-color="white">
                                            {product_feature.uid == 'burrito-bowls-ka1065' ? (
                                                props.page_title == 'Retail' ? (
                                                    <Image url="/Natural-20oz-oct-bowl.png" transparent segments={10} scale={[.2,.2]} side={DoubleSide} position={[0,.01,0]}/>
                                                ) : (
                                                    <GetModel file='/glb/64-oval-bowl-clean-transformed.glb' scale={[.9,.9,.9]} rotation={[0, Math.PI * -.5, 0]}/>
                                                )
                                            ) : product_feature.uid == 'compartment-trays-st5515' ? (
                                                <GetModel file='/glb/KA10054-clean-transformed.glb' scale={[.8,.8,.8]} position={[0, .02, 0]} />
                                            ) : product_feature.uid == '9-molded-fiber-3-compartment-plates-ba5504' ? (
                                                <GetModel file='/glb/3-elegant-compartments-plates-clean-transformed.glb' rotation={[Math.PI * -.5, 0, 0]} scale={[2, 2, 2]} position={[0, 0.015, 0]} />
                                            ) : product_feature.uid == 'soup-bowls-dc0825' ? (
                                                <GetModel file='/glb/41-ramen-clean-transformed.glb' scale={[.68,.68,.68]} position={[0,-.015,0]}/>
                                            ) : product_feature.uid == '8-produce-trays-pt8412' ? (
                                                <GetModel file='/glb/48-monte-tray-clean-transformed.glb' scale={[1.2,1.2,1.2]}/>
                                            ) : product_feature.uid == 'pla-cutlery-ct6523' ? (
                                                <Fork material={<CustomMaterial color='#F9833A' roughness={.2} />} />
                                            ) : product_feature.uid == 'custom-double-wall-hot-cups-dw1204' ? (
                                                <GetModel file='/glb/kup-5-transformed.glb' scale={[.76,.76,.76]} position={[0,-.02,0]}/>
                                            ) : product_feature.uid == 'pla-straw' ? (
                                                <Image url="/image-straw.png" transparent segments={10} scale={[.2,.2]} side={DoubleSide} position={[0,.02,0]}/>
                                            ) : product_feature.uid == '6-square-single-compartment-clamshells-ba6631' ? (
                                                <GetModel file='/glb/klamshell-79-transformed.glb' scale={[.8,.8,.8]} position={[0,-.01,0]}/>
                                            ) : product_feature.uid == 'take-away-bags-ka355231150' ? (
                                                <Image url="/image-bag.png" transparent segments={10} scale={[.2,.2]} side={DoubleSide} position={[0,.02,0]}/>
                                            ) : product_feature.uid == 'take-away-trays-ka99co' ? (
                                                <GetModel file='/glb/BA-CFH-700-salad-box-clean-transformed.glb' scale={[.8,.8,.8]} position={[0,-.02,0]}/>
                                            ) : product_feature.uid == 'takeaway-containers' ? (
                                                <GetModel file='/glb/cfh-900-saladbox-lid-clearn-transformed.glb' scale={[.8,.8,.8]} position={[0,-.01,0]}/>
                                            ) : product_feature.uid == '6x8-rectangle-3-compartment-container' ? (
                                                <Image url="/RC6814.png" transparent segments={10} scale={[.2,.2]} side={DoubleSide} position={[0,.02,0]}/>
                                            ) : product_feature.uid == 'baking-dishes-ka1117' ? (
                                                <GetModel file='/glb/53-square-food-clean-transformed.glb' scale={[.8,.8,.8]} position={[0,-.01,0]}/>
                                            ) : (
                                                <GetModel file='/glb/m_box-clean-transformed.glb' scale={[.8,.8,.8]} position={[0,.01,0]}/>
                                            )}
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
                    position={[0, -.4 / scaleOffset, 0]} blur={2} far={1.2} />
            </group>
            <Environment files={suspend(warehouse)} frames={degraded ? 1 : Infinity} resolution={256} />
        </>
    )
}

function KustomerCatalogThree(props) {
    const { width, height } = useWindowSize();
    const { index, setIndex } = useCatalogIndex();
    const [direction, setDirection] = useState(1);
    const [itemIndex, setItemIndex] = useState(0);

    let perspective = 5;
    let fov = 30;
    const conditionIndexWithDevice = (value) => props.isMobile ? value === itemIndex : value === index;
    const onChangeIndex = (dir) => {
        setDirection(dir);
        if (props.isMobile) {
            setItemIndex(itemIndex + dir);
        }
        else {
            setIndex(index + dir);
        }
    }
    useEffect(() => {
        animate('.kustomer-cata-card', { opacity: 0, transform: 'translateY(2rem)' }, { duration: 0 })

        const sequence = [
            ['.kustomer-cata-card', { opacity: 1, transform: 'none' }, { duration: 1 }],
        ]

        inView('.kustomer-cata-card', () => {
            timeline(sequence).finished.then(() => {
                document.querySelector('.kustomer-cata-card').removeAttribute('style')
            })
        })
    }, [])

    return (
        <div className="kustomer-cata-card">
            <div className="kustomer-cata-card-inner">
                <div className="kustomer-cata-card-top">
                    <div className="heading h6 txt-up txt-black kustomer-cata-card-top-txt">
                        Product Kategories
                    </div>
                    <div className="kustomer-cata-card-nav">
                        <button
                            className={cn("kustomer-cata-card-nav-item prev", { "disable": conditionIndexWithDevice(0) })}
                            onClick={() => onChangeIndex(-1)}>
                            <div className="ic ic-40">
                                {props.arrIcon}
                            </div>
                        </button>
                        <button
                            className={cn("kustomer-cata-card-nav-item next", { "disable": conditionIndexWithDevice(props.listItem.length - 1) })}
                            onClick={() => onChangeIndex(1)}>
                            <div className="ic ic-40">
                                {props.arrIcon}
                            </div>
                        </button>
                    </div>
                </div>
                <div className="kustomer-cata-card-middle">
                    <div className="kustomer-cata-card-middle-inner" data-cursor="ext">
                        <div className="kustomer-cata-card-middle-inner-canvas">
                            <Suspense fallback={<div className="kustomer-cata-card-middle-loading">{props.icLoad}</div>}>
                                <Canvas camera={{ fov: fov, near: 0.1, far: 10000, position: [0, 0, perspective], aspect: width / height }} shadows>
                                    <Content
                                        width={width}
                                        height={height}
                                        index={props.isMobile ? itemIndex : index}
                                        direction={direction}
                                        list={props.listItem}
                                        page_title={props.page_title}
                                    />
                                    <AdaptiveDpr pixelated />
                                </Canvas>
                            </Suspense>
                        </div>
                        <a href={`/katalog?kustomer=${props.currPage}&category=${props.listItem[props.isMobile ? itemIndex : index].uid}`} className="kustomer-cata-card-middle-inner-link"></a>
                    </div>
                </div>
                <div className="kustomer-cata-card-bottom">
                    <div className="kustomer-cata-card-bottom-txt-wrap">
                        {props.listItem.map((el, idx) => (
                            <a
                                key={idx}
                                href={`/katalog?kustomer=${props.currPage}&category=${el.uid}`}
                                className={cn("heading h5 txt-up txt-black kustomer-cata-card-bottom-txt", { "active": conditionIndexWithDevice(idx) })}>
                                {el.data.name}
                                <div className="ic ic-16">
                                    <svg width="100%"viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 13.5L13 3.5" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"/>
                                        <path d="M4.07227 3.5H13.0002V12.4271" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square"/>
                                    </svg>
                                </div>
                            </a>
                        ))}
                    </div>
                    <div className="kustomer-cata-card-qr-wrap">
                        {props.listItem.map(({ product_feature }, idx) => (
                            <div
                                key={idx}
                                className={cn("kustomer-cata-card-qr", { "active": conditionIndexWithDevice(idx), "hidden": !product_feature.qr.url })}>
                                <img src={product_feature.qr.url} alt="" className="ic ic-80" />
                                {product_feature.qr_url.url ?
                                    (
                                        <a href={product_feature.qr_url.url} target={product_feature.qr_url.target ? product_feature.qr_url.target : ''} className='kustomer-cata-card-qr-link'>
                                            {props.QR3DExplore}
                                        </a>
                                    ) : (
                                        <img src={product_feature.qr.url} alt="" className="kustomer-cata-card-qr-link ic ic-40" />
                                    )
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='kustomer-cata-card-pagination'>
                {props.listItem.map((_, idx) => (
                    <button
                        key={idx}
                        className={cn("kustomer-cata-card-pagination-dot", { "active": conditionIndexWithDevice(idx) })}>
                        <span></span>
                    </button>
                ))}
            </div>
        </div>
    )
}
export default KustomerCatalogThree;