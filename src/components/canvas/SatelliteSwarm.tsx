"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { InstancedMesh, Object3D, Color } from "three";

export default function SatelliteSwarm({ count = 100 }) {
    const meshRef = useRef<InstancedMesh>(null);
    const dummy = useMemo(() => new Object3D(), []);

    // Generate random orbit parameters for each satellite
    const satellites = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            radius: 1.5 + Math.random() * 1.5, // Distance from center
            speed: 0.2 + Math.random() * 0.5, // Orbit speed
            angle: Math.random() * Math.PI * 2, // Starting angle
            axis: Math.random() > 0.5 ? 'x' : 'y', // Orbit axis (polar or equatorial-ish)
            inclination: (Math.random() - 0.5) * 0.5, // Slight tilt
            yOffset: (Math.random() - 0.5) * 2, // Spread along Y for non-polar
        }));
    }, [count]);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        satellites.forEach((sat, i) => {
            // Update angle based on speed
            sat.angle += sat.speed * delta * 0.5;

            // Calculate position based on orbit type
            if (sat.axis === 'x') {
                // Polar-ish orbit
                dummy.position.set(
                    Math.cos(sat.angle) * sat.radius,
                    Math.sin(sat.angle) * sat.radius,
                    Math.sin(sat.angle + sat.inclination) * 0.5
                );
            } else {
                // Equatorial-ish orbit
                dummy.position.set(
                    Math.cos(sat.angle) * sat.radius,
                    sat.inclination * sat.radius, // Slight tilt
                    Math.sin(sat.angle) * sat.radius
                );
            }

            dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
            dummy.scale.setScalar(0.02 + Math.random() * 0.03); // Random small sizes
            dummy.updateMatrix();

            meshRef.current!.setMatrixAt(i, dummy.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <capsuleGeometry args={[0.05, 0.15, 4, 8]} />
            <meshStandardMaterial
                color="#cccccc"
                metalness={0.8}
                roughness={0.2}
                emissive="#444444"
                emissiveIntensity={0.2}
            />
        </instancedMesh>
    );
}
