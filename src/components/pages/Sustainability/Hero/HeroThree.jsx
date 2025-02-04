import './Hero.scss';
import useWindowSize from "@hooks/useWindowSize";
import { AdaptiveDpr, ContactShadows, Environment } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState, Suspense } from "react";
import GetModel from "@components/common/GetModel.jsx";
import { suspend } from 'suspend-react'
import { scroll } from "motion"

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
            setScaleOffset(1.8)
        }
    }, [scaleOffset]);

    useEffect(() => {
        if (!modelWrapRef.current) return;

        scroll(({ y }) => {
            if (y.progress >= 0 && y.progress < 1) {
                modelWrapRef.current.rotation.set(animThreeValRot(.18, .1, y.progress), 0, 0)

                if (modelRef.current) {
                    modelRef.current.children[0].children[1].rotation.set(animThreeValRot(-.5, 0, y.progress), 0,0)
                };
                if (window.innerWidth > 767) {
                    //desktop
                    if (window.innerWidth > 991) {
                        modelWrapRef.current.position.set(0, animThreeVal(-.65 / scaleOffset, -.4 / scaleOffset, y.progress), 0)
                        contactShadow.current.position.y = animThreeVal(-1.1 / scaleOffset, -1.2 / scaleOffset, y.progress)
                    }
                    //tablet
                    else {
                        modelWrapRef.current.scale.set(animThreeVal(6.5 / scaleOffset, 6.5 / scaleOffset, y.progress), animThreeVal(6.5 / scaleOffset, 6.5 / scaleOffset, y.progress), animThreeVal(6.5 / scaleOffset, 6.5 / scaleOffset, y.progress))
                    }
                }
                //mobile
                else {
                    modelWrapRef.current.position.set(0, animThreeVal(-1.15 / scaleOffset, -.4 / scaleOffset, y.progress), 0)
                    contactShadow.current.position.y = animThreeVal(-1.5 / scaleOffset, -1.55 / scaleOffset, y.progress)
                }
            }
        }, {
            target: document.querySelector('.sustainable-hero'),
            offset: ["start start", "end 50%"]
        })

        scroll(({ y }) => {
            if (y.progress > 0 && y.progress <= 1) {
                // modelWrapRef.current.position.set(animThreeVal(0 / scaleOffset, -.3 / scaleOffset, y.progress), animThreeVal(-.4 / scaleOffset, -.4 / scaleOffset, y.progress), animThreeVal(0 / scaleOffset, -.1 / scaleOffset, y.progress))
                modelWrapRef.current.rotation.set(animThreeValRot(.1, .6, y.progress), animThreeValRot(0, .02, y.progress), animThreeValRot(0, -.35, y.progress))

                contactShadow.current.position.set(animThreeVal(0 / scaleOffset, 0 / scaleOffset, y.progress), animThreeVal(-1.2 / scaleOffset, -2 / scaleOffset, y.progress), animThreeVal(0 / scaleOffset, 5 / scaleOffset, y.progress))
                if (modelRef.current) {
                    modelRef.current.children[0].children[1].rotation.x = 0;
                }
                if (window.innerWidth > 767) {
                    modelWrapRef.current.position.set(animThreeVal(0 / scaleOffset, -.3 / scaleOffset, y.progress), animThreeVal(-.4 / scaleOffset, -.4 / scaleOffset, y.progress), animThreeVal(0 / scaleOffset, -.1 / scaleOffset, y.progress))
                    //desktop
                    if (window.innerWidth > 991) {
                    }
                    //tablet
                    else {
                        modelWrapRef.current.scale.set(animThreeVal(6.5 / scaleOffset, 4.8 / scaleOffset, y.progress), animThreeVal(6.5 / scaleOffset, 4.8 / scaleOffset, y.progress), animThreeVal(6.5 / scaleOffset, 4.8 / scaleOffset, y.progress))
                    }
                }
                //mobile
                else {
                    modelWrapRef.current.scale.set(animThreeVal(6.5 / scaleOffset, 5.2 / scaleOffset, y.progress), animThreeVal(6.5 / scaleOffset, 5.2 / scaleOffset, y.progress), animThreeVal(6.5 / scaleOffset, 5.2 / scaleOffset, y.progress))
                    modelWrapRef.current.position.set(0 / scaleOffset, animThreeVal(-.4 / scaleOffset, -.5 / scaleOffset, y.progress), 0)
                    // contactShadow.current.position.y = animThreeVal(-1.5 / scaleOffset, -1.55 / scaleOffset, y.progress)
                }
            }
        }, {
                target: document.querySelector('.sustainable-intro') ,
                offset: ["start 50%", "end 50%"]
        })

        scroll(({ y }) => {
            if (y.progress > 0 && y.progress <= 1) {
                modelWrapRef.current.rotation.set(animThreeValRot(0.6, 1.2, y.progress), animThreeValRot(.02, 0, y.progress), animThreeValRot(-.35, -.2, y.progress))

                if (window.innerWidth > 767) {
                    //desktop
                    if (window.innerWidth > 991) {
                        modelWrapRef.current.position.set(animThreeVal(-.3 / scaleOffset, 1 / scaleOffset, y.progress), animThreeVal(-.4 / scaleOffset, -.1 / scaleOffset, y.progress), animThreeVal(-.1 / scaleOffset, -.25 / scaleOffset, y.progress))
                        modelWrapRef.current.scale.set(animThreeVal(6.5 / scaleOffset, 6 / scaleOffset, y.progress), animThreeVal(6.5 / scaleOffset, 6 / scaleOffset, y.progress), animThreeVal(6.5 / scaleOffset, 6 / scaleOffset, y.progress))
                    }
                    //tablet
                    else {
                        modelWrapRef.current.position.set(animThreeVal(-.3 / scaleOffset, .4 / scaleOffset, y.progress), animThreeVal(-.4 / scaleOffset, -.1 / scaleOffset, y.progress), animThreeVal(-.1 / scaleOffset, -.25 / scaleOffset, y.progress));
                        modelWrapRef.current.scale.set(animThreeVal(4.8 / scaleOffset, 4 / scaleOffset, y.progress), animThreeVal(4.8 / scaleOffset, 4 / scaleOffset, y.progress), animThreeVal(4.8 / scaleOffset, 4 / scaleOffset, y.progress));
                    }
                }
                //mobile
                else {
                    modelWrapRef.current.position.set(animThreeVal(0 / scaleOffset, 1 / scaleOffset, y.progress), animThreeVal(-.5 / scaleOffset, 0 / scaleOffset, y.progress), 0)
                    modelWrapRef.current.rotation.set(animThreeValRot(0.6, 1.2, y.progress), animThreeValRot(.02, 0, y.progress), animThreeValRot(-.35, -.2, y.progress))
                    modelWrapRef.current.scale.set(animThreeVal(5.2 / scaleOffset, 4.8 / scaleOffset, y.progress), animThreeVal(5.2 / scaleOffset, 4.8 / scaleOffset, y.progress), animThreeVal(5.2 / scaleOffset, 4.8 / scaleOffset, y.progress));
                }
            }
        }, {
                target: document.querySelector('.sustainable-practice-wrap'),
                offset: ["start 50%", "end 30%"]
        })

        scroll(({ y }) => {
            if (y.progress > 0 && y.progress <= 1) {
                modelWrapRef.current.position.set(animThreeVal(1 / scaleOffset, -1.2 / scaleOffset, y.progress), animThreeVal(-.1 / scaleOffset, -.6 / scaleOffset, y.progress), animThreeVal(-.25 / scaleOffset, 0 / scaleOffset, y.progress))
                modelWrapRef.current.rotation.set(animThreeValRot(1.2, 2.1, y.progress), animThreeValRot(0, -.2, y.progress), animThreeValRot(-.2, -.1, y.progress))
                if (window.innerWidth > 767) {
                    //desktop
                    if (window.innerWidth > 991) {
                        modelWrapRef.current.position.set(animThreeVal(1 / scaleOffset, -1.2 / scaleOffset, y.progress), animThreeVal(-.1 / scaleOffset, -.6 / scaleOffset, y.progress), animThreeVal(-.25 / scaleOffset, 0 / scaleOffset, y.progress))
                        modelWrapRef.current.scale.set(animThreeVal(6 / scaleOffset, 5.5 / scaleOffset, y.progress), animThreeVal(6 / scaleOffset, 5.5 / scaleOffset, y.progress), animThreeVal(6 / scaleOffset, 5.5 / scaleOffset, y.progress))
                    }
                    //tablet
                    else {
                        modelWrapRef.current.position.set(animThreeVal(.4 / scaleOffset, -.6 / scaleOffset, y.progress), animThreeVal(-.1 / scaleOffset, -.8 / scaleOffset, y.progress), animThreeVal(-.25 / scaleOffset, 0 / scaleOffset, y.progress))
                    }
                }
                //mobile
                else {
                    modelWrapRef.current.rotation.set(animThreeValRot(1.2, 1.8, y.progress), animThreeValRot(0, -.2, y.progress), animThreeValRot(-.2, -.1, y.progress))
                    modelWrapRef.current.position.set(animThreeVal(1 / scaleOffset, -.6 / scaleOffset, y.progress), animThreeVal(0 / scaleOffset, -.6 / scaleOffset, y.progress), 0)
                }
            }
        }, {
                target: document.querySelectorAll('.sustainable-practice-item')[0],
                offset: ["start 30%", "end 50%"]
        })

        scroll(({ y }) => {
            if (y.progress > 0 && y.progress <= 1) {
                if (window.innerWidth > 767) {
                    modelWrapRef.current.rotation.set(animThreeValRot(2.1, 1.8, y.progress), animThreeValRot(-.2, -.3, y.progress), animThreeValRot(-.1, -.3, y.progress))
                    //desktop
                    if (window.innerWidth > 991) {
                        modelWrapRef.current.position.set(animThreeVal(-1.2 / scaleOffset, 1 / scaleOffset, y.progress), animThreeVal(-.6 / scaleOffset, -.8 / scaleOffset, y.progress), animThreeVal(0 / scaleOffset, 0 / scaleOffset, y.progress))
                        contactShadow.current.position.set(0, animThreeVal(-4 / scaleOffset, -1.36 / scaleOffset, y.progress), animThreeVal(5 / scaleOffset, 0 / scaleOffset, y.progress))
                    }
                    //tablet
                    else {
                        modelWrapRef.current.position.set(animThreeVal(-.6 / scaleOffset, .4 / scaleOffset, y.progress), animThreeVal(-.8 / scaleOffset, -1 / scaleOffset, y.progress), animThreeVal(0 / scaleOffset, 0 / scaleOffset, y.progress))
                    }
                }
                //mobile
                else {
                    modelWrapRef.current.position.set(animThreeVal(-.6 / scaleOffset, .4 / scaleOffset, y.progress), animThreeVal(-.6 / scaleOffset, -1 / scaleOffset, y.progress), animThreeVal(0 / scaleOffset, 0 / scaleOffset, y.progress))
                    modelWrapRef.current.rotation.set(animThreeValRot(1.8, 3, y.progress), animThreeValRot(-.2, -.5, y.progress), animThreeValRot(-.1, -.5, y.progress));
                }
            }
        }, {
                target: document.querySelectorAll('.sustainable-practice-item')[1],
                offset: ["start 50%", "end 50%"]
        })

        scroll(({ y }) => {
            if (y.progress > 0 && y.progress <= 1) {

                if (window.innerWidth > 767) {
                    modelWrapRef.current.rotation.set(animThreeValRot(1.8, 1.08, y.progress), animThreeValRot(-.3, -1.045, y.progress), animThreeValRot(-.3, -1.02, y.progress))
                    //desktop
                    if (window.innerWidth > 991) {
                        modelWrapRef.current.position.set(animThreeVal(1 / scaleOffset, -1 / scaleOffset, y.progress), animThreeVal(-.8 / scaleOffset, -.7 / scaleOffset, y.progress), animThreeVal(0 / scaleOffset, 0 / scaleOffset, y.progress))
                        contactShadow.current.position.set(0, animThreeVal(-1.36 / scaleOffset, -1 / scaleOffset, y.progress), 0)
                    }
                    //tablet
                    else {
                        modelWrapRef.current.position.set(animThreeVal(.4 / scaleOffset, -.55 / scaleOffset, y.progress), animThreeVal(-1 / scaleOffset, -1.1 / scaleOffset, y.progress), animThreeVal(0 / scaleOffset, 0 / scaleOffset, y.progress))
                        contactShadow.current.position.set(animThreeVal(0 / scaleOffset, -.05 / scaleOffset, y.progress), animThreeVal(-4 / scaleOffset, -.83 / scaleOffset, y.progress), animThreeVal(-1 / scaleOffset, -.6 / scaleOffset, y.progress))
                    }
                }
                //mobile
                else {
                    modelWrapRef.current.position.set(animThreeVal(.4 / scaleOffset, -.05 / scaleOffset, y.progress), animThreeVal(-1 / scaleOffset, -2 / scaleOffset, y.progress), animThreeVal(0 / scaleOffset, 0 / scaleOffset, y.progress))
                    modelWrapRef.current.rotation.set(animThreeValRot(3, 3.08, y.progress), animThreeValRot(-.5, -1.045, y.progress), animThreeValRot(-.5, -1.02, y.progress))
                }
            }
        }, {
                target: document.querySelectorAll('.sustainable-practice-item')[2],
                offset: ["start 50%", "end 50%"]
        })
    }, [modelRef, scaleOffset]);

    return (
        <>
            <group>
                <group
                    ref={modelWrapRef}
                    scale={[6.5 / scaleOffset, 6.5 / scaleOffset, 6.5 / scaleOffset]}
                    position={[0, (window.innerWidth > 767 ? -.65 : -1.15) / scaleOffset, 0]}
                >
                    <mesh ref={modelRef}  material-color="white">
                        <GetModel file='/glb/klamshell-79-clean-rig-transformed.glb' />
                    </mesh>
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
                        <Suspense fallback={<div className="sustainable-hero-three-loading">{props.icLoad}</div>}>
                            <Canvas camera={{  fov: fov, near: 0.1, far: 10000, position: [0, 0, perspective], aspect: width / height }} shadows>
                                <Content width={width} height={height}/>
                                <AdaptiveDpr pixelated />
                            </Canvas>
                        </Suspense>
                    </div>
                </div>
            </div>
        )
    }
}

export default SustainHeroThree;