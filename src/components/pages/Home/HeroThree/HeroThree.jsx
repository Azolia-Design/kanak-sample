import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {DoubleSide} from "three";
import { Image } from '@react-three/drei'
import useWindowSize from "@hooks/useWindowSize";
import { suspend } from 'suspend-react'
import { animate, scroll } from "motion"
import { Fork } from './Fork.jsx';
import { Environment, ContactShadows, AdaptiveDpr} from "@react-three/drei";
import { animated, useTransition } from '@react-spring/three';
import { useProductIndex, }from '@contexts/StoreGlobal';
import GetModel from "@components/common/GetModel.jsx";
import * as ut from '@/js/utils.js'
import './HeroThree.scss';

const warehouse = import('/envMap/warehouse.hdr?url').then((module) => module.default)
function CustomMaterial({...props}) {
    return (<meshStandardMaterial color={props.color} roughness={props.roughness}/>)
}

function Model({ item, ...styles }) {
    return (
        <animated.group {...styles}>
            <animated.mesh
                material-color="white">
                    <Suspense>
                        {item.uid == 'burrito-bowls-ka1065' ? (
                            <GetModel file='/glb/64-oval-bowl-clean-transformed.glb' scale={[.9,.9,.9]} rotation={[0, Math.PI * -.5, 0]}/>
                        ) : item.uid == 'compartment-trays-st5515' ? (
                            <GetModel file='/glb/KA10054-clean-transformed.glb' scale={[.8,.8,.8]} position={[0, .02, 0]} />
                        ) : item.uid == 'molded-fiber-3-compartment-plates-ba5504' ? (
                            <GetModel file='/glb/3-elegant-compartments-plates-clean-transformed.glb' rotation={[Math.PI * -.5, 0, 0]} scale={[2, 2, 2]} position={[0, 0.015, 0]} />
                        ) : item.uid == 'soup-bowls-dc0825' ? (
                            <GetModel file='/glb/41-ramen-clean-transformed.glb' scale={[.68,.68,.68]} position={[0,-.015,0]}/>
                        ) : item.uid == 'produce-trays-pt8412' ? (
                            <GetModel file='/glb/48-monte-tray-clean-transformed.glb' scale={[1.2,1.2,1.2]}/>
                        ) : item.uid == 'pla-cutlery-ct6523' ? (
                            <Fork material={<CustomMaterial color='#F9833A' roughness={.2} />} />
                        ) : item.uid == 'custom-double-wall-hot-cups-dw1204' ? (
                            <GetModel file='/glb/kup-5-transformed.glb' scale={[.76,.76,.76]} position={[0,-.02,0]}/>
                        ) : item.uid == 'pla-straw' ? (
                            <Image url="/image-straw.png" transparent segments={10} scale={[.2,.2]} side={DoubleSide} position={[0,.02,0]}/>
                        ) : item.uid == 'one-compartment-clamshells-ba6631' ? (
                            <GetModel file='/glb/klamshell-79-transformed.glb' scale={[.8,.8,.8]} position={[0,-.01,0]}/>
                        ) : item.uid == 'take-away-bags-ka355231150' ? (
                            <Image url="/image-bag.png" transparent segments={10} scale={[.2,.2]} side={DoubleSide} position={[0,.02,0]}/>
                        ) : item.uid == 'take-away-trays-ka99co' ? (
                            <GetModel file='/glb/BA-CFH-700-salad-box-clean-transformed.glb' scale={[.8,.8,.8]} position={[0,-.01,0]}/>
                        ) : item.uid == 'takeaway-containers' ? (
                            <GetModel file='/glb/cfh-900-saladbox-lid-clearn-transformed.glb' scale={[.8,.8,.8]} position={[0,-.01,0]}/>
                        ): item.uid == 'sealable-trays-ka12st' ? (
                            <GetModel file='/glb/53-square-food-clean-transformed.glb' scale={[.8,.8,.8]} position={[0,-.01,0]}/>
                        ) : (
                            <GetModel file='/glb/m_box-clean-transformed.glb' scale={[.8,.8,.8]} position={[0,.01,0]}/>
                        )}
                    </Suspense>
            </animated.mesh>
        </animated.group>
    )
}
function Content({...props}) {
    const wrap = useRef()
    const contactShadow = useRef(null)
    const productsWrap = useRef()
    const products = useRef()
    const forkWrap = useRef()
    const fork = useRef()
    const { index, setIndex } = useProductIndex();
    const [scaleOffset, setScaleOffset] = useState(1);
    const [degraded, degrade] = useState(false)
    const clock = useThree(state => state.clock);

    useFrame((state, delta) => {
        if (!products.current) return;
        if (index.direction !== 0 ) {
            if (Math.abs(products.current.rotation.y) >= Math.PI * 2) {
                products.current.rotation.y = 0;
            } else {
                products.current.rotation.y = products.current.rotation.y + .006 * index.direction;
            }
        } else {
            products.current.rotation.x += (0 - products.current.rotation.x + Math.cos(clock.elapsedTime / 2) * Math.PI * .02) * .08
            products.current.rotation.y += (0 - products.current.rotation.y + Math.cos(clock.elapsedTime / 2) * Math.PI * .02) * .08
        }
        if (!fork.current) return;
        fork.current.rotation.x = Math.cos(clock.elapsedTime / 2) * Math.PI * .02 * -1
        fork.current.rotation.y = Math.sin(clock.elapsedTime / 2) * Math.PI * .04 * -1
    })

    const transition = useTransition(index.value, {
        from: { rotation: [0, -Math.PI * index.direction, 0], scale: [0, 0, 0], opacity: 0 },
        enter: { rotation: [0, 0, 0], scale: [1, 1, 1], opacity: 1 },
        leave: { rotation: [0, Math.PI * index.direction, 0], scale: [0, 0, 0], opacity: 0 },
        config: () => (n) => n === "opacity" && { friction: 60 }
    })

    useEffect(() => {
        let isLock = false;
        scroll(({ y }) => {
            if (y.progress >= 0 && y.progress < 1) {
                if (document.querySelectorAll('.home-prod-cards-inner').length >= 1) {
                    if (y.progress >= (window.innerWidth < 767 ? .76 : .9)) {
                        if (isLock == false) {
                            isLock = true;
                            setIndex({ direction: -1, value: 0 });
                        }
                    } else {
                        if (isLock == true) {
                            isLock = false;
                            setIndex({ direction: 0, value: 0 });
                        }

                    }
                    if (contactShadow) {
                        contactShadow.current.position.y = animThreeVal(-3 / scaleOffset, -.4 / scaleOffset, y.progress)
                    }
                }
            }
        }, {
            target: document.querySelector('.home-prod-cards-inner'),
            offset: ["start end", "center center"]
        })
    }, [])

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

        let leftOffset = window.innerWidth > 767 ? ut.offset(ut.dom('.home-prod-cards')).left + ut.dom('.home-prod-cards').clientWidth / 2 - window.innerWidth / 2 : 0;
        let scrollDis = ut.offset(ut.dom('.home-prod-cards')).top - ((window.innerHeight - ut.dom('.home-prod-cards-inner').clientHeight) / 2);
        scroll(({y}) => {
            if (!productsWrap.current) return;
            if (y.progress >= 0 && y.progress < 1) {
                productsWrap.current.position.set(animThreeVal(1.6 / scaleOffset, -.3 / scaleOffset, y.progress), animThreeVal(-.65 / scaleOffset, 0 / scaleOffset, y.progress), 0)
                productsWrap.current.rotation.set(animThreeValRot(.25, -1, y.progress), animThreeValRot(-.28, 0, y.progress), animThreeValRot(.165, -.05, y.progress))
            }
            if (!forkWrap.current) return;
            forkWrap.current.scale.set(animThreeVal(11 / scaleOffset, 5 / scaleOffset, y.progress), animThreeVal(11 / scaleOffset, 5 / scaleOffset, y.progress), animThreeVal(11 / scaleOffset, 5 / scaleOffset, y.progress))
            forkWrap.current.position.set(animThreeVal(1.4 / scaleOffset, 2 / scaleOffset, y.progress), animThreeVal(1.2 / scaleOffset, 3 / scaleOffset, y.progress), animThreeVal(-.4 / scaleOffset, -1 / scaleOffset, y.progress))
            forkWrap.current.rotation.set(animThreeValRot(.6, .75, y.progress),animThreeValRot(-.1, .2, y.progress), animThreeValRot(.2, .4, y.progress))
        }, {
            offset: ['start start', `${scrollDis * .4}px start`]
        })

        scroll(({y}) => {
            if (y.progress > 0 && y.progress <= 1) {
                if (!productsWrap.current) return;
                animate('.home-hero-three-stick-inner', {x: leftOffset * y.progress}, {duration: 0})
                productsWrap.current.position.set(animThreeVal(-.3 / scaleOffset, 0 / scaleOffset, y.progress), animThreeVal(0 / scaleOffset, (window.innerWidth < 767 ? -.05 : -.15) / scaleOffset, y.progress), 0)
                productsWrap.current.rotation.set(animThreeValRot(-1, -1.91, y.progress), animThreeValRot(0, .33, y.progress), animThreeValRot(-.05, 0, y.progress))
            }
        }, {
            offset: [`${scrollDis * .4}px start`, `${scrollDis}px start`]
        })
        scroll(({y}) => {
            if (y.progress >= 0 && y.progress < 1) {
                if (!productsWrap.current) return;
                productsWrap.current.scale.set(
                    animThreeVal(16 / scaleOffset, 5 / scaleOffset, y.progress),
                    animThreeVal(16 / scaleOffset, 5 / scaleOffset, y.progress),
                    animThreeVal(16 / scaleOffset, 5 / scaleOffset, y.progress)
                )
            }
        }, {
            offset: ['start start', `${scrollDis * .6}px start`]
        })
        scroll(({y}) => {
            if (y.progress > 0 && y.progress <= 1) {
                if (!productsWrap.current) return;
                let scale = {
                    from: 5 / scaleOffset,
                    to: (window.innerWidth < 767 ? 6 : 7) / scaleOffset
                }
                productsWrap.current.scale.set(
                    animThreeVal(scale.from, scale.to, y.progress),
                    animThreeVal(scale.from, scale.to, y.progress),
                    animThreeVal(scale.from, scale.to, y.progress)
                )
            }
        }, {
            offset: [`${scrollDis * .6}px start`, `${scrollDis}px start`]
        })
    }, [scaleOffset])

    return (
        <>
            <group ref={wrap}>
                <group ref={productsWrap} scale={[16 /scaleOffset, 16 /scaleOffset, 16 /scaleOffset]}
                    position={[1.6 / scaleOffset, -.65 / scaleOffset, 0]}
                    rotation={[Math.PI * .25, -Math.PI * .28, Math.PI * .165]}>
                    <group ref={products}>
                        {transition(({ opacity, ...style }, currentIndex) => (
                            props.list.map((item, idx) => (
                                idx === currentIndex &&
                                <Model key={idx} item={item} {...style} />
                            ))
                        ))}
                    </group>
                </group>
                <spotLight intensity={1} angle={.1} penumbra={1} position={[0, 10, 0]} castShadow />
                <ContactShadows opacity={.2} ref={contactShadow}
                    scale={[7 / scaleOffset, 7 / scaleOffset, 7 / scaleOffset]}
                    position={[0, -.4 / scaleOffset, 0]}  blur={2} far={1.2} />
                <Suspense>
                    <group ref={forkWrap} scale={[11 / scaleOffset, 11 / scaleOffset, 11 / scaleOffset]}
                        position={[1.4 / scaleOffset, 1.2 / scaleOffset, -.4 / scaleOffset]}
                        rotation={[Math.PI * .6, -Math.PI * .1, Math.PI * .2]}>
                        <mesh ref={fork}>
                            <Fork material={<CustomMaterial color='#F9833A' roughness={.2} />} />
                        </mesh>
                    </group>
                </Suspense>
            </group>
            <Environment files={suspend(warehouse)} frames={degraded ? 1 : Infinity} resolution={256}/>
        </>
    )
}

function HomeHeroThree({...props}) {
    const { width, height } = useWindowSize();
    const threeRef = useRef();
    if (width == 0) {
        return;
    } else {
        let perspective = 5;
        let fov = 30;
        return (
            <div className="home-hero-three" ref={threeRef}>
                <div className="home-hero-three-stick">
                    <div className="home-hero-three-stick-inner">
                        <Canvas camera={{ fov: fov, near: 0.1, far: 10000, position: [0, 0, perspective], aspect: width / height }} shadows>
                            <Suspense fallback={null}>
                                <Content width={width} height={height} list={props.list}/>
                                <AdaptiveDpr pixelated />
                            </Suspense>
                        </Canvas>
                    </div>
                </div>
            </div>
        )
    }
}
export default HomeHeroThree;