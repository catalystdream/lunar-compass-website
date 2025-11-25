"use client";

import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";
import { Suspense, useRef } from "react";
import { Mesh } from "three";
import Moon from "./Moon";
import Satellites from "./Satellites";
import ScrollManager from "../ScrollManager";

export default function Scene() {
    const moonRef = useRef<Mesh>(null);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -10, background: 'black', pointerEvents: 'none' }}>
            <Canvas style={{ width: '100%', height: '100%' }} gl={{ antialias: false }} dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 45 }}>
                {/* Cinematic Lighting - Shadows disabled for performance */}
                <directionalLight position={[5, 0, 5]} intensity={2.5} />
                <pointLight position={[-5, 0, -5]} intensity={0.5} color="#4444ff" /> {/* Earthshine */}

                <Suspense fallback={null}>
                    <group>
                        <Moon ref={moonRef} />
                        <Satellites />
                    </group>

                    {/* Reduced star count for performance */}
                    <Stars radius={300} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

                    {/* Scroll Manager controls the Moon and Camera */}
                    <ScrollManager moonRef={moonRef} />
                </Suspense>

                {/* Post Processing - Multisampling disabled */}
                <EffectComposer multisampling={0}>
                    <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.5} />
                    <Noise opacity={0.02} />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
