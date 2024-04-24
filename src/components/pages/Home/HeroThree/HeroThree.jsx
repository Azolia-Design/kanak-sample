import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import useWindowSize from "@hooks/useWindowSize";
import { suspend } from 'suspend-react'
import { animate, scroll } from "motion"
import { Fork } from './Fork.jsx';
import { Environment, ContactShadows, useProgress, AdaptiveDpr} from "@react-three/drei";
import { animated, useTransition } from '@react-spring/three';
import { useProductIndex, progressPercent } from '@contexts/StoreGlobal';
import { GetModel } from "@components/common/GetModel.jsx";
import * as ut from '@/js/utils.js'
import './HeroThree.scss';

const warehouse = import('/envMap/warehouse.hdr?url').then((module) => module.default)
function CustomMaterial({...props}) {
    return (<meshStandardMaterial color={props.color} roughness={props.roughness}/>)
}

function Model({ opacity, item, ...styles }) {
    return (
        <animated.group {...styles}>
            <animated.mesh>
                {item.uid == 'bowls' ? (
                    <GetModel file='/glb/58-bowl-clean-transformed.glb' scale={[.36,.36,.36]}/>
                ) : item.uid == 'trays' ? (
                    <GetModel file='/glb/fp_01-clean-transformed.glb' rotation={[0, Math.PI * -.5, 0]}/>
                ) : item.uid == 'plates-platters' ? (
                    <GetModel file='/glb/plates-80-transformed.glb' scale={[.9,.9,.9]} position={[0,.01,0]}/>
                ) : item.uid == 'soup-containers' ? (
                    <GetModel file='/glb/41-ramen-clean-transformed.glb' scale={[.68,.68,.68]} position={[0,-.015,0]}/>
                ) : item.uid == 'produce' ? (
                    <GetModel file='/glb/48-monte-tray-clean-transformed.glb' scale={[1.2,1.2,1.2]}/>
                ) : item.uid == 'kutlery' ? (
                    <GetModel file='/glb/22-wooden-fork-clean-transformed.glb'/>
                ) : item.uid == 'kups' ? (
                    <GetModel file='/glb/kup-5-transformed.glb' scale={[.76,.76,.76]} position={[0,-.02,0]}/>
                ) : item.uid == 'klamshells' ? (
                    <GetModel file='/glb/klamshell-79-transformed.glb' scale={[.8,.8,.8]} position={[0,-.01,0]}/>
                ) : item.uid == 'carry-out-bags' ? (
                    <GetModel file='/glb/62-freebirds-clean-transformed.glb' scale={[.8,.8,.8]} position={[0,-.01,0]}/>
                ) : (
                    <GetModel file='/glb/m_box-clean-transformed.glb' scale={[.8,.8,.8]} position={[0,.01,0]}
                    />
                )}
                <meshBasicMaterial transparent />
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
    const { index } = useProductIndex();
    const [scaleOffset, setScaleOffset] = useState(1);
    const [degraded, degrade] = useState(false)
    const clock = useThree(state => state.clock);

    let isLock = false;
    let currentRotation = 0;

    useFrame((state, delta) => {
        if (!products.current) return;
        if (isLock) {
            products.current.rotation.x += (0 - products.current.rotation.x) * .08
            currentRotation += .006;
            if (currentRotation >= Math.PI * 2) {
                currentRotation = 0;
            }
            products.current.rotation.y = currentRotation;
        } else {
            products.current.rotation.x += (0 - products.current.rotation.x + Math.cos(clock.elapsedTime / 2) * Math.PI * .02) * .08
            products.current.rotation.y += (0 - products.current.rotation.y + Math.cos(clock.elapsedTime / 2) * Math.PI * .02) * .08
        }
        if (!fork.current) return;
        fork.current.rotation.x = Math.cos(clock.elapsedTime / 2) * Math.PI * .02 * -1
        fork.current.rotation.y = Math.sin(clock.elapsedTime / 2) * Math.PI * .04 * -1
    })

    const transition = useTransition(index, {
        from: { scale: [0, 0, 0], opacity: 0 },
        enter: { scale: [1, 1, 1], opacity: 1 },
        leave: { scale: [0, 0, 0], opacity: 0 },
        config: () => (n) => n === "opacity" && { friction: 60 },
    })

    useEffect(() => {
        scroll(({y}) => {
            if (y.progress >= .9) {
                isLock = true;
            } else {
                isLock = false;
            }
            if (contactShadow) {
                contactShadow.current.position.y = animThreeVal(-3 / scaleOffset, -.4 / scaleOffset, y.progress)
            }
        }, {
            target: document.querySelector('.home-prod-cards-inner'),
            offset: ["start end", "center center"]
        })
    }, [index])

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
                productsWrap.current.position.set(animThreeVal(1.2 / scaleOffset, -.3 / scaleOffset, y.progress), animThreeVal(-.65 / scaleOffset, 0 / scaleOffset, y.progress), 0)
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
                    animThreeVal(11 / scaleOffset, 5 / scaleOffset, y.progress),
                    animThreeVal(11 / scaleOffset, 5 / scaleOffset, y.progress),
                    animThreeVal(11 / scaleOffset, 5 / scaleOffset, y.progress)
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
                <group ref={productsWrap} scale={[11 /scaleOffset, 11 /scaleOffset, 11 /scaleOffset]}
                    position={[1.2 / scaleOffset, -.65 / scaleOffset, 0]}
                    rotation={[Math.PI * .25, -Math.PI * .28, Math.PI * .165]}>
                    <group ref={products}>
                        {transition(({ opacity, ...style }, currentIndex) => (
                            props.list.map((item, idx) => (
                                idx === currentIndex && item.data.file.url &&
                                <Model key={idx} opacity={opacity} item={item} {...style} />
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
    function Loader() {
        const { active, progress, errors, item, loaded, total } = useProgress()
        // console.log(progress)
        progressPercent.set(progress); 
    }
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
                            <Suspense fallback={<Loader/>}>
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