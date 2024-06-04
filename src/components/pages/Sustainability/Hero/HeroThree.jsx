import './Hero.scss';
import useWindowSize from "@hooks/useWindowSize";
import { AdaptiveDpr, ContactShadows, Environment } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState, Suspense } from "react";
import GetModel from "@components/common/GetModel.jsx";
import { suspend } from 'suspend-react'
import { animate, scroll } from "motion"

const warehouse = import('/envMap/warehouse.hdr?url').then((module) => module.default)

function Content(props) {
    const modelRef = useRef();
    const modelWrapRef = useRef();
    const contactShadow = useRef(null);
    const [degraded, degrade] = useState(false)
    const [scaleOffset, setScaleOffset] = useState(1);

    function easeInOutCubic(x) {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }
    function animThreeValRot(oldVal, newVal, prog) {
        return Math.PI * (oldVal + ((-oldVal + newVal) * prog))
    }
    function animThreeVal(oldVal, newVal, prog, ease = easeInOutCubic) {
        return (oldVal + ( (-oldVal + newVal) * ease(prog)));
    }

    let isSet = false;
    useFrame(({ clock }) => {
        if (!modelRef.current) return;
        modelRef.current.rotation.x += (0 - modelRef.current.rotation.x + Math.sin(clock.getElapsedTime() / 2) * Math.PI * .02) * .08
        modelRef.current.rotation.y += (0 - modelRef.current.rotation.y + Math.cos(clock.getElapsedTime() / 2) * Math.PI * .02) * .08
        modelRef.current.children[0].children[1].position.set(0, 0.041, -0.08)
        if (!isSet) {
            modelRef.current.children[0].children[1].rotation.x = -Math.PI / 2
            isSet = true
        }
    })

    useEffect(() => {
        if (window.innerWidth > 991) {
        } else if (window.innerWidth > 767) {
            setScaleOffset(1.2)
        } else {
            setScaleOffset(1.5)
        }

        scroll(({ y }) => {
            if (!modelWrapRef.current) return;
            if (y.progress >= 0 && y.progress < 1) {
                modelWrapRef.current.position.set(0, animThreeVal(-.6 / scaleOffset, -.4 / scaleOffset, y.progress), 0)
                modelWrapRef.current.rotation.set(animThreeValRot(0, .1, y.progress), 0, 0)

                contactShadow.current.position.y = animThreeVal(-1.1 / scaleOffset, -1.2 / scaleOffset, y.progress)

                if (modelRef.current) {
                    modelRef.current.children[0].children[1].rotation.x = animThreeValRot(-.5, 0, y.progress)    
                };
            }
        }, {
                target: document.querySelector('.sustainable-hero') ,
                offset: ["start start", "end 50%"]
        })

        scroll(({ y }) => {
            if (!modelWrapRef.current) return;
            if (y.progress > 0 && y.progress <= 1) {
                modelWrapRef.current.position.set(animThreeVal(0 / scaleOffset, .3 / scaleOffset, y.progress), animThreeVal(-.4 / scaleOffset, -.4 / scaleOffset, y.progress), animThreeVal(0 / scaleOffset, -.1 / scaleOffset, y.progress))
                modelWrapRef.current.rotation.set(animThreeValRot(.1, .4, y.progress), animThreeValRot(0, .02, y.progress), animThreeValRot(0, -.35, y.progress))

                contactShadow.current.position.y = animThreeVal(-1.2 / scaleOffset, -1.25 / scaleOffset, y.progress)
            }
        }, {
                target: document.querySelector('.sustainable-intro') ,
                offset: ["start 50%", "end 50%"]
        })
        scroll(({ y }) => {
            if (!modelWrapRef.current) return;
            if (y.progress > 0 && y.progress <= 1) {
                modelWrapRef.current.position.set(animThreeVal(.3 / scaleOffset, 1.6 / scaleOffset, y.progress), animThreeVal(-.4 / scaleOffset, -.1 / scaleOffset, y.progress), animThreeVal(-.1 / scaleOffset, -.25 / scaleOffset, y.progress))
                modelWrapRef.current.rotation.set(animThreeValRot(0.4, 2.2, y.progress), animThreeValRot(.02, -1, y.progress), animThreeValRot(-.35, -.2, y.progress))
                modelWrapRef.current.scale.set(animThreeVal(7 / scaleOffset, 7.4 / scaleOffset, y.progress), animThreeVal(7 / scaleOffset, 7.4 / scaleOffset, y.progress), animThreeVal(7 / scaleOffset, 7.4 / scaleOffset, y.progress))

                contactShadow.current.position.y = animThreeVal(-1.25 / scaleOffset, -1.35 / scaleOffset, y.progress)
            }
        }, {
                target: document.querySelector('.sustainable-practice-wrap') ,
                offset: ["start 50%", "end 50%"]
        })
        scroll(({ y }) => {
            if (!modelWrapRef.current) return;
            if (y.progress > 0 && y.progress <= 1) {
                modelWrapRef.current.position.set(animThreeVal(1.6 / scaleOffset, -1.2 / scaleOffset, y.progress), animThreeVal(-.1 / scaleOffset, -.6 / scaleOffset, y.progress), animThreeVal(-.25 / scaleOffset, 0 / scaleOffset, y.progress))
                modelWrapRef.current.rotation.set(animThreeValRot(2.2, 2.1, y.progress), animThreeValRot(-1, -1.1, y.progress), animThreeValRot(-.2, .2, y.progress))
                modelWrapRef.current.scale.set(animThreeVal(7.4 / scaleOffset, 5.5 / scaleOffset, y.progress), animThreeVal(7.4 / scaleOffset, 5.5 / scaleOffset, y.progress), animThreeVal(7.4 / scaleOffset, 5.5 / scaleOffset, y.progress))

                contactShadow.current.position.y = animThreeVal(-1.35 / scaleOffset, -1.2 / scaleOffset, y.progress)
            }
        }, {
                target: document.querySelectorAll('.sustainable-practice-item')[0],
                offset: ["start 50%", "end 50%"]
        })
        scroll(({ y }) => {
            if (!modelWrapRef.current) return;
            if (y.progress > 0 && y.progress <= 1) {
                modelWrapRef.current.position.set(animThreeVal(-1.2 / scaleOffset, 1 / scaleOffset, y.progress), animThreeVal(-.6 / scaleOffset, -.8 / scaleOffset, y.progress), animThreeVal(0 / scaleOffset, 0 / scaleOffset, y.progress))
                modelWrapRef.current.rotation.set(animThreeValRot(2.1, .8, y.progress), animThreeValRot(-1.1, -.8, y.progress), animThreeValRot(.2, .8, y.progress))
                contactShadow.current.position.y = animThreeVal(-1.2 / scaleOffset, -1.36 / scaleOffset, y.progress)
            }
        }, {
                target: document.querySelectorAll('.sustainable-practice-item')[1],
                offset: ["start 50%", "end 50%"]
        })
        scroll(({ y }) => {
            if (!modelWrapRef.current) return;
            if (y.progress > 0 && y.progress <= 1) {
                modelWrapRef.current.position.set(animThreeVal(1 / scaleOffset, -1 / scaleOffset, y.progress), animThreeVal(-.8 / scaleOffset, -.7 / scaleOffset, y.progress), animThreeVal(0 / scaleOffset, 0 / scaleOffset, y.progress))
                modelWrapRef.current.rotation.set(animThreeValRot(.8, 1.08, y.progress), animThreeValRot(-.8, -1.045, y.progress), animThreeValRot(.8, .98, y.progress))

                contactShadow.current.position.y = animThreeVal(-1.36 / scaleOffset, -1 / scaleOffset, y.progress)
            }
        }, {
                target: document.querySelectorAll('.sustainable-practice-item')[2],
                offset: ["start 50%", "end 50%"]
        })
    }, [modelRef]);

    useEffect(() => {
        console.log(modelRef.current)
        
    }, [modelRef]);
    return (
        <>
            <group>
                <group
                    ref={modelWrapRef}
                    scale={[7 / scaleOffset, 7 / scaleOffset, 7 / scaleOffset]}
                    position={[0, -.6 / scaleOffset, 0]}
                >
                    <Suspense>
                        <mesh ref={modelRef}  material-color="white">
                            <GetModel file='/glb/klamshell-79-clean-rig-transformed.glb' />
                        </mesh>
                    </Suspense>
                </group>
                <ambientLight intensity={0.1} />
                <directionalLight />
                <ContactShadows opacity={.2} ref={contactShadow}
                    scale={[7 / scaleOffset, 7 / scaleOffset, 7 / scaleOffset]}
                    position={[0, -1.1 / scaleOffset, 0]}  blur={2} far={1.4} />
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