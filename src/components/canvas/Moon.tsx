"use client";

import { forwardRef } from "react";
import { Mesh } from "three";
import { useTexture } from "@react-three/drei";

const Moon = forwardRef<Mesh>((props, ref) => {
    // Load textures from public/textures/
    const [colorMap, displacementMap] = useTexture([
        '/textures/moon_color.jpg',
        '/textures/moon_displacement.jpg',
    ]);

    return (
        <mesh ref={ref} rotation={[0, 0, 0]}>
            {/* High segment count for displacement, but optimized */}
            <sphereGeometry args={[2, 48, 48]} />
            <meshStandardMaterial
                map={colorMap}
                displacementMap={displacementMap}
                displacementScale={0.06}
                roughness={0.8}
                metalness={0.1}
            />
        </mesh>
    );
});

Moon.displayName = "Moon";
export default Moon;

